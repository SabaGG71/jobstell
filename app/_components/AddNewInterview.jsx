"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { chatSession } from "../../utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "../../utils/db";
import { JobInterview } from "../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Configuration constants
const MAX_RETRIES = 3;
const TIMEOUT_DURATION = 30000;
const INITIAL_BACKOFF_DELAY = 1000;

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPostion, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useUser();

  // Helper function for delay with exponential backoff
  const delay = (retryCount) =>
    new Promise((resolve) =>
      setTimeout(resolve, INITIAL_BACKOFF_DELAY * Math.pow(2, retryCount))
    );

  // Enhanced JSON parsing function with better error handling
  const parseJsonResponse = (response) => {
    try {
      // Remove markdown code blocks, newlines, and normalize spaces
      let cleanedResponse = response
        .replace(/```json\s*|\s*```/g, "")
        .replace(/[\u201C\u201D\u2018\u2019]/g, '"') // Replace smart quotes
        .replace(/\n/g, " ")
        .trim();

      // Find all possible JSON objects in the response
      const jsonObjects = [];
      let depth = 0;
      let startIndex = -1;

      for (let i = 0; i < cleanedResponse.length; i++) {
        if (cleanedResponse[i] === "{") {
          if (depth === 0) {
            startIndex = i;
          }
          depth++;
        } else if (cleanedResponse[i] === "}") {
          depth--;
          if (depth === 0 && startIndex !== -1) {
            try {
              const jsonString = cleanedResponse.slice(startIndex, i + 1);
              const parsed = JSON.parse(jsonString);
              jsonObjects.push({ parsed, length: jsonString.length });
            } catch (e) {
              // Continue searching if this segment isn't valid JSON
              continue;
            }
          }
        }
      }

      // If no valid JSON objects found, throw error
      if (jsonObjects.length === 0) {
        throw new Error("No valid JSON object found in response");
      }

      // Get the longest valid JSON object (usually the most complete one)
      const longestJson = jsonObjects.reduce((prev, current) =>
        prev.length > current.length ? prev : current
      );

      // Validate the structure
      const result = longestJson.parsed;
      if (!Array.isArray(result) && typeof result !== "object") {
        throw new Error("Parsed result is neither an array nor an object");
      }

      // Validate that it contains questions and answers
      if (Array.isArray(result)) {
        const isValid = result.every(
          (item) =>
            item.hasOwnProperty("question") && item.hasOwnProperty("answer")
        );
        if (!isValid) {
          throw new Error("Invalid question-answer format in response");
        }
      }

      return result;
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      throw new Error(`Failed to parse AI response: ${error.message}`);
    }
  };

  // Function to handle API calls with timeout
  const fetchWithTimeout = async (promise) => {
    let timeoutId;

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Request timed out after " + TIMEOUT_DURATION + "ms"));
      }, TIMEOUT_DURATION);
    });

    try {
      const result = await Promise.race([promise, timeoutPromise]);
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  // Function to make API call with retries
  const makeApiCallWithRetries = async (apiCall) => {
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        return await fetchWithTimeout(apiCall());
      } catch (error) {
        if (i === MAX_RETRIES - 1) throw error;
        await delay(i);
        console.log(`Retry attempt ${i + 1} of ${MAX_RETRIES}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const inputPrompt = `Analyze the following details to generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} high-quality, realistic interview questions that are appropriate for the specified job position, job description, and years of experience. Focus on asking mostly technical questions relevant to the role, ensuring that the candidate can visualize what they might encounter in a real interview. Ask about the most important technical and problem-solving aspects of the job role while keeping in mind the candidate's level of experience. Return the result in a simple JSON array format where each object has 'question' and 'answer' fields. Details: Job Position: ${jobPostion} Job Description: ${jobDesc}. Years of Experience: ${jobExperience}. Ensure the questions cover a range of topics, including technical concepts, problem-solving, debugging, practical coding scenarios, and general web development principles. last 5 questions must be non-technical interview questions that HRs might ask on an interview.`;

    try {
      // Make API call with retries
      const result = await makeApiCallWithRetries(() =>
        chatSession.sendMessage(inputPrompt)
      );

      if (!result?.response) {
        throw new Error("Invalid API response format");
      }

      const mockJsonResp = result.response.text();
      const parsedResponse = parseJsonResponse(mockJsonResp);

      // Insert into database with retries
      const dbResponse = await makeApiCallWithRetries(() =>
        db
          .insert(JobInterview)
          .values({
            mockJobId: uuidv4(),
            jsonMockResp: JSON.stringify(parsedResponse),
            jobPosition: jobPostion,
            jobDescription: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockJobId: JobInterview.mockJobId })
      );

      if (!dbResponse?.[0]?.mockJobId) {
        throw new Error("Failed to create interview session");
      }

      setOpenDialog(false);
      router.push("/dashboard/interview/" + dbResponse[0].mockJobId);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred");
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border hover:bg-secondary-200 text-center bg-secondary-100 duration-200 cursor-pointer rounded-lg"
        onClick={() => setOpenDialog(!openDialog)}
      >
        <h2 className="font-bold text-lg">+ Add New</h2>
      </div>

      <Link href="/dashboard/upgrade">Pricing</Link>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl font-bold block">
                Tell Us More about your job interview
              </span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>
            )}

            <div>
              <p className="text-secondary-500">
                Add Details About Your Job Position/Role, Job Description and
                years of experience
              </p>

              <div className="mt-5">
                <label className="block mb-2">Job Role/Job Position 💼</label>
                <Select
                  value={jobPostion}
                  onValueChange={setJobPosition}
                  required
                  name="jobPosition"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web developer">Web Developer</SelectItem>
                    <SelectItem value="Data Scientist">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="Cloud Engineer">
                      Cloud Engineer
                    </SelectItem>
                    <SelectItem value="UI/UX Designer">
                      UI/UX Designer
                    </SelectItem>
                    <SelectItem value="Blockchain Developer">
                      Blockchain Developer
                    </SelectItem>
                    <SelectItem value="Cybersecurity Specialist">
                      Cybersecurity Specialist
                    </SelectItem>
                    <SelectItem value="Business & Management">
                      Business & Management
                    </SelectItem>
                    <SelectItem value="Healthcare & Medicine">
                      Healthcare & Medicine
                    </SelectItem>
                    <SelectItem value="Education & Training">
                      Education & Training
                    </SelectItem>
                    <SelectItem value="other">Other...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block mb-2">
                👉 Job Description / Tech Stack (In Short)
              </label>
              <Textarea
                required
                placeholder="Ex. React, Angular, NodeJS, MySql etc"
                className="max-h-[200px]"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2">Years Of experience</label>
              <Input
                required
                type="number"
                min="0"
                max="60"
                placeholder="Ex. 5"
                value={jobExperience}
                onChange={(e) => setJobExperience(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-1" /> Generating
                    from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

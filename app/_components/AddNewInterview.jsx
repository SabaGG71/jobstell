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

  const delay = (retryCount) =>
    new Promise((resolve) =>
      setTimeout(resolve, INITIAL_BACKOFF_DELAY * Math.pow(2, retryCount))
    );

  const extractAndParseJSON = (text) => {
    try {
      // First, try to find content between code blocks
      let match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      let jsonStr = match ? match[1] : text;

      // Try to find array pattern if the text contains multiple JSON objects
      const startIdx = jsonStr.indexOf("[");
      const endIdx = jsonStr.lastIndexOf("]");

      if (startIdx !== -1 && endIdx !== -1) {
        jsonStr = jsonStr.substring(startIdx, endIdx + 1);
      }

      // Pre-process the string to handle common JSON formatting issues
      jsonStr = jsonStr
        // Remove any comments
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
        // Replace smart quotes
        .replace(/[\u201C\u201D\u2018\u2019]/g, '"')
        // Remove newlines and extra spaces
        .replace(/\s+/g, " ")
        // Handle trailing commas in objects and arrays
        .replace(/,(\s*[}\]])/g, "$1")
        // Fix missing quotes around property names
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        // Remove escaped quotes within property values
        .replace(/\\\"/g, '"')
        // Remove backslashes before normal quotes
        .replace(/\\'/g, "'")
        // Remove escaped newlines
        .replace(/\\n/g, " ")
        // Remove multiple spaces
        .replace(/\s+/g, " ")
        // Fix double quotes within double-quoted strings
        .replace(/"([^"]*?)"/g, (match, p1) => `"${p1.replace(/"/g, '\\"')}"`)
        // Remove invalid control characters
        .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
        .trim();

      // Try parsing the cleaned JSON
      let parsed;
      try {
        parsed = JSON.parse(jsonStr);
      } catch (parseError) {
        // If parsing fails, try to repair common JSON structural issues
        jsonStr = jsonStr
          // Ensure array brackets if missing
          .replace(/^\s*{/, "[{")
          .replace(/}\s*$/, "}]")
          // Fix missing commas between objects
          .replace(/}\s*{/g, "},{")
          // Remove any remaining invalid characters
          .replace(/[^\x20-\x7E]/g, "");

        parsed = JSON.parse(jsonStr);
      }

      // Validate the structure
      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      // Clean and validate each item
      const validQuestions = parsed
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          question: String(item.question || "").trim(),
          answer: String(item.answer || "").trim(),
        }))
        .filter((item) => item.question && item.answer);

      if (validQuestions.length === 0) {
        throw new Error("No valid questions found");
      }

      return validQuestions;
    } catch (error) {
      console.error("JSON parsing error:", error);
      throw new Error(`JSON parsing failed: ${error.message}`);
    }
  };

  const fetchWithTimeout = async (promise) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Request timed out"));
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

  const makeApiCallWithRetries = async (apiCall) => {
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        return await fetchWithTimeout(apiCall());
      } catch (error) {
        if (i === MAX_RETRIES - 1) throw error;
        await delay(i);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const prompt = `Analyze the following details to generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} high-quality, realistic interview questions that are appropriate for the specified job position, job description, and years of experience. Focus on asking mostly technical questions relevant to the role, ensuring that the candidate can visualize what they might encounter in a real interview. Ask about the most important technical and problem-solving aspects of the job role while keeping in mind the candidate's level of experience. Return the result in JSON format with each question and answer pair provided under the fields question and answer. Answers must be detailed and have all the most important information in it, but it should be around 100-150 words, depending on the question. Details: Job Position: ${jobPostion} Job Description: ${jobDesc}. Years of Experience: ${jobExperience}. Ensure the questions cover a range of topics, including technical concepts, problem-solving, debugging, practical coding scenarios, and general web development principles. last 5 questions must be non-technical interview questions that HRs might ask on an interview.`;

      const result = await makeApiCallWithRetries(() =>
        chatSession.sendMessage(prompt)
      );

      if (!result?.response) {
        throw new Error("Invalid API response");
      }

      const responseText = result.response.text();
      const parsedResponse = extractAndParseJSON(responseText);

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
      console.error("Error details:", error);
      setError(error.message || "An unexpected error occurred");
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

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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

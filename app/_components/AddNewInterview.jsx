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

const MAX_RETRIES = 5;
const TIMEOUT_DURATION = 60000;
const INITIAL_BACKOFF_DELAY = 2000;
const REQUIRED_QUESTION_COUNT =
  Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 20;
const MAX_GENERATION_ATTEMPTS = 3;

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPostion, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const delay = (retryCount) => {
    const baseDelay = INITIAL_BACKOFF_DELAY * Math.pow(2, retryCount);
    const jitter = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(resolve, baseDelay + jitter));
  };

  const extractJSON = (text) => {
    let questions = [];

    const cleanText = (str) => {
      return str
        .replace(/[\u201C\u201D\u2018\u2019]/g, '"')
        .replace(/[\u2013\u2014]/g, "-")
        .replace(/[^\x20-\x7E\s]/g, "")
        .trim();
    };

    const strategies = [
      // Strategy 1: Try to find JSON in code blocks
      (text) => {
        const matches = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (matches) {
          try {
            const parsed = JSON.parse(matches[1]);
            return Array.isArray(parsed) ? parsed : [parsed];
          } catch {
            return null;
          }
        }
        return null;
      },

      // Strategy 2: Try to find array pattern
      (text) => {
        try {
          const arrayMatch = text.match(/\[\s*{[\s\S]*}\s*\]/);
          if (arrayMatch) {
            return JSON.parse(arrayMatch[0]);
          }
        } catch {
          return null;
        }
        return null;
      },

      // Strategy 3: Try to find individual objects
      (text) => {
        const objects = [];
        const regex = /{[^{}]*}/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
          try {
            const obj = JSON.parse(match[0]);
            if (obj.question && obj.answer) {
              objects.push(obj);
            }
          } catch {
            continue;
          }
        }
        return objects.length > 0 ? objects : null;
      },

      // Strategy 4: Manual extraction using regex patterns
      (text) => {
        const questions = [];
        const pattern =
          /["']?question["']?\s*:\s*["']([^"']+)["']\s*,\s*["']?answer["']?\s*:\s*["']([^"']+)["']/g;
        let match;

        while ((match = pattern.exec(text)) !== null) {
          questions.push({
            question: cleanText(match[1]),
            answer: cleanText(match[2]),
          });
        }
        return questions.length > 0 ? questions : null;
      },

      // Strategy 5: Fallback - extremely aggressive pattern matching
      (text) => {
        const questions = [];
        const chunks = text.split(/(?:Question|Q):?\s*/i);

        for (let chunk of chunks) {
          if (!chunk.trim()) continue;

          const answerSplit = chunk.split(/(?:Answer|A):?\s*/i);

          if (answerSplit.length >= 2) {
            const question = cleanText(answerSplit[0]);
            const answer = cleanText(
              answerSplit[1].split(/(?:Question|Q):/i)[0]
            );

            if (question && answer) {
              questions.push({ question, answer });
            }
          }
        }
        return questions.length > 0 ? questions : null;
      },
    ];

    // Try all strategies
    for (const strategy of strategies) {
      try {
        const result = strategy(text);
        if (result && result.length > 0) {
          const validQuestions = result
            .map((item) => ({
              question: cleanText(item.question || ""),
              answer: cleanText(item.answer || ""),
            }))
            .filter(
              (item) =>
                item.question.length >= 10 &&
                item.answer.length >= 20 &&
                item.question.length < 500 &&
                item.answer.length < 2000
            );

          if (validQuestions.length > 0) {
            questions = validQuestions;
            break;
          }
        }
      } catch (e) {
        continue;
      }
    }

    return questions;
  };

  const makeApiCallWithRetries = async (apiCall) => {
    let lastError = null;

    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(
            () => reject(new Error("Request timed out")),
            TIMEOUT_DURATION
          );
        });

        const result = await Promise.race([apiCall(), timeoutPromise]);
        return result;
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${i + 1} failed:`, error);

        if (i < MAX_RETRIES - 1) {
          await delay(i);
        }
      }
    }

    throw lastError || new Error("All retry attempts failed");
  };

  const generateQuestions = async () => {
    const prompt = `Generate exactly ${REQUIRED_QUESTION_COUNT} high-quality, realistic interview questions that are appropriate for the specified job position, job description, and years of experience. Focus on asking mostly technical questions relevant to the role, ensuring that the candidate can visualize what they might encounter in a real interview. Ask about the most important technical and problem-solving aspects of the job role while keeping in mind the candidate's level of experience. Return the result in JSON format with each question and answer pair provided under the fields "question" and "answer". Answers must be detailed and have all the most important information in it, but it should be around 100-150 words, depending on the question. Details: Job Position: ${jobPostion} Job Description: ${jobDesc}. Years of Experience: ${jobExperience}. Ensure the questions cover a range of topics, including technical concepts, problem-solving, debugging, practical coding scenarios, and general web development principles. The last 5 questions must be non-technical interview questions that HRs might ask on an interview. Important: You must return exactly ${REQUIRED_QUESTION_COUNT} questions, no more and no less.`;

    const result = await makeApiCallWithRetries(() =>
      chatSession.sendMessage(prompt)
    );

    if (!result?.response) {
      throw new Error("No response from AI service");
    }

    const responseText = result.response.text();
    const parsedQuestions = extractJSON(responseText);

    console.log(
      `Generated ${parsedQuestions.length} questions out of ${REQUIRED_QUESTION_COUNT} required:`,
      parsedQuestions
    );

    return parsedQuestions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let questions = [];
      let attempts = 0;

      while (attempts < MAX_GENERATION_ATTEMPTS) {
        questions = await generateQuestions();

        if (questions.length === REQUIRED_QUESTION_COUNT) {
          break;
        }

        console.log(
          `Attempt ${attempts + 1}: Generated ${
            questions.length
          } questions, retrying...`
        );
        attempts++;

        if (attempts === MAX_GENERATION_ATTEMPTS) {
          throw new Error(
            `Failed to generate ${REQUIRED_QUESTION_COUNT} questions after ${MAX_GENERATION_ATTEMPTS} attempts`
          );
        }
      }

      const dbResponse = await makeApiCallWithRetries(() =>
        db
          .insert(JobInterview)
          .values({
            mockJobId: uuidv4(),
            jsonMockResp: JSON.stringify(questions),
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
      setError(
        "Please try again. If the issue persists, try simplifying the job description."
      );
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

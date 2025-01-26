"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import QuestionsSection from "@/app/_components/QuestionsSection";
import RecordAnswerSection from "@/app/_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { JobInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default function Page({ params }) {
  const router = useRouter();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const resolvedParams = use(params);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const checkInterviewAccess = async () => {
      try {
        const result = await db
          .select()
          .from(JobInterview)
          .where(eq(JobInterview.mockJobId, resolvedParams.interviewId));

        // Check if interview is completed
        if (result[0].status === "COMPLETED") {
          router.push("/dashboard"); // Redirect if already completed
          return;
        }

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      } catch (error) {
        console.error("Interview access error:", error);
        router.push("/dashboard");
      }
    };

    checkInterviewAccess();
  }, [resolvedParams.interviewId, router]);

  const handleEndInterview = async () => {
    try {
      // Optional: Add status column to your schema
      await db
        .update(JobInterview)
        .set({ status: "COMPLETED" }) // Ensure column exists
        .where(eq(JobInterview.mockJobId, resolvedParams.interviewId));

      console.log("Interview ID:", resolvedParams.interviewId);

      // Programmatic navigation
      router.push(
        `/dashboard/interview/${resolvedParams.interviewId}/feedback`
      );
    } catch (error) {
      console.error("End interview error:", error);
      // Fallback navigation
      router.push("/dashboard");
    }
  };
  const questions = Array.isArray(mockInterviewQuestion)
    ? mockInterviewQuestion
    : mockInterviewQuestion?.interviewQuestions ||
      mockInterviewQuestion?.interview_questions ||
      [];

  if (!interviewData) return null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 max-w-[80%] mx-auto my-10 md:grid-cols-2">
        <QuestionsSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end mr-[200px] gap-4">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          > 
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== questions.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === questions.length - 1 && (
          <Button onClick={() => handleEndInterview()}>End Interview</Button>
        )}
      </div>
    </div>
  );
}

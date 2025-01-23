"use client";
import QuestionsSection from "@/app/_components/QuestionsSection";
import RecordAnswerSection from "@/app/_components/RecordAnswerSection";
import { db } from "@/utils/db";
import { JobInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState, use } from "react";

export default function page({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const resolvedParams = use(params);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    interviewDetails();
  }, []);

  const interviewDetails = async () => {
    const result = await db
      .select()
      .from(JobInterview)
      .where(eq(JobInterview.mockJobId, resolvedParams.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);

    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 max-w-[80%] mx-auto my-10 md:grid-cols-2">
        {/* Questions */}
        <QuestionsSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />
        {/* Video / Audio Recording */}
        <RecordAnswerSection />
      </div>
    </div>
  );
}

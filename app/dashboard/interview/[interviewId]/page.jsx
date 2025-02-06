"use client";
import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { JobInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function Page({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const resolvedParams = use(params);

  useEffect(() => {
    console.log(resolvedParams.interviewId);
    interviewDetails();
  }, []);

  const interviewDetails = async () => {
    const result = await db
      .select()
      .from(JobInterview)
      .where(eq(JobInterview.mockJobId, resolvedParams.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 max-w-[70%] mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 justify-center ">
      <div>
        <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            style={{ height: 400, width: 400 }}
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-full p-20 rouned-lg border bg-secondary-100" />
            <Button
              className="mt-4 bg-primary-700"
              onClick={() => setWebCamEnabled(true)}
            >
              Enable Camera & Microphone
            </Button>
          </>
        )}
      </div>
      <div>
        {interviewData && (
          <>
            <div className="my-5 border border-black p-5 flex flex-col gap-2 bg-primary-200 py-1 rounded-xl px-5">
              <h2>
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData.jobPosition}
              </h2>
              <p>
                <strong>Job Description/Tech Stack:</strong>{" "}
                {interviewData.jobDescription}
              </p>
              <p>
                <strong>Years Of Experience:</strong>{" "}
                {interviewData.jobExperience}
              </p>
            </div>
            <div>
              <div className="flex gap-2">
                <Lightbulb />
                <strong>Information</strong>
              </div>
              <h2 className="bg-yellow-100 p-3 rounded-xl mt-5">
                {process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_INFORMATION}
              </h2>
            </div>
            <Link
              href={`/dashboard/interview/${resolvedParams.interviewId}/start`}
            >
              <Button className="mt-6">Start Interview</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

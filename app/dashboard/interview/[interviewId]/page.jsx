"use client";
import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { JobInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";

export default function Page({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const resolvedParams = use(params);

  useEffect(() => {
    console.log(resolvedParams.interviewId);
    interviewDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const interviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(JobInterview)
        .where(eq(JobInterview.mockJobId, resolvedParams.interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details: ", error);
    }
  };

  // Use aggressive video constraints to reduce processing load:
  const videoConstraints = useMemo(
    () => ({
      width: { ideal: 320 },
      height: { ideal: 240 },
      facingMode: "user",
      frameRate: { ideal: 10, max: 10 },
    }),
    []
  );

  return (
    <div className="my-10 max-w-[70%] mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 justify-center">
      <div>
        <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>
        {webCamEnabled ? (
          <Webcam
            audio={true}
            videoConstraints={videoConstraints}
            mirrored={true}
            style={{
              height: 400, // display size can remain larger,
              width: 400, // but the captured stream is lower-res
              objectFit: "cover",
            }}
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-full p-20 rounded-lg border bg-secondary-100" />
            <Button
              className="mt-4 bg-primary-700"
              onClick={() => setWebCamEnabled(true)}
            >
              Enable Camera &amp; Microphone
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

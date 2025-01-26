"use client";
import { db } from "@/utils/db";
import { JobInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

export default function InterviewList() {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState(null);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(JobInterview)
      .where(
        eq(JobInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(JobInterview.id));

    console.log(result);
    setInterviewList(result);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-9">⏮️ Previous Interview List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4 ">
        {InterviewList &&
          InterviewList.map((interview, index) => {
            return <InterviewItemCard interview={interview} key={index} />;
          })}
      </div>
    </div>
  );
}

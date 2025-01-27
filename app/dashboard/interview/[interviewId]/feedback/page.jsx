"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page({ params }) {
  const useParams = use(params);
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    getFeedback();
  }, []);
  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, useParams.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  const calculateOverallRating = () => {
    if (!feedbackList || feedbackList.length === 0) return "0.0"; // Handle empty or invalid list

    const totalRating = feedbackList.reduce((sum, item) => {
      const rating = parseFloat(item.rating) || 0; // Parse rating as a float, default to 0 if invalid
      return sum + rating;
    }, 0);

    const overallRating = totalRating / 15; // Divide the sum by 15
    console.log("Total Rating:", totalRating, "Overall Rating:", overallRating);

    return overallRating.toFixed(1); // Return the value rounded to 1 decimal place
  };

  return (
    <section className="p-10">
      <div className="max-w-[70%] mx-auto">
        {feedbackList?.length == 0 ? (
          <h2 className="text-xl font-bold mb-4">
            ❌ No Interview Feedback Record Found
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-green-700">
              Congratulation!
            </h2>
            <p>Here is Your Interview Feedback</p>
            <h2 className="text-primary-500 text-3xl my-3">
              Your overall interview rating:{" "}
              <strong>
                {calculateOverallRating()}
                /10
              </strong>
            </h2>

            <h2 className="text-lg">
              Find below interview question with correct answer, your answer and
              feedback for improvment
            </h2>

            {feedbackList &&
              feedbackList.map((item, index) => {
                return (
                  <Collapsible key={index}>
                    <CollapsibleTrigger className="p-4 flex items-center gap-4 text-xl my-2 bg-primary-500 text-white px-6 rounded-xl">
                      {item.question}
                      <ChevronsUpDown />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-red-500 p-2 border rounded-lg">
                          <strong>Rating: </strong>
                          {item.rating}
                        </h2>
                        <h2 className="p-2 border rounded-lg bg-red-50 text-red-900">
                          <strong>Your Answer: </strong>
                          {item.userAns}
                        </h2>
                        <h2 className="p-2 border rounded-lg bg-green-50 text-green-900">
                          <strong>Correct Answer: </strong>
                          {item.correctAns}
                        </h2>
                        <h2 className="p-2 border rounded-lg bg-blue-50 text-blue-900">
                          <strong>Feedback: </strong>
                          {item.feedback}
                        </h2>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
          </>
        )}

        <Link href="/dashboard">
          <Button>Go Home </Button>
        </Link>
      </div>
    </section>
  );
}

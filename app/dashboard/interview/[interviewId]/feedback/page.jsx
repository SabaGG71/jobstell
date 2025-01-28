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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, useParams.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOverallRating = () => {
    if (!feedbackList || feedbackList.length === 0) return "0.0";

    const totalRating = feedbackList.reduce((sum, item) => {
      const rating = parseFloat(item.rating) || 0;
      return sum + rating;
    }, 0);

    const overallRating = totalRating / 15;
    return overallRating.toFixed(1);
  };

  if (isLoading) {
    return (
      <section className="p-10">
        <div className="max-w-[70%] mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-10">
      <div className="max-w-[70%] mx-auto">
        {feedbackList.length === 0 ? (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold mb-4">
              ❌ No Interview Feedback Record Found
            </h2>
            <Link href="/dashboard">
              <Button>Go Home</Button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-green-700">
              Congratulations!
            </h2>
            <p>Here is Your Interview Feedback</p>
            <h2 className="text-primary-500 text-3xl my-3">
              Your overall interview rating:{" "}
              <strong>
                {calculateOverallRating()}
                /10
              </strong>
            </h2>

            <h2 className="text-lg mb-6">
              Find below interview questions with correct answers, your answers,
              and feedback for improvement
            </h2>

            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="w-full p-4 flex items-center justify-between text-xl bg-primary-500 text-white px-6 rounded-xl hover:bg-primary-600 transition-colors">
                    <span>{item.question}</span>
                    <ChevronsUpDown className="flex-shrink-0 ml-2" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-red-500 p-3 border rounded-lg bg-red-50">
                        <strong>Rating: </strong>
                        {item.rating}/10
                      </div>
                      <div className="p-3 border rounded-lg bg-red-50 text-red-900">
                        <strong>Your Answer: </strong>
                        {item.userAns}
                      </div>
                      <div className="p-3 border rounded-lg bg-green-50 text-green-900">
                        <strong>Correct Answer: </strong>
                        {item.correctAns}
                      </div>
                      <div className="p-3 border rounded-lg bg-blue-50 text-blue-900">
                        <strong>Feedback: </strong>
                        {item.feedback}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/dashboard">
                <Button>Go Home</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

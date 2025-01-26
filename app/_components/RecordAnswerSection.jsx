"use client";
import Webcam from "react-webcam";
import camera from "../../public/camera.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq, and } from "drizzle-orm";

export default function RecordAnswerSection({
  activeQuestionIndex,
  mockInterviewQuestion,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, isLoading] = useState(false);

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const questions = Array.isArray(mockInterviewQuestion)
    ? mockInterviewQuestion
    : mockInterviewQuestion?.interviewQuestions ||
      mockInterviewQuestion?.interview_questions ||
      [];

  useEffect(() => {
    results.map((result) => {
      return setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  const UpdateUserAnswer = useCallback(async () => {
    if (!userAnswer.trim() || !user?.primaryEmailAddress?.emailAddress) return;

    try {
      isLoading(true);
      const currentQuestion = questions[activeQuestionIndex]?.question;
      const currentAnswer = userAnswer;

      const feedbackPrompt =
        `Question: ${currentQuestion}, User Answer: ${currentAnswer}, ` +
        "Depends on Question and user answer for give interview question " +
        "please give us rating for answer and feedback as area of improvment if any " +
        "in just 4 to 6 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const jsonFeedbackResp = JSON.parse(mockJsonResp);

      // Delete existing answer for this question and user
      await db
        .delete(UserAnswer)
        .where(
          and(
            eq(UserAnswer.mockIdRef, interviewData.mockJobId || ""),
            eq(UserAnswer.question, currentQuestion),
            eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress)
          )
        );

      // Insert new answer
      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockJobId || "",
        question: currentQuestion,
        correctAns: questions[activeQuestionIndex]?.answer || "",
        userAns: currentAnswer,
        feedback: jsonFeedbackResp?.feedback || "",
        rating: jsonFeedbackResp?.rating || "",
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast("User Answer Recorded successfully");
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error updating user answer:", error);
      toast.error("Failed to record answer");
    } finally {
      isLoading(false);
    }
  }, [
    userAnswer,
    questions,
    activeQuestionIndex,
    interviewData,
    user,
    setResults,
  ]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 5) {
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording, UpdateUserAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center flex-col justify-center">
      <div className="flex flex-col justify-center items-center bg-secondary-100 rounded-lg p-5 m-5">
        <Image
          src={camera}
          width={200}
          height={200}
          className="absolute"
          alt="camera-svg"
        />
        <Webcam
          style={{ zIndex: 10, width: "100%", height: 300 }}
          mirrored={true}
        />
      </div>
      <Button
        disabled={loading}
        onClick={StartStopRecording}
        variant="outline"
        className="my-10"
      >
        {isRecording ? (
          <span className="flex text-red-500 items-center gap-2">
            <Mic />
            Recording...
          </span>
        ) : (
          "Start Recording"
        )}
      </Button>
    </div>
  );
}

"use client";
import Webcam from "react-webcam";
import camera from "../../public/camera.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq, and } from "drizzle-orm";
import { useRouter } from "next/navigation";

export default function RecordAnswerSection({
  activeQuestionIndex,
  mockInterviewQuestion,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, isLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const router = useRouter();

  const questions = Array.isArray(mockInterviewQuestion)
    ? mockInterviewQuestion
    : mockInterviewQuestion?.interviewQuestions ||
      mockInterviewQuestion?.interview_questions ||
      [];

  const handleTranscriptionResponse = async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`JSON parsing error: ${error.message}`);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("file", audioBlob, "audio.webm");

          isLoading(true);
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await handleTranscriptionResponse(response);

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.transcription) {
            setUserAnswer(data.transcription);
            await processTranscribedAnswer(data.transcription);
          } else {
            throw new Error("No transcription received");
          }
        } catch (error) {
          console.error("Transcription error:", error);
          toast.error(error.message || "Failed to transcribe audio");
        } finally {
          isLoading(false);
        }
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    }
  };

  const processTranscribedAnswer = async (transcribedText) => {
    if (!transcribedText?.trim() || !user?.primaryEmailAddress?.emailAddress) {
      toast.error("Invalid transcription or user email");
      return;
    }

    try {
      const currentQuestion = questions[activeQuestionIndex]?.question;
      if (!currentQuestion) {
        throw new Error("Question not found");
      }

      const feedbackPrompt =
        `Question: ${currentQuestion}\nUser Answer: ${transcribedText}\n` +
        "Please provide a rating and feedback for this interview answer in 4-6 lines in JSON format with 'rating' and 'feedback' fields";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace(/```json\s*|\s*```/g, "")
        .trim();

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(mockJsonResp);
      } catch (error) {
        console.error("Error parsing AI response:", error);
        throw new Error("Failed to parse AI feedback");
      }

      // Delete existing answer if any
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
        userAns: transcribedText,
        feedback: jsonFeedbackResp?.feedback || "",
        rating: jsonFeedbackResp?.rating || "",
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast.success("Answer recorded successfully");

      if (activeQuestionIndex === questions.length - 1) {
        router.push(`/feedback/${interviewData.mockJobId}`);
      }
    } catch (error) {
      console.error("Error processing answer:", error);
      toast.error(error.message || "Failed to process answer");
    }
  };

  const handleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
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
      <div className="text-center mb-4">
        <p className="text-lg font-medium">
          Question {activeQuestionIndex + 1} of {questions.length}
        </p>
      </div>
      <Button
        disabled={loading}
        onClick={handleRecording}
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
      {loading && <p className="text-gray-500">Processing your answer...</p>}
    </div>
  );
}

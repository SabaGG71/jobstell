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

      const feedbackPrompt = `Analyze the following input: Question: ${currentQuestion}
      User Answer: ${transcribedText}

Provide the following outputs in JSON format:

Rating: Assign a score from 1 to 10 based on how well the user's answer addresses the question. Consider factors like accuracy, clarity, technical depth, and suitability for a real interview.

Feedback: Provide detailed feedback on the answer, ensuring it covers the following: Analyze the user's answer thoroughly and identify strengths as well as specific areas for improvement.

Highlight inaccuracies, missing details, or opportunities to add depth or clarity.

Provide clear guidance on how to improve the answer, ensuring the feedback reflects the most critical points that would make the answer interview-ready.

Study-materials: If the user's answer lacks depth or contains inaccuracies, provide a link to the most relevant and reliable source where the specific topic is discussed in-depth. The link should directly redirect the user to the part of the source where the concept is explained. Along with the link, include a sentence such as "You can study the topic in more depth from the source." Ensure that the source link is the most up-to-date version available and that the link provided is valid and does not lead to a "not found" page.

The output must contain three fields in JSON with no additional or nested fields: rating, feedback, and study-materials. give me youtube video which explains the question, and other most reliable and relevant source to study the question's topic from.`;

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

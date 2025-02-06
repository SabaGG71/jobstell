"use client";
import Webcam from "react-webcam";
import camera from "../../public/camera.png";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Mic } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { chatSession } from "../../utils/GeminiAIModal";
import { db } from "../../utils/db";
import { UserAnswer } from "../../utils/schema";
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
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const router = useRouter();

  const questions = Array.isArray(mockInterviewQuestion)
    ? mockInterviewQuestion
    : mockInterviewQuestion?.interviewQuestions ||
      mockInterviewQuestion?.interview_questions ||
      [];

  useEffect(() => {
    checkDeviceSupport();
    return () => {
      // Cleanup function to ensure streams are properly closed
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const checkDeviceSupport = async () => {
    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100, // Standard sample rate that works well across devices
          channelCount: 1, // Mono recording for better compatibility
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach((track) => track.stop());
      setDeviceSupported(true);
    } catch (error) {
      console.error("Device support check failed:", error);
      setDeviceSupported(false);
      toast.error(
        "Your device may not support audio recording. Please check browser permissions."
      );
    }
  };

  const getSupportedMimeType = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4",
      "audio/wav",
    ];

    // Prefer more compatible formats for Android
    if (isAndroid) {
      types.unshift("audio/webm;codecs=opus");
      types.unshift("audio/ogg;codecs=opus");
    }

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return "audio/webm"; // Fallback format
  };

  const handleTranscriptionResponse = async (response) => {
    if (!response.ok) {
      if (response.status === 504 && retryCount < 3) {
        const waitTime = Math.pow(2, retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        setRetryCount((prev) => prev + 1);
        throw new Error("RETRY");
      }
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }
    try {
      const data = await response.json();
      setRetryCount(0);
      return data;
    } catch (error) {
      throw new Error(`JSON parsing error: ${error.message}`);
    }
  };

  const startRecording = async () => {
    try {
      // Enhanced audio constraints for better mobile compatibility
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1,
          latency: 0,
          sampleSize: 16,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const mimeType = getSupportedMimeType();
      const options = {
        mimeType,
        audioBitsPerSecond: 128000, // Consistent bitrate across devices
      };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, {
            type: mimeType,
          });

          // Ensure the blob is valid
          if (audioBlob.size === 0) {
            throw new Error("No audio data recorded");
          }

          const formData = new FormData();
          formData.append(
            "file",
            audioBlob,
            `audio.${mimeType.split(";")[0].split("/")[1]}`
          );

          isLoading(true);
          let transcriptionSuccess = false;
          let retryAttempt = 0;

          while (!transcriptionSuccess && retryAttempt < 3) {
            try {
              const response = await fetch("/api/transcribe", {
                method: "POST",
                body: formData,
              });

              const data = await handleTranscriptionResponse(response);

              if (data.transcription) {
                transcriptionSuccess = true;
                setUserAnswer(data.transcription);
                await processTranscribedAnswer(data.transcription);
              }
            } catch (error) {
              if (error.message === "RETRY") {
                retryAttempt++;
                continue;
              }
              throw error;
            }
          }

          if (!transcriptionSuccess) {
            throw new Error("Failed to transcribe after multiple attempts");
          }
        } catch (error) {
          console.error("Recording processing error:", error);
          toast.error(error.message || "Failed to transcribe audio");
        } finally {
          isLoading(false);
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error("Recording start error:", error);
      if (error.name === "NotAllowedError") {
        toast.error(
          "Microphone access denied. Please check your browser permissions."
        );
      } else if (error.name === "NotFoundError") {
        toast.error("No microphone found. Please check your device settings.");
      } else if (error.name === "NotReadableError") {
        toast.error(
          "Cannot access microphone. It might be in use by another application."
        );
      } else {
        toast.error(
          "Failed to start recording. Please check your device settings."
        );
      }
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
        setIsRecording(false);

        // Properly cleanup the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
          streamRef.current = null;
        }
      } catch (error) {
        console.error("Stop recording error:", error);
        toast.error("Error stopping recording");
        setIsRecording(false);
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

      const result =
        await chatSession.sendMessage(`Analyze the following input: Question: ${currentQuestion}
      User Answer: ${transcribedText}
      Provide a JSON response with exactly these three fields:
      {
        "rating": (a number between 1-10),
        "feedback": (detailed analysis of the answer),
        "study-materials": (relevant resources for improvement)
      }`);

      const responseText = result.response.text();
      const jsonStartIndex = responseText.indexOf("{");
      const jsonEndIndex = responseText.lastIndexOf("}");
      const jsonStr = responseText.substring(jsonStartIndex, jsonEndIndex + 1);

      const jsonFeedbackResp = JSON.parse(jsonStr);

      try {
        await db
          .delete(UserAnswer)
          .where(
            and(
              eq(UserAnswer.mockIdRef, interviewData.mockJobId || ""),
              eq(UserAnswer.question, currentQuestion),
              eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress)
            )
          );
      } catch (deleteError) {
        console.error("Delete error:", deleteError);
      }

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockJobId || "",
        question: currentQuestion,
        correctAns: questions[activeQuestionIndex]?.answer || "",
        userAns: transcribedText,
        feedback: jsonFeedbackResp.feedback || "",
        rating: String(jsonFeedbackResp.rating) || "0",
        userEmail: user.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast.success("Answer recorded successfully");
    } catch (error) {
      console.error("Process answer error:", error);
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
          audio={false}
        />
      </div>
      <div className="text-center mb-4">
        <p className="text-lg font-medium">
          Question {activeQuestionIndex + 1} of {questions.length}
        </p>
      </div>
      {!deviceSupported ? (
        <p className="text-red-500 mb-4">
          Your device or browser may not support audio recording. Please try
          using a different browser or device.
        </p>
      ) : (
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
      )}
      {loading && <p className="text-gray-500">Processing your answer...</p>}
    </div>
  );
}

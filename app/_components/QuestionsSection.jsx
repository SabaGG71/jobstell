"use client";

import { Lightbulb, Volume2 } from "lucide-react";

export default function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry Your browser doesnot support text to speech");
    }

    console.log(mockInterviewQuestion.interview_questions);
  };
  return (
    mockInterviewQuestion && (
      <section className="p-5  my-10 border rounded-lg">
        <div>
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-5 gap-4">
            {mockInterviewQuestion &&
              mockInterviewQuestion.interview_questions.map(
                (question, index) => {
                  return (
                    <h2
                      className={`bg-secondary-100  rounded-full p-2 cursor-pointer ${
                        activeQuestionIndex == index &&
                        "bg-[#a354ff] text-white"
                      }`}
                      key={index}
                    >
                      Question: {index + 1}
                    </h2>
                  );
                }
              )}
          </div>
          <h2 className="my-10 text-sm md:text-base lg:text-2xl">
            {
              mockInterviewQuestion.interview_questions[activeQuestionIndex]
                ?.question
            }
          </h2>
          <Volume2
            onClick={() =>
              textToSpeech(
                mockInterviewQuestion.interview_questions[activeQuestionIndex]
                  ?.question
              )
            }
          />
          <div className="border rounded-lg p-4 bg-primary-600 text-white">
            <h2 className="flex gap-2">
              <Lightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className="mt-4">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
          </div>
        </div>
        <div></div>
      </section>
    )
  );
}

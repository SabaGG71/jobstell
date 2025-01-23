import { Lightbulb, LightbulbIcon, Volume2 } from "lucide-react";

export default function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry Your browser does not support text to speech");
    }
  };

  // Log the entire mockInterviewQuestion to see its structure
  console.log("MockInterviewQuestion:", mockInterviewQuestion);

  // Add a safe way to get questions
  const questions =
    mockInterviewQuestion?.interviewQuestions ||
    mockInterviewQuestion?.interview_questions ||
    [];

  console.log(questions);

  return (
    <section className="p-5 my-10 border rounded-lg">
      <div>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-5 gap-4">
          {mockInterviewQuestion?.map((question, index) => (
            <h2
              key={index}
              className={`bg-secondary-100 rounded-full p-2 cursor-pointer ${
                activeQuestionIndex === index ? "bg-[#a354ff] text-white" : ""
              }`}
            >
              Question: {index + 1}
            </h2>
          ))}
        </div>

        {mockInterviewQuestion && (
          <>
            <h2 className="my-10 text-sm md:text-base lg:text-2xl">
              {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>

            <Volume2
              onClick={() =>
                textToSpeech(
                  mockInterviewQuestion[activeQuestionIndex]?.question
                )
              }
            />
          </>
        )}

        <div className="border rounded-lg p-4 bg-primary-600 text-white">
          <h2 className="flex gap-2">
            <LightbulbIcon />
            <strong>Note:</strong>
          </h2>
          <h2 className="mt-4">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    </section>
  );
}

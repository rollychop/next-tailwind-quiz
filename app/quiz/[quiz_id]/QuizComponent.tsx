"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { QuestionModel } from "../../../typying";
import QuestionItem from "./QuestionItem";

function QuizComponent({ questions }: { questions: QuestionModel[] }) {
  const [curr, setCurr] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg(null);
    }, 2000);
  };
  const next = () => {
    if (curr < questions.length) setCurr(curr + 1);
    else setError("This is the last question");
  };
  const prev = () => {
    if (curr > 0) setCurr(curr - 1);
    else setError("This is the first question");
  };
  return (
    <>
      {errorMsg && <ErrorTost msg={errorMsg} />}
      <QuestionItem ques={questions[curr]} />
      <div className="flex fixed bottom-12 left-0 right-0 space-x-4 justify-center">
        <button
          onClick={prev}
          className={`inline-flex items-center justify-between px-4 py2 bg-gray-500/30 text-gray-300 rounded-md transition-all duration-300 ${
            curr <= 0
              ? "cursor-not-allowed"
              : "hover:bg-gray-600/40 hover:-translate-y-1 active:translate-y-0"
          }`}
        >
          <FaArrowLeft className="mr-2" />
          Prev
        </button>
        <button
          onClick={next}
          className={`inline-flex items-center justify-between px-4 py2 bg-gray-500/30 text-gray-300 rounded-md  ${
            curr >= questions.length
              ? "cursor-not-allowed"
              : "hover:bg-gray-600/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
          }`}
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>
    </>
  );
}

export default QuizComponent;

const ErrorTost = ({ msg }: { msg: string }) => (
  <div
    className="absolute right-1 bottom-32 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-800 bg-red-300/40 divide-x divide-gray-400/20 rounded-lg shadow dark:text-gray-200 dark:divide-gray-500 space-x dark:bg-red-700/40"
    role="alert"
  >
    <AiOutlineWarning className="w-5 h-5" />
    <div className="pl-4 text-sm font-normal">{msg}</div>
  </div>
);

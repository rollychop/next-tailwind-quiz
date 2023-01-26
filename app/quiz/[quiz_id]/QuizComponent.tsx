"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBan, FaCheck } from "react-icons/fa";
import { AiOutlineWarning } from "react-icons/ai";
import { Option, QuestionModel } from "../../../typying";
import QuestionItem from "./QuestionItem";

function QuizComponent({ questions }: { questions: QuestionModel[] }) {
  const [curr, setCurr] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState(new Set<Option>());
  const [showAnswer, setShowAnswer] = useState(false);

  const setError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
  };
  const next = () => {
    if (curr < questions.length - 1) {
      setCurr(curr + 1);
      clear();
    } else setError("This is the last question");
  };
  const prev = () => {
    if (curr > 0) {
      setCurr(curr - 1);
      clear();
    } else setError("This is the first question");
  };
  const onOptionSelected = (option: Option) => {
    if (showAnswer) {
      setError("You Cannot Change Answer once view answer!");
      return;
    }
    const ops = new Set(selectedOptions);
    if (questions[curr].options.filter((op) => op.isCorrect).length === 1)
      ops.clear();
    if (ops.has(option)) ops.delete(option);
    else ops.add(option);
    setSelectedOptions(ops);
  };

  const clear = () => {
    setSelectedOptions(new Set());
    setShowAnswer(false);
  };

  const evaluate = () => {
    setShowAnswer(true);
  };
  return (
    <>
      {errorMsg && <ErrorTost msg={errorMsg} />}
      {/* <div className="flex items-center space-x-4 overflow-x-scroll hide-scrollbar">
        {questions.map((_, i) => (
          <>
            <div className="flex flex-col items-center">
              <label htmlFor={i.toString()}>{i + 1}</label>
              <input
                name={i.toString()}
                type="radio"
                id={i.toString()}
                value={i}
                className="bg-gray-500 min-w-fit rounded-full text-white"
              />
            </div>
          </>
        ))}
      </div> */}
      <QuestionItem
        ques={questions[curr]}
        questionNo={`${curr + 1}/${questions.length}`}
        onOptionClick={onOptionSelected}
        selectedOptions={selectedOptions}
        showAnswer={showAnswer}
      />
      <div className="fixed bottom-12 left-0 right-0 flex min-h-[1.75rem] justify-center space-x-4">
        <button
          onClick={prev}
          className={`py2 inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 focus:ring-4 dark:bg-gray-500/30 dark:text-gray-300 ${
            curr <= 0
              ? "cursor-not-allowed"
              : "hover:-translate-y-1 hover:bg-gray-600/40 active:translate-y-0"
          }`}
        >
          <FaArrowLeft className="sm:mr-2" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        <button
          onClick={next}
          className={`py2 inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 focus:ring-4 dark:bg-gray-500/30 dark:text-gray-300  ${
            curr >= questions.length - 1
              ? "cursor-not-allowed"
              : "transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 hover:shadow-lg active:translate-y-0"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <FaArrowRight className="sm:ml-2" />
        </button>
        <button
          onClick={clear}
          className="py2 inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 hover:shadow-lg focus:ring-4 active:translate-y-0 dark:bg-gray-500/30 dark:text-gray-300"
        >
          <span className="hidden sm:inline">Clear</span>
          <FaBan className="sm:ml-2" />
        </button>
        <button
          onClick={evaluate}
          className="py2 inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 hover:shadow-lg focus:ring-4 active:translate-y-0 dark:bg-gray-500/30 dark:text-gray-300"
        >
          <span className="hidden sm:inline">Submit</span>
          <FaCheck className="sm:ml-2" />
        </button>
      </div>
    </>
  );
}

export default QuizComponent;

const ErrorTost = ({ msg }: { msg: string }) => (
  <div
    className="space-x absolute right-0 bottom-0 left-0 z-50 mx-auto flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-400/20 rounded-lg bg-red-700 p-4 font-bold text-gray-200 shadow dark:divide-gray-500 dark:bg-red-700 dark:text-gray-200"
    role="alert"
  >
    <AiOutlineWarning className="h-5 w-5" />
    <div className="pl-4 text-sm font-normal">{msg}</div>
  </div>
);

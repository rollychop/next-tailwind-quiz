"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBan, FaCheck } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlineWarning } from "react-icons/ai";
import { Option, QuestionModel } from "../../../typying";
import QuestionItem from "./QuestionItem";

let attempted: Set<Option>[] | undefined;
function QuizComponent({ questions }: { questions: QuestionModel[] }) {
  const [curr, setCurr] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState(new Set<Option>());
  const [showAnswer, setShowAnswer] = useState(false);
  const [scrs, setScrs] = useState<{ score: number; msg: string }[]>([]);

  useEffect(() => {
    attempted = questions.map(() => new Set());
  }, [questions.toString()]);

  useEffect(() => {
    setSelectedOptions(attempted?.[curr] ?? new Set());
  }, [curr]);

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
      setError("Not permitted to change the answer once it has been viewed.");
      return;
    }

    const ops = new Set(selectedOptions);
    if (questions[curr].options.filter((op) => op.isCorrect).length === 1)
      ops.clear();
    if (ops.has(option)) ops.delete(option);
    else ops.add(option);
    setSelectedOptions(ops);
    attempted?.[curr].clear();
    ops.forEach((op) => attempted?.[curr].add(op));
  };

  const clear = () => {
    setSelectedOptions(new Set());
    setShowAnswer(false);
  };
  type Score = { score: number; msg: string };

  const evaluate = () => {
    const scores: Score[] | undefined = attempted?.map((ops, index) => {
      if (ops.size === 0) return { score: 0, msg: "Not Attempted" };
      const noOfCorrectOption = questions[index].options.filter(
        (op) => op.isCorrect
      ).length;
      if (ops.size === 1 && noOfCorrectOption === 1)
        return Array.from(ops)[0].isCorrect
          ? { score: 2, msg: "You're Correct!" }
          : { score: 0, msg: "Wrong Answer" };
      if (Array.from(ops).filter((op) => !op.isCorrect).length >= 1)
        return { score: 0, msg: "Wrong Answer" };

      const noOfSelectedCorrectOption = Array.from(ops).filter(
        (e) => e.isCorrect
      ).length;
      if (noOfCorrectOption === noOfSelectedCorrectOption)
        return { score: 2, msg: "You're Correct!" };
      return {
        score: parseFloat(
          ((noOfSelectedCorrectOption / noOfCorrectOption) * 2).toFixed(2)
        ),
        msg: "Partially Correct!",
      };
    });
    setScrs(
      scores ??
        questions.map(() => {
          return { score: 0, msg: "Not Attempted" };
        })
    );
    setShowAnswer(true);
  };

  const reset = () => {
    attempted = questions.map(() => new Set());
    setShowAnswer(false);
    setCurr(0);
    setScrs([]);
    setSelectedOptions(new Set());
  };

  return (
    <>
      {errorMsg && <ErrorTost msg={errorMsg} />}
      {showAnswer ? (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex justify-between px-4">
            <p>
              Total Score{" "}
              {scrs.map((sc) => sc.score).reduce((pr, cr) => pr + cr)}
            </p>
            <p>Out of {scrs.length * 2}</p>
          </div>
          {questions.map((ques, index) => (
            <QuestionItem
              key={index}
              ques={ques}
              questionNo={`${index + 1}/${questions.length}`}
              selectedOptions={attempted?.[index]}
              showAnswer={showAnswer}
            >
              <div className="flex justify-between">
                <p className="px-4">{scrs[index].msg}</p>
                <p className="px-4">Score : {scrs[index].score}</p>
              </div>
            </QuestionItem>
          ))}
          <div className="flex items-center justify-center">
            <button
              onClick={reset}
              className={`inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 focus:ring-4 active:translate-y-0 dark:bg-gray-500/30 dark:text-gray-300`}
            >
              <VscDebugRestart className="sm:mr-2" />
              <span className="ml-4">Re-attempt</span>
            </button>
          </div>
        </section>
      ) : (
        <>
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
              className={`inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 focus:ring-4 dark:bg-gray-500/30 dark:text-gray-300 ${
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
              className={`inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 focus:ring-4 dark:bg-gray-500/30 dark:text-gray-300  ${
                curr >= questions.length - 1
                  ? "cursor-not-allowed"
                  : "transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 hover:shadow-lg active:translate-y-0"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <FaArrowRight className="sm:ml-2" />
            </button>
            {/* <button
              onClick={clear}
              className="inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 hover:shadow-lg focus:ring-4 active:translate-y-0 dark:bg-gray-500/30 dark:text-gray-300"
            >
              <span className="hidden sm:inline">Clear</span>
              <FaBan className="sm:ml-2" />
            </button> */}
            <button
              onClick={evaluate}
              className="inline-flex items-center justify-between rounded-md bg-gray-900/20 px-4 font-bold ring-gray-400/50 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-600/40 hover:shadow-lg focus:ring-4 active:translate-y-0 dark:bg-gray-500/30 dark:text-gray-300"
            >
              <span className="hidden sm:inline">Submit</span>
              <FaCheck className="sm:ml-2" />
            </button>
          </div>
        </>
      )}
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

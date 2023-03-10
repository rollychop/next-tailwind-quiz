"use client";
import {
  FaCheckCircle,
  FaCircle,
  FaCheckDouble,
  FaBan,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";
import { QuestionModel, Option } from "../../../typying";

interface IProps {
  ques: QuestionModel;
  questionNo?: string;
  showAnswer?: boolean;
  selectedOptions?: Set<Option>;
  onOptionClick?: (op: Option) => void;
  children?: React.ReactNode;
}

const QuestionItem = ({
  ques,
  questionNo,
  selectedOptions,
  showAnswer,
  onOptionClick,
  children,
}: IProps) => {
  const isMultiSelect = ques.options.filter((op) => op.isCorrect).length > 1;

  return (
    <div className="divide-y-2 divide-dotted divide-gray-500/50 rounded-md bg-gray-300 dark:bg-gray-800">
      <div className="relative">
        <div
          className={`inline-flex w-full justify-around rounded-md bg-black/10 text-gray-500 shadow-sm dark:bg-gray-900/20 dark:text-gray-400`}
        >
          {questionNo && <span>{questionNo}</span>}
          <span>{ques.num}</span>
        </div>
        {ques.imageUrl && ques.imageUrl.length > 0 && (
          <img
            src={ques.imageUrl}
            className="aspect-auto w-full"
            alt="Image Question"
          />
        )}

        {ques.additional &&
          ques.additional.length > 0 &&
          ques.additional.split("<br>").map((ad) => (
            <p key={ad.toString()} className="px-4 text-justify opacity-80">
              {ad}
            </p>
          ))}
        <div className="px-4 py-2">
          {ques.question.split("<br>").map((questionText) => (
            <p className={`font-bold`} key={questionText.trim()}>
              {questionText}
            </p>
          ))}
        </div>
      </div>
      {isMultiSelect ? (
        <div className="px-4 text-center text-sm text-gray-500">
          Multi-select Question
        </div>
      ) : (
        <div className="px-4 text-center text-sm text-gray-500">
          Multiple Choice Question
        </div>
      )}
      <div className="pb-2">
        {ques.options.map((op, index) =>
          isMultiSelect ? (
            <MultiSelectOptionItem
              key={index}
              option={op}
              index={index}
              showAnswer={showAnswer}
              onOptionClick={onOptionClick}
              seletectedOption={selectedOptions}
            />
          ) : (
            <OptionItem
              key={index}
              option={op}
              index={index}
              showAnswer={showAnswer}
              onOptionClick={onOptionClick}
              seletectedOption={selectedOptions}
            />
          )
        )}
      </div>
      {children}
    </div>
  );
};

interface IPropOption {
  option: Option;
  index: number;
  showAnswer?: boolean;
  seletectedOption?: Set<Option>;
  onOptionClick?: (option: Option) => void;
}

const OptionItem = ({
  option,
  index,
  onOptionClick,
  showAnswer,
  seletectedOption,
}: IPropOption) => {
  return (
    <div
      className={`mt-4 grid cursor-pointer grid-cols-12 items-center gap-2 px-4 hover:opacity-90`}
      onClick={() => onOptionClick?.(option)}
    >
      <span>{String.fromCharCode(65 + index)}</span>
      {showAnswer ? (
        option.isCorrect ? (
          seletectedOption?.has(option) ? (
            <FaCheckCircle className="text-green-700 dark:text-green-500" />
          ) : (
            <FaCheckDouble className="text-green-700 dark:text-green-500" />
          )
        ) : seletectedOption?.has(option) ? (
          <FaBan className="text-red-700 dark:text-red-500" />
        ) : (
          <FaCircle className="text-gray-500" />
        )
      ) : seletectedOption?.has(option) ? (
        <FaCheckCircle className="text-gray-900 dark:text-gray-300" />
      ) : (
        <FaCircle className="text-gray-500" />
      )}
      <p className="col-span-10">{option.option}</p>
    </div>
  );
};

const MultiSelectOptionItem = ({
  option,
  index,
  onOptionClick,
  showAnswer,
  seletectedOption,
}: IPropOption) => {
  return (
    <div
      className={`mt-4 grid cursor-pointer grid-cols-12 items-center gap-2 px-4 hover:opacity-90`}
      onClick={() => onOptionClick?.(option)}
    >
      <span>{String.fromCharCode(65 + index)}</span>
      {showAnswer ? (
        option.isCorrect ? (
          seletectedOption?.has(option) ? (
            <FaCheckSquare className="text-green-700 dark:text-green-500" />
          ) : (
            <FaCheckDouble className="text-green-700 dark:text-green-500" />
          )
        ) : seletectedOption?.has(option) ? (
          <FaBan className="text-red-700 dark:text-red-500" />
        ) : (
          <FaSquare className="text-gray-500" />
        )
      ) : seletectedOption?.has(option) ? (
        <FaCheckSquare className="text-gray-900 dark:text-gray-300" />
      ) : (
        <FaSquare className="text-gray-500" />
      )}
      <p className="col-span-10">{option.option}</p>
    </div>
  );
};
export default QuestionItem;

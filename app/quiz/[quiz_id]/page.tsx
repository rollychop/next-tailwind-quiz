import { notFound } from "next/navigation";
import { Option, QuestionModel } from "../../../typying";

async function QuizPage({ params }: { params: { quiz_id: string } }) {
  try {
    const question: QuestionModel[] = await fetch(
      `${
        process.env.URL ? process.env.URL : "http://localhost:3000"
      }/api/question?year=${params.quiz_id}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((e) => e.json());
    const q = question.filter(
      (e) => e.additional !== null && e.additional.length > 0
    );
    return (
      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-center text-2xl">
          Start Learning Question from {params.quiz_id} Assingnment
        </h1>
        {question.map((ques) => (
          <QuestionItem ques={ques} key={ques.question} />
        ))}
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

const QuestionItem = ({ ques }: { ques: QuestionModel }) => {
  return (
    <div className="bg-gray-300 dark:bg-gray-800 rounded-md divide-y-2 divide-dotted divide-gray-500/50">
      <div className="relative">
        <p
          className={`text-gray-500 dark:text-gray-400 rounded-md bg-black/10 dark:bg-gray-900/20 w-full shadow-sm text-center`}
        >
          {ques.num}
        </p>
        {ques.imageUrl && ques.imageUrl.length > 0 && (
          <img
            src={ques.imageUrl}
            className="aspect-auto w-full"
            alt="extra information"
          />
        )}
        {ques.additional &&
          ques.additional.length > 0 &&
          ques.additional
            .split("<br>")
            .map((ad) => <p className="px-4 opacity-80 text-justify">{ad}</p>)}
        <div className="px-4 py-2">
          {ques.question.split("<br>").map((qu) => (
            <p className={`font-bold text-justify`} key={qu.trim()}>
              {qu}
            </p>
          ))}
        </div>
      </div>
      <div className="py-2">
        {ques.options.map((op, index) => (
          <OptionItem option={op} index={index} />
        ))}
      </div>
    </div>
  );
};

const OptionItem = ({ option, index }: { option: Option; index: number }) => (
  <div className="px-4 mt-4 flex gap-4 items-center hover:opacity-90 cursor-pointer">
    <p>{String.fromCharCode(65 + index)}</p>
    <p
      className={option.isCorrect ? "text-green-700 dark:text-green-500 " : ""}
    >
      {option.option}
    </p>
  </div>
);
export default QuizPage;

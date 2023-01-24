import { notFound } from "next/navigation";
import { QuestionModel } from "../../../typying";

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
    return (
      <div className="flex flex-col gap-4 my-4">
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
      <div className="px-4 py-2">
        <p className="text-gray-500">{ques.num}</p>
        <p className="font-bold text-justify">{ques.question}</p>
      </div>
      <div className="py-2">
        {ques.options.map((op, index) => (
          <div
            key={index}
            className="px-4 mt-4 flex gap-4 items-center hover:opacity-90 cursor-pointer"
          >
            <p>{String.fromCharCode(65 + index)}</p>
            <p
              className={
                op.isCorrect ? "text-green-700 dark:text-green-500 " : ""
              }
            >
              {op.option}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;

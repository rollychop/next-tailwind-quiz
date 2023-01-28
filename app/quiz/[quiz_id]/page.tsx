import { notFound } from "next/navigation";
import { QuestionModel } from "../../../typying";
import QuizComponent from "./QuizComponent";
async function QuizPage({ params }: { params: { quiz_id: string } }) {
  try {
    const questions: QuestionModel[] = await fetch(
      `${process.env.URL}/api/question?year=${params.quiz_id}`,
      {
        headers: {
          "content-type": "application/json",
        },
        next: {
          revalidate: 30,
        },
      }
    ).then((e) => e.json());

    return (
      <div className="my-4 flex flex-col gap-4">
        <h1 className="text-center text-2xl">
          Start Learning Question from {params.quiz_id} Assingnment
        </h1>
        <QuizComponent questions={questions} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

export default QuizPage;

import { NextRequest } from "next/server";
import { questionsMap } from "../../data";
import { QuestionModel } from "../../typying";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const se = req.nextUrl.search;
  const year = se.split("=")[1];
  if (questionsMap.has(year)) {
    const questions = getRandomUnique(10, questionsMap.get(year)!!);
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } else
    return new Response(null, {
      status: 404,
      headers: {
        "content-type": "application/json",
      },
    });
}

function getRandomUnique(
  size: number,
  questions: QuestionModel[]
): QuestionModel[] {
  const arr = [];
  while (arr.length < size) {
    const r = Math.floor(Math.random() * questions.length);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr.map((index) => questions[index]);
}

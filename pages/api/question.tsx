import { NextRequest } from "next/server";
import { queslist } from "../../data";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const se = req.nextUrl.search;
  const year = se.split("=")[1];
  if (year in queslist)
    //@ts-ignore
    return new Response(JSON.stringify(queslist[year]), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  else
    return new Response(null, {
      status: 404,
      headers: {
        "content-type": "application/json",
      },
    });
}

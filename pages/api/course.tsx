import { NextRequest, NextResponse } from "next/server";
import { allcourses } from "../../data";
export const config = {
  runtime: "edge",
};
export default async function handler(req: NextRequest, res: NextResponse) {
  return new Response(JSON.stringify(allcourses), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

import { buildCareerAnswer } from "@/lib/assistant";

export async function POST(request: Request) {
  const body = (await request.json()) as { question?: string };
  const question = body.question?.trim();

  if (!question) {
    return Response.json({ error: "请先输入你想咨询的问题。" }, { status: 400 });
  }

  return Response.json(await buildCareerAnswer(question));
}

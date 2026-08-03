export async function POST(request: Request) {
  const body = await request.json();
  const rating = Number(body.rating);

  if (!body.question || !body.answer || Number.isNaN(rating)) {
    return Response.json({ error: "反馈信息不完整。" }, { status: 400 });
  }

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/ai_conversations`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        question: body.question,
        answer: body.answer,
        rating,
        lead_intent: rating >= 4 ? "medium" : "low"
      })
    });

    if (!response.ok) {
      return Response.json({ error: "反馈暂时无法存储。" }, { status: 500 });
    }
  }

  return Response.json({ ok: true });
}

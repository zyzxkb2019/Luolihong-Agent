export async function POST(request: Request) {
  const body = await request.json();
  const required = ["name", "role", "contact", "problem"];
  const missing = required.filter((field) => !String(body[field] ?? "").trim());

  if (missing.length > 0) {
    return Response.json({ error: "请补充称呼、身份、联系方式和当前困惑。" }, { status: 400 });
  }

  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/consultation_orders`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        name: body.name,
        role: body.role,
        contact: body.contact,
        child_age: body.childAge,
        problem_summary: body.problem,
        source: body.source ?? "website",
        status: "new"
      })
    });

    if (!response.ok) {
      return Response.json({ error: "预约已收到前发生了存储异常，请稍后再试。" }, { status: 500 });
    }
  }

  return Response.json({
    ok: true,
    message: "已收到你的预约信息。内测阶段请同步添加罗老师微信，方便尽快联系。"
  });
}

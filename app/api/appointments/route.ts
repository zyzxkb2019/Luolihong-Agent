import { appendLead } from "@/lib/leads";

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["name", "role", "contact", "problem"];
  const missing = required.filter((field) => !String(body[field] ?? "").trim());

  if (missing.length > 0) {
    return Response.json({ error: "请补充称呼、身份、联系方式和当前困惑。" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasStorage = Boolean(supabaseUrl && supabaseKey);

  if (hasStorage && supabaseUrl && supabaseKey) {
    const response = await fetch(`${supabaseUrl}/rest/v1/consultation_orders`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
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

  await appendLead({
    name: String(body.name),
    role: String(body.role),
    contact: String(body.contact),
    childAge: String(body.childAge ?? ""),
    problem: String(body.problem),
    source: String(body.source ?? "website")
  });

  return Response.json({
    ok: true,
    persisted: true,
    message: "已收到你的预约信息。罗老师团队会尽快联系你。"
  });
}

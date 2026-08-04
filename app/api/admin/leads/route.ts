import { leadsToCsv, readLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return Response.json({ error: "未授权访问。" }, { status: 401 });
  }

  const leads = await readLeads();
  const csv = leadsToCsv(leads);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=luolihong-leads.csv"
    }
  });
}

import { formatDate, readLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function LeadsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token ?? "";

  if (!process.env.ADMIN_TOKEN) {
    return (
      <main className="min-h-screen bg-porcelain p-8 text-ink">
        <h1 className="text-2xl font-semibold">请先配置 ADMIN_TOKEN</h1>
        <p className="mt-4 text-ink/70">在服务器 `.env.local` 中添加 `ADMIN_TOKEN` 后重启 PM2。</p>
      </main>
    );
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return (
      <main className="min-h-screen bg-porcelain p-8 text-ink">
        <h1 className="text-2xl font-semibold">未授权访问</h1>
        <p className="mt-4 text-ink/70">请在链接后加上正确的 `?token=...`。</p>
      </main>
    );
  }

  const leads = await readLeads();

  return (
    <main className="min-h-screen bg-porcelain p-5 text-ink md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-brass">罗莉红智能体</p>
            <h1 className="mt-2 text-3xl font-semibold">预约线索后台</h1>
            <p className="mt-2 text-sm text-ink/60">共 {leads.length} 条线索，按提交时间倒序排列。</p>
          </div>
          <a
            className="inline-flex items-center justify-center bg-forest px-4 py-3 text-sm font-semibold text-white"
            href={`/api/admin/leads?token=${encodeURIComponent(token)}`}
          >
            导出 CSV
          </a>
        </div>

        <div className="mt-8 overflow-x-auto bg-white shadow-soft">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="bg-forest text-white">
              <tr>
                <th className="p-3">时间</th>
                <th className="p-3">称呼</th>
                <th className="p-3">身份</th>
                <th className="p-3">阶段</th>
                <th className="p-3">联系方式</th>
                <th className="p-3">来源</th>
                <th className="p-3">当前困惑</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-ink/10 align-top">
                  <td className="p-3 text-ink/60">{formatDate(lead.createdAt)}</td>
                  <td className="p-3 font-semibold">{lead.name}</td>
                  <td className="p-3">{lead.role}</td>
                  <td className="p-3">{lead.childAge || "-"}</td>
                  <td className="p-3">{lead.contact}</td>
                  <td className="p-3">{lead.source}</td>
                  <td className="max-w-lg p-3 leading-6">{lead.problem}</td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td className="p-8 text-center text-ink/55" colSpan={7}>
                    暂无预约线索。
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

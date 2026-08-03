"use client";

import { FormEvent, useState } from "react";
import { CalendarCheck, Copy } from "lucide-react";

export function AppointmentForm() {
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const params = new URLSearchParams(window.location.search);
    payload.source = params.get("source") ?? params.get("utm_source") ?? "website";
    const readableDraft = [
      "【罗莉红方向导航内测预约】",
      `称呼：${payload.name}`,
      `身份：${payload.role}`,
      `阶段：${payload.childAge || "未填写"}`,
      `联系方式：${payload.contact}`,
      `来源：${payload.source}`,
      `当前困惑：${payload.problem}`
    ].join("\n");

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setLoading(false);
    setStatus(data.message ?? data.error ?? "已提交。");
    setDraft(data.persisted ? "" : readableDraft);
    if (response.ok) event.currentTarget.reset();
  }

  async function copyDraft() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft);
    setStatus("已复制。请把这段信息发给罗老师团队。");
  }

  return (
    <section id="appointment" className="bg-warm py-16 md:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-brass">轻量预约</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">重大选择，不要只靠碎片信息硬扛。</h2>
          <p className="mt-5 leading-8 text-ink/70">
            留下你的核心困惑。内测阶段，我们会优先联系高意向家庭和处在关键决策节点的学生。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-5 shadow-soft md:grid-cols-2 md:p-6">
          <input name="name" required className="focus-ring border border-ink/15 p-3" placeholder="称呼" />
          <select name="role" required className="focus-ring border border-ink/15 p-3">
            <option value="">你的身份</option>
            <option>家长</option>
            <option>高中生</option>
            <option>大学生</option>
            <option>职场人士</option>
          </select>
          <input name="childAge" className="focus-ring border border-ink/15 p-3" placeholder="孩子年龄/本人阶段" />
          <input name="contact" required className="focus-ring border border-ink/15 p-3" placeholder="微信或手机号" />
          <textarea
            name="problem"
            required
            rows={5}
            className="focus-ring border border-ink/15 p-3 md:col-span-2"
            placeholder="当前最想解决的困惑是什么？"
          />
          <button
            disabled={loading}
            className="focus-ring inline-flex items-center justify-center gap-2 bg-forest px-5 py-3 font-semibold text-white transition hover:bg-ink disabled:opacity-60 md:col-span-2"
          >
            <CalendarCheck size={18} />
            {loading ? "正在提交..." : "预约一次初步沟通"}
          </button>
          <p className="md:col-span-2 text-xs leading-5 text-ink/45">
            提交即表示你同意罗老师团队基于本次内测目的联系你。请不要在表单中填写身份证号、病历等敏感信息。
          </p>
          {status ? <p className="md:col-span-2 bg-porcelain p-3 text-sm text-forest">{status}</p> : null}
          {draft ? (
            <div className="md:col-span-2 border border-brass/30 bg-porcelain p-4">
              <pre className="whitespace-pre-wrap text-xs leading-6 text-ink/70">{draft}</pre>
              <button
                type="button"
                onClick={copyDraft}
                className="focus-ring mt-3 inline-flex items-center gap-2 bg-brass px-4 py-2 text-sm font-semibold text-white hover:bg-coral"
              >
                <Copy size={16} />
                复制预约信息
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}

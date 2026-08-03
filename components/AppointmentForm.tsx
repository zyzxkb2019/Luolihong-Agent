"use client";

import { FormEvent, useState } from "react";
import { CalendarCheck } from "lucide-react";

export function AppointmentForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    setLoading(false);
    setStatus(data.message ?? data.error ?? "已提交。");
    if (response.ok) event.currentTarget.reset();
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
          {status ? <p className="md:col-span-2 bg-porcelain p-3 text-sm text-forest">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}

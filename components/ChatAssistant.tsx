"use client";

import { FormEvent, useState } from "react";
import { CalendarCheck, Send, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

type ChatResponse = {
  answer: string;
  references: { title: string; tags: string[] }[];
};

export function ChatAssistant() {
  const [question, setQuestion] = useState("孩子高一，成绩中等，最近沉迷游戏，不愿意聊未来怎么办？");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setFeedback("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "暂时无法生成回答，请稍后再试。");
      return;
    }

    setResponse(data);
  }

  async function rateAnswer(rating: number) {
    if (!response) return;
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        answer: response.answer,
        rating
      })
    });
    setFeedback(rating >= 4 ? "收到。这个回答会计入“说中率”。" : "收到。低分反馈会优先用于改进内测版本。");
  }

  return (
    <section id="assistant" className="bg-forest py-16 text-white md:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-warm">3分钟问题地图</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">不是要一段漂亮回答，而是看清真正卡点。</h2>
          <p className="mt-5 leading-8 text-white/72">
            通用大模型能给建议，罗老师智能体要做的是另一件事：把你的困惑放进真实案例和高管判断框架里，生成一张可行动的问题地图。
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/80">
            <div className="border border-white/15 p-4">适合：厌学、游戏、选科、志愿、留学、专业、就业迷茫</div>
            <div className="border border-white/15 p-4">边界：不提供医疗、法律、心理疾病诊断或投资建议</div>
          </div>
        </div>

        <div className="bg-porcelain p-5 text-ink shadow-soft md:p-6">
          <form onSubmit={handleSubmit}>
            <label className="text-sm font-semibold text-ink">写下你的真实困惑</label>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={5}
              className="focus-ring mt-3 w-full resize-none border border-ink/15 bg-white p-4 leading-7"
              placeholder="例如：孩子高二，想学传媒，但家里担心就业..."
            />
            <button
              type="submit"
              disabled={loading}
              className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 bg-brass px-5 py-3 font-semibold text-white transition hover:bg-coral disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "正在生成问题地图..." : "生成我的问题地图"}
            </button>
          </form>

          {error ? <p className="mt-4 bg-coral/10 p-3 text-sm text-coral">{error}</p> : null}

          <div className="mt-6 min-h-[220px] border border-ink/10 bg-white p-5">
            {response ? (
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-forest">
                  <Sparkles size={18} />
                  问题地图
                </div>
                <div className="mt-4 whitespace-pre-line text-sm leading-7 text-ink/78">{response.answer}</div>
                {response.references.length > 0 ? (
                  <div className="mt-5 border-t border-ink/10 pt-4 text-xs text-ink/55">
                    参考案例：{response.references.map((item) => item.title).join("、")}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-col gap-3 border-t border-ink/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => rateAnswer(5)}
                      className="focus-ring inline-flex items-center gap-2 border border-forest/20 px-3 py-2 text-xs font-semibold text-forest hover:bg-forest hover:text-white"
                    >
                      <ThumbsUp size={15} />
                      说中了
                    </button>
                    <button
                      type="button"
                      onClick={() => rateAnswer(2)}
                      className="focus-ring inline-flex items-center gap-2 border border-coral/20 px-3 py-2 text-xs font-semibold text-coral hover:bg-coral hover:text-white"
                    >
                      <ThumbsDown size={15} />
                      没说中
                    </button>
                  </div>
                  <a
                    href="#appointment"
                    className="inline-flex items-center justify-center gap-2 bg-forest px-3 py-2 text-xs font-semibold text-white hover:bg-ink"
                  >
                    <CalendarCheck size={15} />
                    预约真人判断
                  </a>
                </div>
                {feedback ? <p className="mt-3 bg-porcelain p-3 text-xs text-forest">{feedback}</p> : null}
              </div>
            ) : (
              <div className="flex h-full min-h-[180px] items-center justify-center text-center text-sm leading-7 text-ink/55">
                输入问题后，这里会生成一份初步问题地图。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

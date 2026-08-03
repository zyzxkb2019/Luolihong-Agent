"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { allTags, caseStories } from "@/data/cases";

export function CaseLibrary() {
  const [activeTag, setActiveTag] = useState("全部");
  const [activeId, setActiveId] = useState(caseStories[0]?.id);

  const filtered = useMemo(() => {
    if (activeTag === "全部") return caseStories;
    return caseStories.filter((story) => story.tags.includes(activeTag));
  }, [activeTag]);

  const active = caseStories.find((story) => story.id === activeId) ?? filtered[0];

  return (
    <section id="cases" className="bg-white py-16 md:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-brass">真实案例库</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-ink md:text-4xl">
              先看到相似处，再找到下一步。
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-ink/60">
            <Search size={18} />
            <span>点击标签筛选，点击卡片查看详情</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {["全部", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`focus-ring rounded-full border px-4 py-2 text-sm transition ${
                activeTag === tag
                  ? "border-forest bg-forest text-white"
                  : "border-ink/10 bg-porcelain text-ink hover:border-brass"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.length === 0 ? (
              <div className="col-span-full border border-dashed border-ink/15 bg-porcelain p-8 text-center text-ink/60">
                暂无匹配案例
              </div>
            ) : (
              filtered.map((story) => (
                <button
                  key={story.id}
                  onClick={() => setActiveId(story.id)}
                  className={`focus-ring min-h-[220px] border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${
                    active?.id === story.id ? "border-brass bg-warm" : "border-ink/10 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold text-coral">{story.audience}</span>
                    <ArrowRight size={18} className="shrink-0 text-brass" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-ink">{story.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/70">{story.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-white/70 px-2 py-1 text-xs text-forest">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))
            )}
          </div>

          <aside className="border border-ink/10 bg-porcelain p-6 shadow-soft lg:sticky lg:top-6 lg:self-start">
            <p className="text-sm font-semibold text-brass">案例拆解</p>
            <h3 className="mt-3 text-2xl font-semibold text-ink">{active.title}</h3>
            <div className="mt-5 space-y-5 text-sm leading-7 text-ink/75">
              <div>
                <p className="font-semibold text-ink">卡点</p>
                <p>{active.tension}</p>
              </div>
              <div>
                <p className="font-semibold text-ink">罗老师判断</p>
                <p>{active.insight}</p>
              </div>
              <div>
                <p className="font-semibold text-ink">变化</p>
                <p>{active.outcome}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

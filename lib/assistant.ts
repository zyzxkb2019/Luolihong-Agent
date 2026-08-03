import { caseStories } from "@/data/cases";

const keywordMap = [
  ["游戏", "厌学", "手机", "沉迷"],
  ["留学", "申请", "奖学金", "国外"],
  ["高考", "志愿", "专业", "分数", "选科"],
  ["大学", "转专业", "考研", "就业", "迷茫"],
  ["不想上学", "情绪", "小学", "亲子"],
  ["职场", "转型", "工作", "职业"]
];

export function buildCareerAnswer(question: string) {
  const normalized = question.trim();
  const matched = caseStories
    .map((story) => {
      const haystack = [story.title, story.summary, story.tension, story.insight, story.outcome, ...story.tags].join("");
      const score =
        [...story.tags, ...keywordMap.flat()].reduce((sum, word) => {
          return sum + (normalized.includes(word) && haystack.includes(word) ? 2 : 0);
        }, 0) +
        [...story.title.matchAll(/[\u4e00-\u9fa5]{2,}/g)].reduce((sum, match) => {
          return sum + (normalized.includes(match[0]) ? 1 : 0);
        }, 0);
      return { story, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const references = matched.filter((item) => item.score > 0).map((item) => item.story);
  const anchor = references[0] ?? caseStories[0];

  return {
    answer: [
      "我先给你一个初步判断：这个问题不要只看表面的选择或行为，要先看它背后的驱动力、压力源和可行动路径。",
      `从罗老师过往的「${anchor.title}」这类脱敏案例看，真正的转折点通常不是立刻做决定，而是先把问题翻译清楚：孩子/本人到底是能力不够、动力断了、路径不清，还是家庭沟通已经卡住。`,
      "可以先做三步：第一，记录最近一次冲突或迷茫发生的具体场景；第二，区分事实、情绪和家长期待；第三，列出一个两周内能验证的小行动，比如访谈一位相关专业的人、完成一次兴趣任务、或把志愿/职业选项做成对比表。",
      "如果你愿意继续，可以把年龄阶段、当前成绩或专业、最让你焦虑的一句话补充给我。我会帮你生成一份更具体的问题地图和下一步判断。复杂情况建议预约罗老师人工咨询，避免用碎片信息做重大决定。"
    ].join("\n\n"),
    references: (references.length > 0 ? references : [anchor]).map((story) => ({
      title: story.title,
      tags: story.tags
    }))
  };
}

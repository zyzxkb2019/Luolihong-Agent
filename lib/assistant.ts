import { caseStories } from "@/data/cases";
import { methodKnowledge } from "@/data/knowledge";

const keywordMap = [
  ["游戏", "厌学", "手机", "沉迷"],
  ["留学", "申请", "奖学金", "国外"],
  ["高考", "志愿", "专业", "分数", "选科"],
  ["大学", "转专业", "考研", "就业", "迷茫"],
  ["不想上学", "情绪", "小学", "亲子"],
  ["职场", "转型", "工作", "职业"]
];

function selectReferences(question: string) {
  const normalized = question.trim();
  return caseStories
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
}

function fallbackAnswer(question: string) {
  const matched = selectReferences(question);

  const references = matched.filter((item) => item.score > 0).map((item) => item.story);
  const anchor = references[0] ?? caseStories[0];

  return {
    answer: [
      "一、表层问题\n你现在看到的是选择、学习状态或沟通问题，但它可能只是外层表现。",
      `二、相似案例\n从罗老师过往的「${anchor.title}」这类脱敏案例看，真正的转折点通常不是立刻做决定，而是先把问题翻译清楚。`,
      "三、深层卡点\n需要判断孩子/本人到底是能力不够、动力断了、路径不清，还是家庭沟通已经卡住。如果只处理表面行为，很容易越管越僵。",
      "四、两周验证动作\n第一，记录最近一次冲突或迷茫发生的具体场景；第二，区分事实、情绪和家长期待；第三，列出一个两周内能验证的小行动，比如访谈一位相关专业的人、完成一次兴趣任务，或把志愿/职业选项做成对比表。",
      "五、是否建议预约\n如果这个问题已经持续超过一个月，或影响亲子关系、选科志愿、留学专业等关键决定，建议预约罗老师人工判断，避免用碎片信息做重大选择。"
    ].join("\n\n"),
    references: (references.length > 0 ? references : [anchor]).map((story) => ({
      title: story.title,
      tags: story.tags
    }))
  };
}

export async function buildCareerAnswer(question: string) {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const matched = selectReferences(question);
  const references = matched.filter((item) => item.score > 0).map((item) => item.story);
  const selected = references.length > 0 ? references : [caseStories[0]];

  if (!apiKey) {
    return fallbackAnswer(question);
  }

  const knowledge = selected
    .map((story) => {
      return [
        `标题：${story.title}`,
        `标签：${story.tags.join("、")}`,
        `摘要：${story.summary}`,
        `卡点：${story.tension}`,
        `判断：${story.insight}`,
        `变化：${story.outcome}`
      ].join("\n");
    })
    .join("\n\n");
  const methodContext = methodKnowledge.map((item) => `${item.title}：${item.content}`).join("\n");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content:
            "你是罗莉红方向导航智能体。你不是通用问答机器人，而是问题地图生成器。第一任务不是给漂亮建议，而是帮助家长、学生或职场转型者把真实卡点说清楚。语气温暖、坚定、克制。结合高管视角和专业规划视角。不能编造案例，不能提供医疗、法律、心理疾病诊断或投资建议。复杂情况引导预约罗老师人工咨询。"
        },
        {
          role: "user",
          content: `用户问题：${question}\n\n罗老师方法论：\n${methodContext}\n\n可引用的脱敏案例资料：\n${knowledge}\n\n请用中文生成“问题地图”，必须使用以下结构：一、表层问题；二、相似案例；三、深层卡点；四、两周验证动作；五、是否建议预约。不要使用“生涯困局”这个表达，不要输出空泛鸡汤。`
        }
      ]
    })
  });

  if (!response.ok) {
    return fallbackAnswer(question);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const answer = data.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    return fallbackAnswer(question);
  }

  return {
    answer,
    references: selected.map((story) => ({
      title: story.title,
      tags: story.tags
    }))
  };
}

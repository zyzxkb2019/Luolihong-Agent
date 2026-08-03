export type CaseStory = {
  id: string;
  title: string;
  tags: string[];
  audience: "家长" | "高中生" | "大学生" | "职场人士";
  summary: string;
  tension: string;
  insight: string;
  outcome: string;
};

export const caseStories: CaseStory[] = [
  {
    id: "game-to-founder",
    title: "从游戏少年到未来创业者",
    tags: ["厌学", "游戏", "优势识别", "亲子沟通"],
    audience: "家长",
    summary: "孩子沉迷游戏，家长以为是自控力问题。罗老师把游戏行为拆成策略感、组织力和即时反馈需求，重新找到孩子愿意行动的入口。",
    tension: "父母越催，孩子越退回屏幕；家庭对话只剩成绩、手机和冲突。",
    insight: "先不要急着拔掉游戏，而是看见孩子在游戏里被点燃的能力，再把这种能力迁移到真实世界。",
    outcome: "家庭沟通从对抗转向共同设计任务，孩子开始愿意讨论项目、表达目标，并尝试把兴趣转化为可执行计划。"
  },
  {
    id: "engineering-to-criminal-psychology",
    title: "从工程学到犯罪心理学的使命召唤",
    tags: ["专业转换", "留学", "使命感", "Career Direct"],
    audience: "大学生",
    summary: "一个原本走工程路径的学生，在深度访谈和职业测评中发现自己真正被驱动的是人性、秩序与社会议题。",
    tension: "专业看起来稳定，却无法产生长期热情；家人担心转换方向成本太高。",
    insight: "生涯选择不是简单追兴趣，而是让能力、价值观、人格特质和社会需求形成闭环。",
    outcome: "学生重建申请叙事，明确跨学科路径，把转向变成有逻辑、有证据、有行动计划的选择。"
  },
  {
    id: "top-student-rebellion",
    title: "学霸的叛逆：当第一名不再快乐",
    tags: ["学霸压力", "亲子关系", "心理支持", "升学规划"],
    audience: "家长",
    summary: "成绩优秀的孩子突然失去动力。问题并不在学习能力，而在长期被单一评价体系压住了真实自我。",
    tension: "父母不理解：明明成绩很好，为什么还会痛苦、反抗、逃避？",
    insight: "越优秀的孩子，越需要从“被期待的人生”里重新找到“我想成为谁”。",
    outcome: "咨询从情绪理解进入生涯重构，帮助家庭把成绩优势转化为更清晰的专业和成长路径。"
  },
  {
    id: "scholarship-four-schools",
    title: "横扫四大名校，拿下高额奖学金",
    tags: ["留学申请", "奖学金", "背景提升", "个人叙事"],
    audience: "高中生",
    summary: "学生不只是补材料，而是把个人经历、优势证据和未来方向组织成一条可信的成长线。",
    tension: "优秀经历很多，但缺少主线，申请材料像一堆散点。",
    insight: "真正有竞争力的申请，不是展示“我做过很多”，而是证明“我为什么是这个方向的人”。",
    outcome: "学生形成有辨识度的申请叙事，最终获得多所学校认可和奖学金支持。"
  },
  {
    id: "seven-year-old-school-refusal",
    title: "七岁男孩“不想上学”背后的心理信号",
    tags: ["低龄儿童", "不想上学", "家庭陪伴", "情绪识别"],
    audience: "家长",
    summary: "孩子说不想上学，表面是逃避，背后可能是安全感、表达能力和环境适应共同发出的信号。",
    tension: "家长急于讲道理，孩子却说不清楚，只能用拒绝表达。",
    insight: "低龄孩子的问题要先翻译情绪，再讨论行为；先接住，才能引导。",
    outcome: "家长开始用观察和提问替代责备，逐步找到孩子在学校情境中的真实压力点。"
  },
  {
    id: "gaokao-400",
    title: "400分，别把孩子填废了",
    tags: ["高考志愿", "专业选择", "低分段策略", "家庭决策"],
    audience: "家长",
    summary: "分数不高的孩子更需要策略，而不是随便能上就行。志愿填报本质上是资源、风险和未来路径的组合判断。",
    tension: "家长把低分等同于没选择，容易用短期录取替代长期适配。",
    insight: "低分段最怕的不是学校普通，而是专业、城市、就业路径和孩子特质全部错配。",
    outcome: "家庭重新评估专业方向、城市机会和孩子承受力，避免为了录取牺牲长期发展。"
  }
];

export const allTags = Array.from(new Set(caseStories.flatMap((item) => item.tags)));

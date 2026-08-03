import { ArrowDown, BadgeCheck, BrainCircuit, MessageCircle, Target, Users } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { CaseLibrary } from "@/components/CaseLibrary";
import { ChatAssistant } from "@/components/ChatAssistant";
import { profile } from "@/data/profile";

const painScenes = [
  "孩子沉迷游戏，不愿沟通",
  "高考志愿怕一步填错",
  "想留学，却讲不清优势",
  "大学专业不喜欢，转不转都焦虑",
  "成绩不错，但孩子越来越没劲",
  "工作几年，想转型却看不清方向"
];

const metrics = [
  ["200+", "学生陪跑支持"],
  ["100+", "Career Direct成功案例"],
  ["50+", "青少年深度出境服务"],
  ["3家", "行业龙头上市公司高管经历"]
];

export default function Home() {
  return (
    <main>
      <header className="bg-porcelain">
        <nav className="section-shell flex min-h-16 items-center justify-between gap-4 py-4">
          <a href="#top" className="font-semibold text-ink">
            罗莉红智能体
          </a>
          <div className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
            <a href="#method" className="hover:text-forest">方法</a>
            <a href="#cases" className="hover:text-forest">案例</a>
            <a href="#assistant" className="hover:text-forest">提问</a>
            <a href="#appointment" className="hover:text-forest">预约</a>
          </div>
          <a href="#assistant" className="bg-forest px-4 py-2 text-sm font-semibold text-white">
            先问一个问题
          </a>
        </nav>
      </header>

      <section id="top" className="relative overflow-hidden bg-porcelain">
        <div className="section-shell grid min-h-[calc(100vh-64px)] gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16">
          <div>
            <p className="text-sm font-semibold text-brass">给正在为孩子和未来焦虑的人</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-ink md:text-6xl">
              别急着替孩子选路，先看清他真正卡在哪里。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-ink/72">
              罗莉红把上市公司高管的判断力、GCDF/Career Direct专业工具和200+真实陪跑经验，变成一个可以先问、先看、先行动的智能入口。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#assistant" className="inline-flex items-center justify-center gap-2 bg-brass px-6 py-4 font-semibold text-white transition hover:bg-coral">
                说说我家的情况
                <MessageCircle size={19} />
              </a>
              <a href="#cases" className="inline-flex items-center justify-center gap-2 border border-ink/15 px-6 py-4 font-semibold text-ink transition hover:border-brass">
                看真实案例
                <ArrowDown size={19} />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {metrics.map(([value, label]) => (
                <div key={label} className="border border-ink/10 bg-white/60 p-4">
                  <p className="text-2xl font-semibold text-forest">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-ink/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-ink/10 bg-white p-5 shadow-soft md:p-7">
            <p className="text-sm font-semibold text-coral">这些问题，不是你一个家庭在经历</p>
            <div className="mt-5 grid gap-3">
              {painScenes.map((scene) => (
                <div key={scene} className="flex items-center gap-3 bg-porcelain p-4">
                  <BadgeCheck size={18} className="shrink-0 text-brass" />
                  <span className="text-sm font-medium text-ink">{scene}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-forest p-5 text-white">
              <p className="text-sm leading-7 text-white/82">
                第一版智能体先帮你完成一件事：把混乱的焦虑翻译成可以讨论、可以验证、可以预约深聊的问题。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="section-shell grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="text-sm font-semibold text-brass">罗莉红是谁</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{profile.name}</h2>
            <p className="mt-4 text-lg leading-8 text-ink/70">{profile.title}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.highlights.map((item) => (
              <div key={item} className="border border-ink/10 bg-porcelain p-4 text-sm leading-6 text-ink/72">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="bg-porcelain py-16 md:py-24">
        <div className="section-shell">
          <p className="text-sm font-semibold text-brass">罗老师的方法</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-ink md:text-4xl">
            不是立刻给答案，而是把孩子、路径和行动重新对齐。
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {profile.method.map((item, index) => {
              const icons = [Users, Target, BrainCircuit];
              const Icon = icons[index];
              return (
                <div key={item.name} className="border border-ink/10 bg-white p-6 shadow-soft">
                  <Icon size={28} className="text-brass" />
                  <h3 className="mt-5 text-xl font-semibold text-ink">{item.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/70">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CaseLibrary />
      <ChatAssistant />
      <AppointmentForm />

      <footer className="bg-ink py-8 text-white">
        <div className="section-shell text-sm leading-7 text-white/60">
          <p>内测说明：本工具用于初步梳理教育、升学与职业方向困惑，不替代医疗、法律、心理诊断或一对一个性化咨询。</p>
        </div>
      </footer>
    </main>
  );
}

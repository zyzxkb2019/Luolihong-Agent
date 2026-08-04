import { mkdir, readFile, appendFile } from "fs/promises";
import path from "path";

export type Lead = {
  id: string;
  name: string;
  role: string;
  contact: string;
  childAge?: string;
  problem: string;
  source: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), ".data");
const leadsPath = path.join(dataDir, "leads.jsonl");

export async function appendLead(input: Omit<Lead, "id" | "createdAt">) {
  await mkdir(dataDir, { recursive: true });
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  await appendFile(leadsPath, `${JSON.stringify(lead)}\n`, "utf8");
  return lead;
}

export async function readLeads() {
  try {
    const raw = await readFile(leadsPath, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Lead)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

export function leadsToCsv(leads: Lead[]) {
  const headers = ["时间", "称呼", "身份", "阶段", "联系方式", "来源", "当前困惑"];
  const rows = leads.map((lead) => [
    formatDate(lead.createdAt),
    lead.name,
    lead.role,
    lead.childAge ?? "",
    lead.contact,
    lead.source,
    lead.problem
  ]);
  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function csvCell(value: string) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

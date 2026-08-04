import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://career.4nianji.com"),
  title: "罗莉红方向导航智能体",
  description: "用高管视角与专业工具，帮助家庭和年轻人看清方向、路径与行动。",
  openGraph: {
    title: "罗莉红方向导航智能体",
    description: "别急着替孩子选路，先看清他真正卡在哪里。",
    images: ["/luo-lihong-card.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

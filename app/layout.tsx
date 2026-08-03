import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "罗莉红方向导航智能体",
  description: "用高管视角与专业工具，帮助家庭和年轻人看清方向、路径与行动。"
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

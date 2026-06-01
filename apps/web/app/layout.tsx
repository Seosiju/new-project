import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "new-project",
  description: "전략기획 업무를 돕는 어시스턴트 서비스",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

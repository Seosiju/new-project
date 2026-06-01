const frameworks = ["SWOT", "3C", "PEST", "OKR"];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Strategy Planning Assistant
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          전략기획 업무를 빠르게 구조화하는 웹 어시스턴트
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          시장/경쟁사 분석, 프레임워크 기반 기획, 회의 메모 요약을 하나의 워크플로로 묶는 MVP를 준비 중입니다.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {frameworks.map((name) => (
            <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl">
              <div className="text-2xl font-semibold text-white">{name}</div>
              <p className="mt-2 text-sm text-slate-400">분석 템플릿 준비</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

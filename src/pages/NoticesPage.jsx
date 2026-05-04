import { Link } from "react-router-dom";
import { notices } from "../data/notices";

export default function NoticesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ww-ink text-slate-100">
      <div className="absolute inset-0 -z-20 bg-ww-page" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,231,239,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(111,155,186,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%)]" />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
          >
            返回首页
          </Link>

          <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
            公告中心
          </div>
        </div>

        <section className="relative mt-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] shadow-panel">
          <div className="absolute inset-0 bg-[linear-gradient(126deg,rgba(255,255,255,0.09),transparent_22%,transparent_66%,rgba(142,179,202,0.2)),radial-gradient(circle_at_80%_22%,rgba(222,232,239,0.2),transparent_16%),radial-gradient(circle_at_16%_18%,rgba(90,128,156,0.18),transparent_24%)]" />
          <div className="relative px-6 py-8 md:px-10 lg:px-12 lg:py-14">
            <p className="text-xs uppercase tracking-[0.38em] text-slate-300">公告</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[0.08em] text-white md:text-6xl">
              公告与更新记录
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-8 text-slate-200 md:text-base">
              这里集中记录页面更新、资料补充、资源接入与维护动态，方便快速查看最近变动。
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-5">
          {notices.map((notice, index) => (
            <article
              key={notice.id}
              className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.34em] text-slate-300">{notice.type}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[0.06em] text-white">
                    {notice.title}
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300">
                  {notice.date}
                </div>
              </div>

              <p className="mt-5 max-w-4xl text-sm leading-8 text-slate-200 md:text-base">
                {notice.summary}
              </p>

              <div className="mt-6 grid gap-3">
                {notice.content.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

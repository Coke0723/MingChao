import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CharacterArtwork from "../components/CharacterArtwork";
import { notices } from "../data/notices";
import { findFeaturedCharacterByVersion, versionGroups } from "../data/versions";

const navItems = ["首页", "版本角色", "公告情报", "攻略索引"];

const guideEntries = [
  "角色强度梯度",
  "声骸套装推荐",
  "开荒路线图",
  "材料掉落一览",
  "地图收集清单",
  "版本活动速查",
];

const tickerItems = [
  "角色入口已经按版本整理",
  "1.0 / 2.0 / 3.0 基础结构已完成",
  "角色详情页已经接入",
  "后续可继续扩展版本专题页",
];

const sectionStops = [
  { id: "hero", label: "首屏", sublabel: "HOME" },
  { id: "versions", label: "版本", sublabel: "VERSIONS" },
  { id: "updates", label: "公告 / 攻略", sublabel: "UPDATES" },
];

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="text-xs uppercase tracking-[0.42em] text-slate-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionElements = sectionStops
      .map((stop) => ({ id: stop.id, element: document.getElementById(stop.id) }))
      .filter((entry) => entry.element);

    if (!sectionElements.length) {
      return undefined;
    }

    const updateActiveSection = () => {
      const anchorLine = window.innerHeight * 0.32;
      let closestId = sectionStops[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach(({ id, element }) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - anchorLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });

      setActiveSection(closestId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ww-ink text-slate-100">
      <div className="absolute inset-0 -z-20 bg-ww-page" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,231,239,0.18),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(111,155,186,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-sm tracking-[0.32em] text-white">
              WW
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.42em] text-slate-300">
                Wuthering Waves
              </p>
              <p className="mt-1 text-lg font-medium tracking-[0.16em] text-white">鸣潮 Wiki</p>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a key={item} href="#versions" className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#versions"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
          >
            查看版本角色
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-6 md:px-8 md:pt-8">
        <div className="relative">
          <aside className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
            <div className="w-[164px] rounded-[28px] border border-white/12 bg-slate-950/82 px-4 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.34em] text-slate-400">LINE 01</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">区块导航</p>
                </div>
                <span className="rounded-full border border-sky-100/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-sky-100">
                  在线
                </span>
              </div>

              <div className="relative">
                <div className="absolute bottom-2 left-[11px] top-2 w-px bg-[linear-gradient(180deg,rgba(186,216,233,0.16),rgba(186,216,233,0.75),rgba(186,216,233,0.16))]" />
                <div className="grid gap-4">
                  {sectionStops.map((stop, index) => {
                    const isActive = activeSection === stop.id;

                    return (
                      <a
                        key={stop.id}
                        href={`#${stop.id}`}
                        className={`group relative flex items-center gap-3 rounded-2xl px-2 py-2 transition ${
                          isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
                        }`}
                      >
                        <span
                          className={`absolute left-[11px] top-1/2 h-px -translate-y-1/2 transition-all duration-300 ${
                            isActive
                              ? "w-12 bg-[linear-gradient(90deg,rgba(186,216,233,0.96),rgba(186,216,233,0.12))]"
                              : "w-0 bg-transparent"
                          }`}
                        />
                        <span
                          className={`relative z-10 rounded-full border transition ${
                            isActive
                              ? "h-[15px] w-[15px] border-sky-100 bg-sky-100 shadow-[0_0_0_4px_rgba(186,216,233,0.18)]"
                              : "h-[11px] w-[11px] border-sky-100/80 bg-slate-950 shadow-[0_0_0_3px_rgba(186,216,233,0.12)] group-hover:bg-sky-100"
                          }`}
                        />
                        <div
                          className={`rounded-2xl px-2 py-1 transition ${
                            isActive
                              ? "bg-sky-200/[0.06] shadow-[inset_0_0_0_1px_rgba(186,216,233,0.08)]"
                              : ""
                          }`}
                        >
                          <p
                            className={`text-[11px] uppercase tracking-[0.28em] ${
                              isActive ? "text-sky-100" : "text-slate-500"
                            }`}
                          >
                            0{index + 1}
                          </p>
                          <p className={`mt-1 text-sm font-medium ${isActive ? "text-sky-50" : "text-white"}`}>
                            {stop.label}
                          </p>
                          <p
                            className={`text-[10px] uppercase tracking-[0.24em] ${
                              isActive ? "text-sky-200" : "text-slate-400"
                            }`}
                          >
                            {stop.sublabel}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-2 pl-6 text-[10px] uppercase tracking-[0.28em] text-slate-500">
                  <span className="h-px w-6 bg-white/10" />
                  <span>终点站</span>
                </div>
              </div>
            </div>
          </aside>

          <section
            id="hero"
            className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] shadow-panel"
          >
            <div className="absolute inset-0 bg-[linear-gradient(126deg,rgba(255,255,255,0.09),transparent_22%,transparent_66%,rgba(142,179,202,0.2)),radial-gradient(circle_at_80%_22%,rgba(222,232,239,0.2),transparent_16%),radial-gradient(circle_at_16%_18%,rgba(90,128,156,0.18),transparent_24%)]" />
            <div className="absolute right-[-10%] top-8 hidden h-[32rem] w-[32rem] rounded-full border border-white/10 bg-white/5 blur-3xl lg:block" />
            <div className="absolute inset-y-0 right-0 hidden w-[46%] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0)),linear-gradient(135deg,rgba(196,214,225,0.18),rgba(0,0,0,0))] lg:block" />

            <div className="relative grid gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:px-12 lg:py-14">
              <div className="flex flex-col justify-between">
                <div className="animate-rise">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.38em] text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-sky-200" />
                    资料总站
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-slate-300">
                    <span className="rounded-full border border-white/10 px-3 py-2">1.0 / 2.0 / 3.0</span>
                    <span className="rounded-full border border-white/10 px-3 py-2">按版本查角色</span>
                    <span className="rounded-full border border-white/10 px-3 py-2">详情页已接入</span>
                  </div>

                  <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-tight tracking-[0.06em] text-white md:text-6xl">
                    潮声循环往复
                    <span className="mt-2 block text-slate-200">文明再度启程</span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
                    AS WUTHERING WAVES ECHO ENDLESSLY, MANKIND SET SAIL ON A NEW JOURNEY.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 animate-rise-delay">
                  <a
                    href="#versions"
                    className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                  >
                    浏览版本角色
                  </a>
                  <Link
                    to="/notices"
                    className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/5"
                  >
                    浏览公告情报
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[440px] animate-fade-in">
                <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                <div className="absolute left-8 top-8 h-px w-20 bg-white/15" />
                <div className="absolute right-8 top-8 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                  版本已接入
                </div>

                <div className="absolute left-8 top-24 z-10 grid gap-3">
                  {versionGroups.map((group) => (
                    <div
                      key={group.version}
                      className="w-fit rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 backdrop-blur"
                    >
                      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                        版本 {group.version}
                      </p>
                      <p className="mt-2 text-sm text-white">{group.titleZh}</p>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-28 right-10 h-72 w-64 rounded-[40%] bg-[radial-gradient(circle_at_50%_22%,rgba(245,248,250,0.85),rgba(201,220,232,0.24)_28%,rgba(63,89,111,0.18)_50%,transparent_72%)] blur-[2px] animate-float-soft" />
                <div className="absolute bottom-20 right-16 h-80 w-72 rounded-[46%] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_22%,rgba(15,18,25,0.22)_70%,rgba(7,9,13,0.8))] shadow-[0_30px_80px_rgba(0,0,0,0.45)]" />
              </div>
            </div>

            <div className="relative border-t border-white/10 bg-black/15">
              <div className="ticker-mask overflow-hidden px-4 py-3 md:px-8">
                <div className="ticker-track flex min-w-max items-center gap-3 text-xs uppercase tracking-[0.34em] text-slate-300">
                  {[...tickerItems, ...tickerItems].map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-center gap-3">
                      <span>{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="versions" className="mt-16">
            <SectionHeading
              eyebrow="版本角色"
              title="按 1.0 / 2.0 / 3.0 浏览角色"
              description="这里先按版本整理角色入口。每个版本会展示版本说明、代表角色，以及可直接进入的角色详情页。"
            />
            <div className="mt-8 grid gap-6">
              {versionGroups.map((group) => {
                const featuredCharacter = findFeaturedCharacterByVersion(group.version);

                return (
                  <section
                    key={group.version}
                    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 shadow-panel"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%,rgba(136,176,200,0.12))]" />
                    <div className="relative">
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
                            版本 {group.version}
                          </p>
                          <h3 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
                            {group.titleZh}
                          </h3>
                          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                            {group.summary}
                          </p>
                        </div>
                        <div className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.22em] text-slate-300">
                          {group.releaseDate}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-[26px] border border-white/10 bg-slate-950/48 p-5">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">代表角色</p>
                          <CharacterArtwork
                            character={featuredCharacter}
                            containerClassName="mt-4 min-h-[160px] rounded-[22px]"
                            stageClassName="min-h-[160px] px-4 pb-3 pt-10"
                            imageClassName="relative z-10 max-h-[180px] w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.34)]"
                            fallbackClassName="w-full max-w-[220px] rounded-[20px] border border-dashed border-white/15 bg-black/20 px-4 py-6 text-center"
                            badgeClassName="absolute left-4 top-4 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400"
                            glowClassName="absolute bottom-4 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,226,235,0.22),rgba(255,255,255,0.02)_60%,transparent_72%)] blur-lg"
                            fallbackDescription="首页代表角色区已经接入图片位"
                            fallbackHint="缺图时保留当前文字卡结构"
                          />
                          <h4 className="mt-3 text-2xl font-semibold text-white">
                            {featuredCharacter.name}
                          </h4>
                          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                            小版本 {featuredCharacter.patch ?? group.version}
                          </p>
                          <p className="mt-2 text-sm text-slate-300">{featuredCharacter.role}</p>
                          <p className="mt-4 text-sm leading-7 text-slate-200">
                            {featuredCharacter.overview}
                          </p>
                          <Link
                            to={`/versions/${group.version}`}
                            className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
                          >
                            查看版本详情
                          </Link>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {group.characters.map((character) => (
                            <Link
                              key={character.slug}
                              to={`/characters/${character.slug}`}
                              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-white/20"
                            >
                              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                                版本 {group.version}
                              </p>
                              <h4 className="mt-3 text-xl font-semibold text-white">
                                {character.name}
                              </h4>
                              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                                小版本 {character.patch ?? group.version}
                              </p>
                              <p className="mt-2 text-sm text-slate-300">{character.role}</p>
                              <p className="mt-4 text-sm leading-7 text-slate-300">
                                {character.note}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </section>

          <section id="updates" className="mt-20 grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
            <div
              id="notices"
              className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.42em] text-slate-300">公告情报</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
                    近期公告
                  </h2>
                </div>
                <Link
                  to="/notices"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
                >
                  查看全部
                </Link>
              </div>

              <div className="mt-6 grid gap-3">
                {notices.slice(0, 3).map((item, index) => (
                  <article
                    key={item.id}
                    className="rounded-[22px] border border-white/10 bg-black/20 p-5 transition hover:border-white/20"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                          0{index + 1}
                        </span>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                          {item.type}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-slate-950/50 p-6 shadow-panel">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.42em] text-slate-300">攻略入口</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
                    常用导航
                  </h2>
                </div>
                <p className="text-sm text-slate-400">快速进入常用资料页</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {guideEntries.map((entry, index) => (
                  <div
                    key={entry}
                    className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,rgba(186,216,233,0.9),rgba(186,216,233,0.08))]" />
                    <p className="relative text-[11px] uppercase tracking-[0.35em] text-slate-300">
                      入口 0{index + 1}
                    </p>
                    <p className="relative mt-3 text-lg font-medium text-white">{entry}</p>
                    <p className="relative mt-3 text-sm text-slate-400 transition group-hover:text-slate-300">
                      资料整理中，可继续补入对应页面或快速索引。
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

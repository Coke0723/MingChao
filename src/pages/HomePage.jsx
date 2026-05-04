import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CharacterArtwork from "../components/CharacterArtwork";
import { findFeaturedCharacterByVersion, versionGroups } from "../data/versions";

const homeSongs = [
  {
    title: "逐光筑昼 Till Dawn",
    audioSrc: "/audio/%E9%B8%A3%E6%BD%AE%E9%BB%8E%E9%82%A3%E6%B1%90%E5%A1%94%E7%BB%88%E7%AB%A0%E5%86%B3%E6%88%98%E4%B8%BB%E9%A2%98%E6%9B%B2%E9%80%90%E5%85%89%E7%AD%91%E6%98%BC%20Till%20Dawn4K%E7%BA%AF%E4%BA%AB%E7%89%88.mp3",
  },
  {
    title: "小小奇迹",
    audioSrc: "/audio/%E9%B3%B4%E6%BD%AE3.1%20OST%20%E5%B0%8F%E5%B0%8F%E5%A5%87%E8%B9%9FLittle%20Miracle%E5%B0%8F%E3%81%95%E3%81%AA%E5%A5%87%E8%B7%A1%20BGM%20%E6%9C%89%E5%AD%97%E5%B9%95.mp3",
  },
  {
    title: "远航星的告别",
    audioSrc: "/audio/%E9%B8%A3%E6%BD%AE3.1%E7%88%B1%E5%BC%A5%E6%96%AF%E4%B8%BB%E9%A2%98%E6%9B%B2%E8%BF%9C%E8%88%AA%E6%98%9F%E7%9A%84%E5%91%8A%E5%88%AB4K%E4%B8%AD%E8%8B%B1%E6%AD%8C%E8%AF%8D%E7%BA%AF%E4%BA%AB.mp3",
  },
];

const navItems = ["首页", "版本角色", "世界区域", "版本情报", "攻略索引"];

const zoneHighlights = [
  {
    area: "今州城",
    en: "Jinzhou",
    desc: "主城资料、商店、任务线、关键 NPC 与剧情线索的统一入口。",
  },
  {
    area: "荒石高地",
    en: "Desorock Highland",
    desc: "探索度、声匣、宝箱与野外精英都适合继续拆成地图专题。",
  },
  {
    area: "无明湾",
    en: "Whining Aix's Mire",
    desc: "氛围感很强，适合扩展成地图分层、敌群与收集路线页面。",
  },
];

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

const notices = [
  {
    type: "公告",
    title: "角色模块已经按 1.0 / 2.0 / 3.0 分组",
    desc: "首页先切版本，再进入版本下的角色详情页，结构会更清晰，也更接近 Wiki 的使用方式。",
  },
  {
    type: "更新",
    title: "角色详情页已补成技能分栏结构",
    desc: "现在角色页已经有资料、技能模块、共鸣链、武器、声骸和培养材料模块。",
  },
  {
    type: "下一步",
    title: "后续最适合继续补真实技能与材料数据",
    desc: "当前页面结构已经稳了，下一步可以继续补倍率、突破材料、推荐配队和图鉴资料。",
  },
];

function formatPlayerTime(valueInSeconds) {
  const safeValue = Number.isFinite(valueInSeconds) ? Math.max(0, Math.floor(valueInSeconds)) : 0;
  const minutes = Math.floor(safeValue / 60);
  const seconds = safeValue % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="text-xs uppercase tracking-[0.42em] text-slate-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const audioRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentSong = homeSongs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.45;
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    const playCurrentSong = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playCurrentSong();
  }, [currentSongIndex]);

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play();
    setIsPlaying(true);
  };

  const handleAudioToggle = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized((current) => !current);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setDuration(audio.duration);
  };

  const handleAudioEnded = () => {
    const nextSongIndex = (currentSongIndex + 1) % homeSongs.length;
    setCurrentSongIndex(nextSongIndex);
  };

  const progressRatio = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const progressWidth = `${progressRatio * 100}%`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-ww-ink text-slate-100">
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={handleAudioEnded}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={currentSong.audioSrc} type="audio/mpeg" />
      </audio>

      <div className={`fixed bottom-5 right-5 z-50 rounded-[24px] border border-white/15 bg-slate-950/82 text-white shadow-panel backdrop-blur-xl transition-all ${isMinimized ? "w-[min(18rem,calc(100vw-2.5rem))] p-3" : "w-[min(22rem,calc(100vw-2.5rem))] p-4"}`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">首页音乐</p>
            <p className="mt-2 text-sm font-medium text-white line-clamp-1">{currentSong.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">
              {isPlaying ? "播放中" : "已暂停"}
            </span>
            <button
              type="button"
              onClick={handleMinimizeToggle}
              className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-300 transition hover:border-white/35 hover:bg-white/5"
            >
              {isMinimized ? "展开" : "最小化"}
            </button>
          </div>
        </div>

        {isMinimized ? (
          <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-2">
            <button
              type="button"
              onClick={handlePlayPause}
              className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
            >
              {isPlaying ? "暂停" : "播放"}
            </button>
            <button
              type="button"
              onClick={handleAudioToggle}
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-4 py-3 text-sm text-slate-100 transition hover:border-white/35 hover:bg-white/5"
            >
              {isMuted ? "开声" : "静音"}
            </button>
            <button
              type="button"
              onClick={handleReplay}
              className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
            >
              重播
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handlePlayPause}
                className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
              >
                {isPlaying ? "暂停" : "播放"}
              </button>
              <button
                type="button"
                onClick={handleReplay}
                className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
              >
                重播
              </button>
              <button
                type="button"
                onClick={handleAudioToggle}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm text-slate-100 transition hover:border-white/35 hover:bg-white/5"
              >
                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${isMuted ? "bg-slate-500" : "bg-sky-200"}`} />
                <span>{isMuted ? "取消静音" : "静音"}</span>
              </button>
            </div>

            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(186,216,233,0.95),rgba(233,242,248,0.95))] transition-[width] duration-300"
                  style={{ width: progressWidth }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs tracking-[0.2em] text-slate-400">
                <span>{formatPlayerTime(currentTime)}</span>
                <span>{formatPlayerTime(duration)}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {homeSongs.map((song, index) => {
                const isActive = index === currentSongIndex;

                return (
                  <button
                    key={song.audioSrc}
                    type="button"
                    onClick={() => handleSongSelect(index)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? "border-sky-200/45 bg-white/10 text-white"
                        : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span>{song.title}</span>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      {isActive ? "当前播放" : "切换"}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-0 -z-20 bg-ww-page" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,231,239,0.18),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(111,155,186,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-sm tracking-[0.32em] text-white">
              WW
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.42em] text-slate-400">
                Wuthering Waves
              </p>
              <p className="mt-1 text-lg font-medium tracking-[0.16em] text-white">
                鸣潮 Wiki
              </p>
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
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] shadow-panel">
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

                <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-slate-400">
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
                <a
                  href="#notices"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/5"
                >
                  浏览公告情报
                </a>
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
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                      版本 {group.version}
                    </p>
                    <p className="mt-2 text-sm text-white">{group.titleZh}</p>
                  </div>
                ))}
              </div>

              {/* <div className="absolute inset-x-10 bottom-8 z-10 rounded-[26px] border border-white/10 bg-black/25 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">首页结构</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-200">
                  首页现在承担“版本总入口”的职责，后面很适合继续接版本横幅、活动专题和版本详情页。
                </p>
              </div> */}

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
            {versionGroups.map((group) => (
              <section
                key={group.version}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 shadow-panel"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%,rgba(136,176,200,0.12))]" />
                <div className="relative">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
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
                    {(() => {
                      const featuredCharacter = findFeaturedCharacterByVersion(group.version);

                      return (
                        <div className="rounded-[26px] border border-white/10 bg-slate-950/48 p-5">
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">代表角色</p>
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
                          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
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
                      );
                    })()}

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {group.characters.map((character) => (
                        <Link
                          key={character.slug}
                          to={`/characters/${character.slug}`}
                          className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-white/20"
                        >
                          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                            版本 {group.version}
                          </p>
                          <h4 className="mt-3 text-xl font-semibold text-white">
                            {character.name}
                          </h4>
                          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
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
            ))}
          </div>
        </section>

        <section id="notices" className="mt-20 grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
          <SectionHeading
            eyebrow="公告情报"
            title="首页再补一层情报与公告模块"
            description="这样首页就不只是静态展示页，而更像一个会持续更新、有运营感的游戏站首页。"
          />
          <div className="grid gap-4">
            {notices.map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-panel transition hover:border-white/20"
              >
                <p className="text-xs uppercase tracking-[0.34em] text-slate-500">{item.type}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="zones" className="mt-20 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <SectionHeading
            eyebrow="世界区域"
            title="世界区域继续保持章节式编排"
            description="像官网世界观分章一样处理地图入口，让首页负责建立秩序感和吸引力，细节再交给二级页承载。"
          />
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
            <div className="grid gap-4">
              {zoneHighlights.map((zone, index) => (
                <article
                  key={zone.area}
                  className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 transition hover:border-white/20"
                >
                  <div className="absolute right-0 top-0 h-20 w-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent)] clip-corner" />
                  <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <span className="text-sm tracking-[0.3em] text-slate-500">0{index + 1}</span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                          {zone.en}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[0.06em] text-white">
                          {zone.area}
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300">
                      世界区域
                    </span>
                  </div>
                  <p className="relative mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    {zone.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-950/50 p-6">
            <SectionHeading
              eyebrow="攻略入口"
              title="首页继续承担攻略分发"
              description="这个区域保留 Wiki 的实用性，让首页在游戏官网风格之外，仍然是一个能快速找资料的地方。"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {guideEntries.map((entry, index) => (
                <div
                  key={entry}
                  className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm text-slate-100"
                >
                  <div className="absolute right-0 top-0 h-16 w-16 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent)] clip-corner opacity-80" />
                  <p className="relative text-[11px] uppercase tracking-[0.35em] text-slate-400">
                    入口 0{index + 1}
                  </p>
                  <p className="relative mt-3 text-lg font-medium">{entry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

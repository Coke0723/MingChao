import { Link, useParams } from "react-router-dom";
import CharacterArtwork from "../components/CharacterArtwork";
import { findFeaturedCharacterByVersion, findGroupByVersion } from "../data/versions";

function StatCard({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">{label}</p>
      <p className="mt-3 text-base text-white">{value}</p>
    </div>
  );
}

export default function VersionPage() {
  const { version } = useParams();
  const group = findGroupByVersion(version);

  if (!group) {
    return (
      <div className="min-h-screen bg-ww-ink px-5 py-16 text-slate-100 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-panel">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">版本词条</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">没有找到这个版本</h1>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const leadCharacter = findFeaturedCharacterByVersion(group.version);
  const patchBuckets = (group.subversions ?? []).map((patchInfo) => ({
    ...patchInfo,
    characters: group.characters.filter((character) => character.patch === patchInfo.patch),
  }));

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
            版本 {group.version}
          </div>
        </div>

        <section className="relative mt-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] shadow-panel">
          <div className="absolute inset-0 bg-[linear-gradient(126deg,rgba(255,255,255,0.09),transparent_22%,transparent_66%,rgba(142,179,202,0.2)),radial-gradient(circle_at_80%_22%,rgba(222,232,239,0.2),transparent_16%),radial-gradient(circle_at_16%_18%,rgba(90,128,156,0.18),transparent_24%)]" />
          <div className="absolute right-[-8%] top-8 hidden h-[30rem] w-[30rem] rounded-full border border-white/10 bg-white/5 blur-3xl lg:block" />

          <div className="relative grid gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1fr_1fr] lg:px-12 lg:py-14">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-slate-300">版本专题</p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[0.08em] text-white md:text-6xl">
                {group.version}
              </h1>
              <p className="mt-3 text-lg tracking-[0.18em] text-slate-300">{group.titleZh}</p>
              <p className="mt-2 text-sm text-slate-400">{group.titleEn}</p>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-200 md:text-base">
                {group.summary}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <StatCard label="上线日期" value={group.releaseDate} />
                <StatCard label="角色数量" value={`${group.characters.length} 名`} />
                <StatCard label="页面定位" value="版本专题 / 角色索引" />
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-slate-950/48 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.34em] text-slate-300">主推角色</p>
              <CharacterArtwork
                character={leadCharacter}
                containerClassName="mt-4 min-h-[220px] rounded-[24px]"
                stageClassName="min-h-[220px] p-5"
                imageClassName="relative z-10 max-h-[260px] w-auto object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
                fallbackClassName="w-full max-w-[240px] rounded-[22px] border border-dashed border-white/15 bg-black/20 px-5 py-8 text-center"
                fallbackDescription="版本页已经接入角色图片展示区"
                fallbackHint="优先放透明背景角色立绘，主推区会直接复用"
              />
              <h2 className="mt-4 text-4xl font-semibold tracking-[0.08em] text-white">
                {leadCharacter.name}
              </h2>
              <p className="mt-2 text-base text-slate-300">{leadCharacter.title}</p>
              <p className="mt-6 text-sm leading-8 text-slate-200">{leadCharacter.overview}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {leadCharacter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.22em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/characters/${leadCharacter.slug}`}
                className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
              >
                查看主推角色详情
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-300">版本记录</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
              已确认信息
            </h2>
            <div className="mt-6 grid gap-4">
              {group.officialNotes.map((note, index) => (
                <div
                  key={note}
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                    记录 0{index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-950/52 p-6">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-300">专题扩展</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
              后续可继续补完
            </h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm leading-7 text-slate-200">
                  卡池信息：角色卡池、武器卡池、上下半阶段与推荐抽取方向。
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm leading-7 text-slate-200">
                  活动资料：版本主线、限时活动、地区新增与玩法更新。
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                <p className="text-sm leading-7 text-slate-200">
                  环境分析：版本主流配队、核心体系与推荐角色分工。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.36em] text-slate-300">小版本索引</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
            本阶段按小版本展开
          </h2>
          <div className="mt-6 grid gap-4">
            {patchBuckets.map((patch) => (
              <div
                key={patch.patch}
                className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                      小版本 {patch.patch}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{patch.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{patch.releaseDate}</p>
                  </div>
                  <div className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300">
                    {patch.characters.length} 名角色
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {patch.characters.map((character) => (
                    <Link
                      key={character.slug}
                      to={`/characters/${character.slug}`}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/5"
                    >
                      {character.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(208,223,232,0.12),rgba(255,255,255,0.03))] p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-300">版本角色</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
            本版本角色
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.characters.map((character) => (
              <Link
                key={character.slug}
                to={`/characters/${character.slug}`}
                className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-white/20"
              >
                <CharacterArtwork
                  character={character}
                  containerClassName="min-h-[180px] rounded-[20px]"
                  stageClassName="min-h-[180px] px-4 pb-3 pt-10"
                  imageClassName="relative z-10 max-h-[160px] w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)]"
                  fallbackClassName="w-full max-w-[180px] rounded-[18px] border border-dashed border-white/15 bg-black/20 px-4 py-5 text-center"
                  badgeClassName="absolute left-4 top-4 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400"
                  glowClassName="absolute bottom-4 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,226,235,0.24),rgba(255,255,255,0.02)_60%,transparent_72%)] blur-lg"
                  fallbackDescription="版本角色卡已接入图片位"
                  fallbackHint="缺图时会继续显示角色资料"
                />
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">
                  版本 {group.version}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{character.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                  小版本 {character.patch ?? group.version}
                </p>
                <p className="mt-2 text-sm text-slate-300">{character.role}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{character.note}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

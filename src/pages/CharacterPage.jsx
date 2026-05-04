import { Link, useParams } from "react-router-dom";
import CharacterArtwork from "../components/CharacterArtwork";
import { findCharacterBySlug, findGroupByCharacterSlug } from "../data/versions";

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-3 text-base text-white">{value}</p>
    </div>
  );
}

export default function CharacterPage() {
  const { slug } = useParams();
  const character = findCharacterBySlug(slug);
  const group = findGroupByCharacterSlug(slug);

  if (!character || !group) {
    return (
      <div className="min-h-screen bg-ww-ink px-5 py-16 text-slate-100 md:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-panel">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">角色词条</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">没有找到这个角色</h1>
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

  const hasGuideVideoSlot = !character.slug.startsWith("rover");

  return (
    <div className="min-h-screen overflow-x-hidden bg-ww-ink text-slate-100">
      <div className="absolute inset-0 -z-20 bg-ww-page" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(220,231,239,0.18),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(111,155,186,0.16),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%)]" />

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to={`/versions/${group.version}`}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-white/35 hover:bg-white/5"
          >
            返回版本页
          </Link>

          <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
            版本 {group.version}
          </div>
        </div>

        <section className="relative mt-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] shadow-panel">
          <div className="absolute inset-0 bg-[linear-gradient(126deg,rgba(255,255,255,0.09),transparent_22%,transparent_66%,rgba(142,179,202,0.2)),radial-gradient(circle_at_80%_22%,rgba(222,232,239,0.2),transparent_16%),radial-gradient(circle_at_16%_18%,rgba(90,128,156,0.18),transparent_24%)]" />
          <div className="absolute right-[-8%] top-8 hidden h-[30rem] w-[30rem] rounded-full border border-white/10 bg-white/5 blur-3xl lg:block" />

          <div className="relative grid gap-8 px-6 py-8 md:px-10 lg:grid-cols-[0.96fr_1.04fr] lg:px-12 lg:py-14">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-slate-400">
                版本 {group.version} / {group.titleZh}
              </p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[0.08em] text-white md:text-6xl">
                {character.name}
              </h1>
              <p className="mt-3 text-lg tracking-[0.22em] text-slate-300">{character.title}</p>
              <p className="mt-2 text-sm text-slate-500">{character.englishName}</p>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-200 md:text-base">
                {character.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {character.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.22em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <CharacterArtwork character={character} containerClassName="min-h-[360px]" />

              <div className="rounded-[30px] border border-white/10 bg-slate-950/48 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.34em] text-slate-500">角色资料</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <InfoBlock label="稀有度" value={character.rarity} />
                  <InfoBlock label="定位" value={character.role} />
                  <InfoBlock label="所属小版本" value={character.patch ?? group.version} />
                  <InfoBlock label="属性" value={character.attribute} />
                  <InfoBlock label="武器" value={character.weapon} />
                  <InfoBlock label="英文名" value={character.englishName} />
                  <InfoBlock label="类型" value={character.classType} />
                  <InfoBlock label="国度" value={character.nation} />
                  <InfoBlock label="实装日期" value={character.releaseDate} />
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">版本归属</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    所属版本：{group.version}《{group.titleZh}》
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    所属小版本：{character.patch ?? group.version}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">英文版名：{group.titleEn}</p>
                  {character.imageSourcePage ? (
                    <a
                      href={character.imageSourcePage}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-white/25 hover:bg-white/5"
                    >
                      查看角色图片来源页
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">战斗重点</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
              战斗与页面重点
            </h2>
            <div className="mt-6 grid gap-4">
              {character.combatNotes.map((note, index) => (
                <div
                  key={note}
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    要点 0{index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-950/52 p-6">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">培养方向</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
              适合延展的条目
            </h2>
            <div className="mt-6 grid gap-4">
              {character.buildFocus.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-slate-100">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">版本备注</p>
              <div className="mt-4 grid gap-3">
                {group.officialNotes.map((note) => (
                  <p key={note} className="text-sm leading-7 text-slate-300">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.36em] text-slate-400">技能模块</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
            技能与玩法结构
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {character.skillSections.map((item, index) => (
              <div
                key={item.name}
                className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  模块 0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-200">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-950/52 p-6">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">共鸣链</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
              共鸣链与强化方向
            </h2>
            <div className="mt-6 grid gap-4">
              {character.chains.map((item, index) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-black/20 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    节点 0{index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(208,223,232,0.12),rgba(255,255,255,0.03))] p-6">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">词条备注</p>
            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-sm leading-8 text-slate-200">{character.note}</p>
            </div>
            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">后续建议</p>
              <p className="mt-3 text-sm leading-8 text-slate-300">
                下一步最适合继续补完真实技能倍率、突破材料清单、推荐配队和武器对比表。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 xl:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">武器推荐</p>
            <div className="mt-5 grid gap-4">
              {character.weapons.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-950/52 p-6">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">声骸推荐</p>
            <div className="mt-5 grid gap-4">
              {character.echoes.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(208,223,232,0.12),rgba(255,255,255,0.03))] p-6">
            <p className="text-xs uppercase tracking-[0.36em] text-slate-400">培养材料</p>
            <div className="mt-5 grid gap-4">
              {character.materials.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {hasGuideVideoSlot ? (
          <section className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-panel">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">攻略视频</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
              角色攻略视频
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              这里预留了角色攻略视频 iframe 区块。后续只要在角色数据中填写
              guideVideoEmbedUrl，就会自动显示嵌入视频。
            </p>

            <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/48">
              <div className="aspect-video w-full">
                {character.guideVideoEmbedUrl ? (
                  <iframe
                    src={character.guideVideoEmbedUrl}
                    title={`${character.name} 角色攻略视频`}
                    className="h-full w-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(220,231,239,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-6 text-center">
                    <div className="max-w-2xl">
                      <p className="text-sm font-medium tracking-[0.16em] text-white">
                        {character.name} 攻略视频嵌入位
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        还没有配置视频链接。可在角色数据里补入 guideVideoEmbedUrl，例如 Bilibili
                        或 YouTube 的 embed 链接。
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-16 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(208,223,232,0.12),rgba(255,255,255,0.03))] p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">同版本角色</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[0.08em] text-white">
            同版本其他角色
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.characters
              .filter((item) => item.slug !== character.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/characters/${item.slug}`}
                  className="rounded-[24px] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-white/20"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                    版本 {group.version}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.role}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.note}</p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

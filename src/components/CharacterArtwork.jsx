import { useEffect, useMemo, useState } from "react";

function capitalizeSegment(segment) {
  if (!segment) {
    return segment;
  }

  return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
}

function buildImageCandidates(character, imageFolder) {
  const baseNames = [
    ...(character.imageBaseNames ?? []),
    character.slug,
    character.slug?.toLowerCase(),
    character.slug
      ?.split("-")
      .map((segment) => capitalizeSegment(segment))
      .join("-"),
    character.name,
  ].filter(Boolean);

  const uniqueBaseNames = [...new Set(baseNames)];

  return uniqueBaseNames.flatMap((baseName) =>
    ["webp", "png", "jpg", "jpeg"].map(
      (extension) => `/characters/${imageFolder}/${baseName}.${extension}`,
    ),
  );
}

export default function CharacterArtwork({
  character,
  imageFolder = "full",
  containerClassName = "",
  stageClassName = "min-h-[360px] p-8",
  imageClassName = "max-h-[420px] w-auto object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]",
  fallbackClassName = "w-full max-w-[320px] rounded-[26px] border border-dashed border-white/15 bg-black/15 px-6 py-10 text-center backdrop-blur",
  badgeClassName = "absolute left-6 top-6 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300",
  glowClassName = "absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,226,235,0.3),rgba(255,255,255,0.02)_60%,transparent_72%)] blur-xl",
  label = "角色立绘位",
  fallbackDescription = "这里已经预留正式角色立绘位置",
  fallbackHint = "建议后续放置透明背景 PNG / WEBP",
}) {
  const imageCandidates = useMemo(
    () => buildImageCandidates(character, imageFolder),
    [character, imageFolder],
  );
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [imageCandidates]);

  const imageSrc = imageCandidates[imageIndex];
  const imageError = imageIndex >= imageCandidates.length;

  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] ${containerClassName}`.trim()}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(229,238,244,0.22),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]" />
      <div className={badgeClassName}>{label}</div>
      <div className={glowClassName} />
      <div className={`relative flex items-end justify-center ${stageClassName}`.trim()}>
        {!imageError ? (
          <img
            src={imageSrc}
            alt={character.name}
            className={`relative z-10 ${imageClassName}`.trim()}
            onError={() => setImageIndex((current) => current + 1)}
          />
        ) : (
          <div className={fallbackClassName}>
            <p className="text-sm font-medium tracking-[0.14em] text-white">{character.name}</p>
            <p className="mt-3 text-xs leading-6 tracking-[0.16em] text-slate-300">
              {fallbackDescription}
            </p>
            <p className="mt-3 text-xs leading-6 text-slate-400">{fallbackHint}</p>
            <p className="mt-5 text-[11px] leading-6 text-slate-500">
              推荐文件名：{character.slug}.webp / .png / .jpg
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

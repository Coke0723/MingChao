import { useEffect, useRef, useState } from "react";

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

function formatPlayerTime(valueInSeconds) {
  const safeValue = Number.isFinite(valueInSeconds) ? Math.max(0, Math.floor(valueInSeconds)) : 0;
  const minutes = Math.floor(safeValue / 60);
  const seconds = safeValue % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function GlobalMusicPlayer() {
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

    void playCurrentSong();
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

  const handleReplay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
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
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        autoPlay
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
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">站点音乐</p>
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
    </>
  );
}
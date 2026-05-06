import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MARKERS } from '../data';

// ─── Utilities ────────────────────────────────────────────────────────────────

function p01(x: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (x - min) / (max - min)));
}

function getStageLabel(progress: number): string {
  if (progress < 33) return 'raw SNP';
  if (progress < 66) return 'functional cluster';
  return 'Vita explains';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Terminal({ lines, dimAlpha }: { lines: string[]; dimAlpha: number }) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-sm transition-all"
      style={{ opacity: Math.max(0.15, dimAlpha) }}
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-xs text-white/40">vita-codex · terminal</span>
      </div>

      {/* Terminal content */}
      <div className="p-5 space-y-0.5">
        <AnimatePresence mode="wait">
          <motion.div key={lines[0]}>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045, duration: 0.25 }}
                className={`font-mono text-sm leading-6 ${
                  line.startsWith('$')
                    ? 'text-emerald-300 font-medium'
                    : line.startsWith('>')
                    ? 'text-white/75'
                    : 'text-white/30'
                }`}
              >
                {line === '' ? ' ' : line}
              </motion.div>
            ))}

            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block font-mono text-sm text-emerald-400"
            >
              ▋
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glow overlay when dimmed */}
      {dimAlpha < 0.5 && (
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-400/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

function ConfidenceBar({ value, fillProgress }: { value: number; fillProgress: number }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
        <span className="uppercase tracking-[0.2em]">confidence gate</span>
        <span className="font-mono">{Math.round(value * fillProgress)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-emerald-400"
          animate={{ width: `${value * fillProgress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function VitaOutput({
  marker,
  clusterAlpha,
  insightAlpha,
  actionAlpha,
  apiAlpha,
  charCount,
}: {
  marker: (typeof MARKERS)[0];
  clusterAlpha: number;
  insightAlpha: number;
  actionAlpha: number;
  apiAlpha: number;
  charCount: number;
}) {
  const displayedInsight = marker.insight.slice(0, charCount);
  const isTyping = charCount < marker.insight.length && charCount > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={marker.id}
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4"
      >
        {/* Cluster card */}
        <div
          style={{
            opacity: clusterAlpha,
            filter: `blur(${(1 - clusterAlpha) * 10}px)`,
            transform: `translateY(${(1 - clusterAlpha) * 10}px)`,
            transition: 'opacity .3s, filter .3s, transform .3s',
          }}
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-start gap-4">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                style={{ backgroundColor: marker.clusterColor }}
              >
                <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="19" r="2" />
                  <circle cx="19" cy="19" r="2" />
                  <path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/55">cluster interpretado</div>
                <h3 className="mt-1 text-2xl font-light tracking-[-0.04em] text-white">
                  {marker.cluster}
                </h3>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                {marker.tone}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-xs text-white/70">
                {marker.gene} · {marker.genotype}
              </span>
            </div>
            <ConfidenceBar value={marker.confidence} fillProgress={clusterAlpha} />
          </div>
        </div>

        {/* Insight card */}
        <div
          style={{
            opacity: insightAlpha,
            filter: `blur(${(1 - insightAlpha) * 8}px)`,
            transform: `translateY(${(1 - insightAlpha) * 8}px)`,
            transition: 'opacity .3s, filter .3s, transform .3s',
          }}
        >
          <div className="rounded-[2rem] border border-white/10 bg-black/40 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/55">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3z" />
                <path d="M5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
              </svg>
              Vita explica
            </div>
            <p className="text-base leading-8 text-white min-h-[4rem]">
              {displayedInsight}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-emerald-400"
                >
                  ▋
                </motion.span>
              )}
            </p>
          </div>
        </div>

        {/* Action card */}
        <div
          style={{
            opacity: actionAlpha,
            transition: 'opacity .3s',
          }}
        >
          <div className="rounded-[2rem] border border-emerald-400/25 bg-emerald-400/8 p-5">
            <div className="mb-1 text-xs uppercase tracking-[0.2em] text-white/55">próxima ação</div>
            <p className="text-sm leading-7 text-white/90">{marker.action}</p>
          </div>
        </div>

        {/* API mock */}
        <div
          style={{
            opacity: apiAlpha,
            transition: 'opacity .3s',
          }}
        >
          <div className="rounded-2xl border border-white/8 bg-black/50 p-4 font-mono text-xs leading-7 text-white/60">
            <span className="text-emerald-400 font-medium">POST</span>
            {' /v1/vita/explain'}
            <br />
            <span className="text-white/40">
              {'{ marker: "'}
              <span className="text-white/70">{marker.id}</span>
              {'", cluster: "'}
              <span className="text-white/70">{marker.cluster}</span>
              {'", confidence: '}
              <span className="text-white/70">{marker.confidence}</span>
              {', abstain: false }'}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Pipeline arrows (center column) ─────────────────────────────────────────

function Pipeline({ progress }: { progress: number }) {
  const steps = ['SNP', 'Cluster', 'Vita'];
  const activeStep = progress < 33 ? 0 : progress < 66 ? 1 : 2;

  return (
    <div className="hidden lg:flex flex-col items-center justify-center gap-3 px-2">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              scale: activeStep === i ? 1.15 : 1,
              backgroundColor: activeStep >= i ? '#2ec98f' : 'rgba(255,255,255,0.08)',
              boxShadow: activeStep === i ? '0 0 16px rgba(46,201,143,.6)' : 'none',
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs font-semibold transition-all"
          >
            <span className={activeStep >= i ? 'text-black' : 'text-white/50'}>{i + 1}</span>
          </motion.div>
          <span
            className={`text-[10px] uppercase tracking-[0.18em] transition-colors ${
              activeStep >= i ? 'text-white/80' : 'text-white/30'
            }`}
          >
            {step}
          </span>

          {i < steps.length - 1 && (
            <motion.div
              animate={{ opacity: activeStep > i ? 1 : 0.2 }}
              className="h-8 w-px bg-emerald-400/60"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TransformDemo() {
  const [activeMarkerIdx, setActiveMarkerIdx] = useState(0);
  const [progress, setProgress] = useState(10);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const marker = MARKERS[activeMarkerIdx];

  // Derived reveal values
  const clusterAlpha = useMemo(() => p01(progress, 22, 45), [progress]);
  const insightAlpha = useMemo(() => p01(progress, 55, 72), [progress]);
  const actionAlpha = useMemo(() => p01(progress, 68, 85), [progress]);
  const apiAlpha = useMemo(() => p01(progress, 82, 96), [progress]);
  const terminalDim = useMemo(() => Math.max(0.15, 1 - p01(progress, 38, 88)), [progress]);
  const charCount = useMemo(
    () => Math.round(p01(progress, 60, 98) * marker.insight.length),
    [progress, marker.insight]
  );

  // Slider interaction
  const getPercent = useCallback((clientX: number): number => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      stopAutoPlay();
      setProgress(getPercent(e.clientX));
    },
    [getPercent]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      stopAutoPlay();
      setProgress(getPercent(e.touches[0].clientX));
    },
    [getPercent]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => setProgress(getPercent(e.clientX));
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, getPercent]);

  // Keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setProgress((v) => Math.min(100, v + 5));
    if (e.key === 'ArrowLeft') setProgress((v) => Math.max(0, v - 5));
  };

  // Auto-play
  function stopAutoPlay() {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setIsAutoPlaying(false);
  }

  function startAutoPlay() {
    stopAutoPlay();
    setProgress(0);
    setIsAutoPlaying(true);
    autoPlayRef.current = setInterval(() => {
      setProgress((v) => {
        if (v >= 100) {
          stopAutoPlay();
          return 100;
        }
        return v + 0.7;
      });
    }, 18);
  }

  function switchMarker(idx: number) {
    stopAutoPlay();
    setActiveMarkerIdx(idx);
    setProgress(10);
  }

  useEffect(() => () => stopAutoPlay(), []);

  const stageLabel = getStageLabel(progress);

  return (
    <section id="demo" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white">
            <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3z" />
            </svg>
            efeito wow · raw DNA → insight
          </div>
          <h2 className="font-['Syne'] max-w-2xl mx-auto text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-white md:text-6xl">
            Arraste e veja SNPs técnicos virarem decisão clínica.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-base leading-8 text-white/65">
            A banca não precisa entender rsID. Ela precisa enxergar a transformação: dado genético cru, cluster funcional, confiança científica e recomendação explicável.
          </p>
        </div>

        {/* Marker selector */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {MARKERS.map((m, i) => (
            <button
              key={m.id}
              onClick={() => switchMarker(i)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                activeMarkerIdx === i
                  ? 'border-emerald-400/60 bg-emerald-400/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <div className="font-mono text-sm font-medium text-white">{m.gene}</div>
              <div className="mt-0.5 text-xs text-white/55">{m.cluster}</div>
            </button>
          ))}
        </div>

        {/* Stage labels + slider */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5">
          {/* Stage label row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-6">
              {['raw SNP', 'functional cluster', 'Vita explains'].map((label, i) => {
                const threshold = [0, 33, 66][i];
                const active = progress >= threshold;
                return (
                  <span
                    key={label}
                    className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                      active ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    {active && i === (progress < 33 ? 0 : progress < 66 ? 1 : 2) && (
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                    )}
                    {label}
                  </span>
                );
              })}
            </div>
            <span className="font-mono text-xs text-white/50">{Math.round(progress)}%</span>
          </div>

          {/* The drag track */}
          <div
            ref={sliderRef}
            role="slider"
            aria-label="Transformação de SNP cru para interpretação Vita"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            className={`relative h-5 cursor-ew-resize rounded-full bg-white/10 outline-none focus:ring-2 focus:ring-emerald-400/50 ${
              isDragging ? 'cursor-grabbing' : 'cursor-ew-resize'
            }`}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => {
              stopAutoPlay();
              setProgress(getPercent(e.touches[0].clientX));
            }}
            onClick={(e) => {
              stopAutoPlay();
              setProgress(getPercent(e.clientX));
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-emerald-400/60"
              style={{ width: `${progress}%` }}
            />

            {/* Thumb */}
            <motion.div
              className="absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border-2 border-white/30 bg-emerald-400 shadow-[0_0_28px_rgba(52,211,153,.8)]"
              animate={{ left: `calc(${progress}% - 18px)` }}
              transition={{ type: 'spring', stiffness: 600, damping: 40 }}
            />

            {/* Milestone ticks */}
            {[33, 66].map((tick) => (
              <div
                key={tick}
                className="absolute top-1/2 -translate-y-1/2 h-3 w-px bg-white/25"
                style={{ left: `${tick}%` }}
              />
            ))}
          </div>

          {/* Auto-play button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
              className={`flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                isAutoPlaying
                  ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-300'
                  : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>●</motion.span>
                  reproduzindo...
                </>
              ) : (
                <>▶ auto-play transformação</>
              )}
            </button>
          </div>
        </div>

        {/* Current stage badge */}
        <div className="mb-6 flex justify-center">
          <motion.div
            key={stageLabel}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {stageLabel}
          </motion.div>
        </div>

        {/* THREE COLUMN layout: Terminal | Pipeline | Output */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_80px_1fr]">
          {/* Left: Terminal */}
          <Terminal lines={marker.terminalLines} dimAlpha={terminalDim} />

          {/* Center: Pipeline */}
          <Pipeline progress={progress} />

          {/* Right: Vita output */}
          <div className="min-h-[500px]">
            <VitaOutput
              marker={marker}
              clusterAlpha={clusterAlpha}
              insightAlpha={insightAlpha}
              actionAlpha={actionAlpha}
              apiAlpha={apiAlpha}
              charCount={charCount}
            />
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-12 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/8 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center">
            <div>
              <h3 className="font-['Syne'] text-2xl font-bold tracking-[-0.04em] text-white md:text-4xl">
                O efeito visual não é decoração. Ele explica o produto.
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-8 text-white/70">
                Esta interação substitui cinco minutos de explicação técnica: avaliador vê o dado cru, a camada semântica, o confidence gate e a saída da Vita — numa única tela.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-4 text-sm text-white/80 whitespace-nowrap">
              Raw SNP
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              Cluster
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              Insight
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

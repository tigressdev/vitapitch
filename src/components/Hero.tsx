import { motion } from 'framer-motion';

const YOUTUBE_ID = '0Hzdh-62PE0';

const STATS = [
  { value: '33', label: 'SNPs curados' },
  { value: '5', label: 'clusters' },
  { value: 'API', label: 'first' },
  { value: 'Vita', label: 'copilot' },
];

function DnaHelix() {
  return (
    <svg
      viewBox="0 0 120 480"
      className="absolute right-0 top-0 h-full w-auto opacity-20 pointer-events-none"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const y = i * 52 + 20;
        const leftX = 30 + Math.sin(i * 0.85) * 26;
        const rightX = 90 - Math.sin(i * 0.85) * 26;
        return (
          <g key={i}>
            <line
              x1={leftX}
              y1={y}
              x2={rightX}
              y2={y}
              stroke="#2ec98f"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            <circle cx={leftX} cy={y} r="4" fill="#2ec98f" fillOpacity="0.8" />
            <circle cx={rightX} cy={y} r="4" fill="#2ec98f" fillOpacity="0.8" />
          </g>
        );
      })}
      <path
        d={Array.from({ length: 20 })
          .map((_, i) => {
            const t = i / 19;
            const x = 30 + Math.sin(t * Math.PI * 4) * 26;
            const y = t * 460 + 20;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          })
          .join(' ')}
        fill="none"
        stroke="#2ec98f"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <path
        d={Array.from({ length: 20 })
          .map((_, i) => {
            const t = i / 19;
            const x = 90 - Math.sin(t * Math.PI * 4) * 26;
            const y = t * 460 + 20;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          })
          .join(' ')}
        fill="none"
        stroke="#b846ff"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Glow blob */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-400/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT — Headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/70">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M7 2c5 4 5 16 0 20M17 2c-5 4-5 16 0 20M7.5 6h9M7 12h10M7.5 18h9" />
              </svg>
              Genomic intelligence layer
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-['Syne'] max-w-2xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl"
          >
            Your body runs in code.{' '}
            <span className="text-emerald-400">We help health systems read it.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-8 text-white/75"
          >
            VitaCodex transforma SNPs genéticos brutos em insights clínicos acionáveis.
            API-first. Confidence gate. Zero alucinação de dados.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-xl"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-colors"
              >
                <div className="font-['Syne'] text-2xl font-bold text-emerald-400">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-emerald-300 hover:shadow-[0_0_32px_rgba(52,211,153,.5)]"
            >
              Explorar demo interativo
            </a>
            <a
              href="https://vitacodex.life"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Ver app completo →
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Video + DNA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl">
            <DnaHelix />

            <div className="relative p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/60">
                <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                pitch · demo · 2 min
              </div>

              <div className="aspect-video overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
                  title="VitaCodex — pitch experience"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm italic leading-7 text-white/70">
                "Não para prever o seu destino. Mas para entender melhor o seu próprio sistema."
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Vita Score: 84 · 3 sinais ativos
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs uppercase tracking-[0.3em]">arraste para ver</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-5 w-5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion } from 'framer-motion';

interface Phase {
  id: string;
  date: string;
  title: string;
  note: string;
  color: string;
  isPivot?: boolean;
}

const PHASES: Phase[] = [
  {
    id: 'P1',
    date: 'Ago 2025',
    title: 'NutriNest',
    note: 'Smart fridge + IoT + hardware consumer B2C',
    color: '#2ec98f',
  },
  {
    id: 'P2',
    date: 'Out 2025',
    title: 'Hub Digital',
    note: 'DNA + wearables + exames clínicos integrados',
    color: '#3f6df6',
  },
  {
    id: 'P3',
    date: 'Dez 2025',
    title: 'Modelo B2B',
    note: 'Financeiro, ICP dual, parceiros e stakeholders',
    color: '#b846ff',
  },
  {
    id: 'P4',
    date: 'Abr 2026',
    title: 'VitaCodex',
    note: 'Pivot para API-first genômica — produto ao vivo',
    color: '#f28a22',
    isPivot: true,
  },
];

const THEN = [
  { icon: '❄️', text: 'Smart fridge com sensores IoT' },
  { icon: '🔧', text: 'Hardware físico como produto central' },
  { icon: '👤', text: 'B2C direto — persona hipotética' },
  { icon: '🏭', text: 'Dependência de parceiros de manufatura' },
  { icon: '📊', text: 'Recomendações nutricionais genéricas' },
  { icon: '🏠', text: 'Mercado de eletrodomésticos inteligentes' },
];

const NOW = [
  { icon: '⚡', text: 'Software puro — zero hardware, zero fricção' },
  { icon: '🔌', text: 'API-first plug-and-play para qualquer healthtech' },
  { icon: '🏥', text: 'B2B: clínicas, operadoras, EMRs como ICPs' },
  { icon: '🧬', text: 'Engine v6: FAISS + BM25 + 33 SNPs curados' },
  { icon: '🛡️', text: 'Confidence gate — zero alucinação de dados' },
  { icon: '🌐', text: 'vitacodex.life em produção com 4 módulos ao vivo' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Journey() {
  return (
    <section id="journey" className="py-24 px-6 border-y border-white/8 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
            <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            origem &amp; evolução
          </div>
          <h2 className="font-['Syne'] text-4xl font-bold tracking-[-0.05em] text-white md:text-5xl">
            Partimos de um problema diferente.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-white/60">
            O que começou como uma startup de IoT e smart fridge evoluiu — por raciocínio próprio de produto
            e validação com especialista real — para uma camada de inteligência genômica API-first.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative mb-16">
          <div
            className="absolute top-[2.2rem] left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] hidden h-px md:block"
            style={{
              background:
                'linear-gradient(to right, #2ec98f55, #3f6df555, #b846ff55, #f28a2255)',
            }}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative rounded-[1.5rem] border p-5 transition-colors ${
                  phase.isPivot
                    ? 'border-orange-400/35 bg-orange-400/[0.05]'
                    : 'border-white/10 bg-black/25 hover:border-white/20'
                }`}
              >
                {phase.isPivot && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-400 px-3 py-0.5 text-[10px] font-bold text-black whitespace-nowrap tracking-wide">
                    pivot ★
                  </div>
                )}
                <div className="mb-3 flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.id}
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{phase.date}</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">{phase.title}</div>
                <p className="text-[11px] leading-5 text-white/50">{phase.note}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Before / After ── */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-[1fr_64px_1fr] items-start">

          {/* THEN */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] border border-white/10 bg-black/25 p-7"
          >
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.32em] text-white/35">
                ponto de partida
              </div>
              <div className="font-['Syne'] text-2xl font-bold tracking-[-0.04em] text-white">
                NutriNest
              </div>
              <div className="mt-1 text-sm text-white/40">smart fridge · IoT · hardware consumer</div>
            </div>
            <div className="space-y-3.5">
              {THEN.map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-base leading-none">{icon}</span>
                  <span className="text-sm leading-6 text-white/50">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-col items-center justify-center gap-2 self-center py-4 md:py-0"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2ec98f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/25">pivot</span>
          </motion.div>

          {/* NOW */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2rem] border border-emerald-400/25 bg-emerald-400/[0.04] p-7 overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, #2ec98f60, transparent)' }}
            />
            <div className="mb-6">
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.32em] text-emerald-400/65">
                produto atual
              </div>
              <div className="font-['Syne'] text-2xl font-bold tracking-[-0.04em] text-white">
                VitaCodex
              </div>
              <div className="mt-1 text-sm text-emerald-400/65">API-first · genômica · plug-and-play</div>
            </div>
            <div className="space-y-3.5">
              {NOW.map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-base leading-none">{icon}</span>
                  <span className="text-sm leading-6 text-white/70">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Insight cards ── */}
        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[2rem] border border-orange-400/20 bg-orange-400/[0.04] p-7"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-orange-400/75">
                pivot estratégico
              </span>
            </div>
            <p className="text-sm leading-7 text-white/65">
              O pivot de{' '}
              <span className="text-white font-semibold">NutriNest → VitaCodex</span> foi a decisão mais
              inteligente da jornada — e aconteceu{' '}
              <span className="text-orange-400">sem orientação externa</span>, por raciocínio próprio de
              produto. Hardware é barreira de entrada. Software + API é escala.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[2rem] border border-purple-400/20 bg-purple-400/[0.04] p-7"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-purple-400" />
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-purple-400/75">
                validação externa real
              </span>
            </div>
            <p className="text-sm leading-7 text-white/65">
              Feedback de{' '}
              <span className="text-white font-semibold">médica mentora de healthtechs nos EUA</span>{' '}
              reposicionou o produto para API-first plug-and-play — validação qualitativa real que
              nenhum framework acadêmico substituiria.
            </p>
          </motion.div>
        </div>

        {/* ── Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="rounded-[2rem] border border-white/8 bg-white/[0.02] px-8 py-10 text-center"
        >
          <div className="mb-5 text-[10px] uppercase tracking-[0.32em] text-white/30">
            do roteiro do vídeo de apresentação · p4
          </div>
          <blockquote className="mx-auto max-w-3xl text-lg leading-9 text-white/65 italic">
            "Você já parou pra pensar por que duas pessoas podem ter vidas completamente diferentes…
            mesmo sendo quase iguais por dentro? Todos nós compartilhamos mais de 99,9% do nosso DNA.
            Mas é justamente naquela pequena fração que está tudo o que nos torna únicos."
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-white/30">
            <span className="h-px w-12 bg-white/15 rounded-full" />
            <span>VitaCodex · Startup One FIAP · 2025–2026</span>
            <span className="h-px w-12 bg-white/15 rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

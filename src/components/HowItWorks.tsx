import { motion } from 'framer-motion';
import { PIPELINE_STEPS } from '../data';

const ICONS: Record<string, JSX.Element> = {
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3z" />
      <path d="M5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
      <path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5L19 15z" />
    </svg>
  ),
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-y border-white/8 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/60">
            arquitetura técnica
          </div>
          <h2 className="font-['Syne'] text-4xl font-bold tracking-[-0.05em] text-white md:text-5xl">
            Como a Vita transforma ruído em sinal.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base leading-8 text-white/60">
            Três camadas de processamento, zero alucinação de dados genéticos. Do rsID bruto ao insight clínico acionável.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-[2.8rem] left-[calc(33.3%+0px)] right-[calc(33.3%+0px)] hidden h-px bg-gradient-to-r from-emerald-400/40 via-blue-400/40 to-purple-400/40 md:block" style={{ left: 'calc(16.6% + 2rem)', right: 'calc(16.6% + 2rem)' }} />

          {PIPELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-[2rem] border border-white/10 bg-black/25 p-7 hover:border-white/20 transition-colors group"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-7 rounded-full border border-white/15 bg-[#050806] px-2.5 py-0.5 text-xs font-mono text-white/50">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div
                className="mb-5 grid h-14 w-14 place-items-center rounded-2xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${step.accent}18`, color: step.accent }}
              >
                {ICONS[step.icon]}
              </div>

              <div
                className="mb-1 text-xs uppercase tracking-[0.22em]"
                style={{ color: step.accent }}
              >
                {step.subtitle}
              </div>
              <h3 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
              <p className="text-sm leading-7 text-white/65">{step.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-7 right-7 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, transparent, ${step.accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Extra context row */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { label: 'Abstain flag', desc: 'Vita recusa responder quando a evidência é insuficiente. Segurança clínica acima da completude.' },
            { label: 'Confidence gate', desc: 'Cada resposta traz score de confiança baseado em tamanho de estudo, OR e qualidade do SNP.' },
            { label: 'Zero hallucination', desc: 'Dados genéticos jamais são gerados — apenas recuperados e interpretados do codex curado.' },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm font-semibold text-white">{label}</span>
              </div>
              <p className="text-xs leading-6 text-white/55">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

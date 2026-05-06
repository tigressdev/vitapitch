import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MARKET, ICPS } from '../data';

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

function MarketCard({ item, index }: { item: (typeof MARKET)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const accents = ['#2ec98f', '#3f6df6', '#b846ff'];
  const accent = accents[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-7 hover:border-white/20 transition-colors"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
      />
      <div
        className="mb-2 text-xs font-mono font-semibold uppercase tracking-[0.3em]"
        style={{ color: accent }}
      >
        {item.label}
      </div>
      <div
        className="font-['Syne'] text-5xl font-bold tracking-[-0.04em] text-white md:text-6xl"
      >
        {item.value}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/60">{item.desc}</p>
    </motion.div>
  );
}

export function Business() {
  return (
    <section id="business" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Market size */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/55">
            modelo de negócio
          </div>
          <h2 className="font-['Syne'] text-4xl font-bold tracking-[-0.05em] text-white md:text-5xl">
            Mercado, ICP e monetização.
          </h2>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {MARKET.map((item, i) => (
            <MarketCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Revenue */}
        <motion.div
          className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.025] p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.22em] text-emerald-400">modelo de receita</div>
              <h3 className="font-['Syne'] text-2xl font-bold tracking-[-0.04em] text-white md:text-3xl">
                SaaS por paciente processado.
              </h3>
              <p className="mt-4 text-base leading-8 text-white/65">
                API-first B2B: R$8k/mês por 1.000 pacientes processados. Integrações com clínicas, operadoras e EMRs pagam pelo volume de interpretações — não pelo relatório isolado.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { tier: 'Starter', volume: '500 pac/mês', mrr: 'R$ 4k/mês', accent: '#2ec98f' },
                { tier: 'Clinic', volume: '1.000 pac/mês', mrr: 'R$ 8k/mês', accent: '#3f6df6' },
                { tier: 'Enterprise', volume: 'custom', mrr: 'custom', accent: '#b846ff' },
              ].map(({ tier, volume, mrr, accent }) => (
                <div key={tier} className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/25 px-5 py-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{tier}</div>
                    <div className="text-xs text-white/50">{volume}</div>
                  </div>
                  <div className="font-mono text-sm font-medium" style={{ color: accent }}>{mrr}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ICP grid */}
        <div className="mb-6 text-center">
          <h3 className="font-['Syne'] text-2xl font-bold tracking-[-0.04em] text-white">
            4 ICPs validados por entrevistas.
          </h3>
          <p className="mt-2 text-sm text-white/55">5 stakeholders entrevistados. Problema confirmado em todos os perfis.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ICPS.map((icp, i) => (
            <motion.div
              key={icp.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-[2rem] border border-white/10 bg-black/25 p-6 hover:border-white/20 transition-colors group"
            >
              <div className="mb-4 text-3xl">{icp.icon}</div>
              <h4 className="mb-2 text-sm font-semibold leading-tight text-white">{icp.title}</h4>
              <p className="text-xs leading-6 text-white/55">{icp.desc}</p>
              <div
                className="mt-4 h-px w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:w-full"
                style={{ background: `linear-gradient(to right, ${icp.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Validation note */}
        <motion.div
          className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm leading-7 text-white/55">
            Validação qualitativa com{' '}
            <span className="text-white">leigo receptor de relatório 23andMe</span>,{' '}
            <span className="text-white">nutricionista clínica</span>,{' '}
            <span className="text-white">gestor de risco de operadora</span>,{' '}
            <span className="text-white">dev de prontuário EMR</span> e{' '}
            <span className="text-white">médico mentor (EUA)</span>.
            Todos confirmaram a existência do translation gap.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

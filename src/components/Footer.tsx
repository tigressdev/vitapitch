import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 pb-16 pt-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(46,201,143,.12),transparent_60%)]" />

      <div className="mx-auto max-w-7xl">
        {/* CTA */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            API em desenvolvimento ativo
          </div>

          <h2 className="font-['Syne'] max-w-2xl mx-auto text-4xl font-bold leading-[1.05] tracking-[-0.06em] text-white md:text-6xl">
            Pronto para integrar genômica no seu produto de saúde?
          </h2>

          <p className="mt-6 max-w-lg mx-auto text-base leading-8 text-white/60">
            VitaCodex está em fase de parcerias early access. Entre em contato para discutir integração API e casos de uso clínico.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:contato@vitacodex.life"
              className="rounded-full bg-emerald-400 px-8 py-4 text-sm font-semibold text-black transition hover:bg-emerald-300 hover:shadow-[0_0_40px_rgba(52,211,153,.5)]"
            >
              Solicitar acesso early access
            </a>
            <a
              href="https://vitacodex.life/index/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white/75 transition hover:border-white/40 hover:text-white"
            >
              Explorar app completo →
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Footer bottom */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <div className="font-['Syne'] text-2xl font-bold tracking-[-0.06em] text-white">
              vita<span className="text-emerald-400">codex</span>
            </div>
            <p className="mt-1 text-xs text-white/40">Genomic intelligence layer · Startup One FIAP</p>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/40">
            <a href="https://demoapp.vitacodex.life/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              vitacodex.life
            </a>
            <span>·</span>
            <a href="mailto:contato@vitacodex.life" className="hover:text-white/70 transition-colors">
              contato@vitacodex.life
            </a>
            <span>·</span>
            <span>© 2026 VitaCodex</span>
          </div>

          {/* Tagline pill */}
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/40">
            raw SNP → cluster → insight · v0.1
          </div>
        </div>
      </div>
    </footer>
  );
}

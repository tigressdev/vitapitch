import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-[#050806]/90 backdrop-blur-xl' : ''
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <div className="font-['Syne'] text-2xl font-bold tracking-[-0.06em] text-white select-none">
          vita<span className="text-emerald-400">codex</span>
        </div>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.22em] text-white/55 md:flex">
          {[
            { href: '#demo', label: 'Demo' },
            { href: '#how-it-works', label: 'Como funciona' },
            { href: '#business', label: 'Negócio' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#demo"
          className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300 hover:shadow-[0_0_24px_rgba(52,211,153,.5)]"
        >
          Ver demo ao vivo
        </a>
      </div>
    </motion.header>
  );
}

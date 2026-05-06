import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TickerBar } from './components/TickerBar';
import { TransformDemo } from './components/TransformDemo';
import { HowItWorks } from './components/HowItWorks';
import { Business } from './components/Business';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-[#050806] text-white overflow-x-hidden">
      {/* Fixed layered background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 72% 8%, rgba(46,201,143,.18) 0%, transparent 38%), radial-gradient(circle at 18% 85%, rgba(184,70,255,.12) 0%, transparent 35%)',
        }}
      />
      <div
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(46,201,143,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(46,201,143,.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <Nav />
      <Hero />
      <TickerBar />
      <TransformDemo />
      <HowItWorks />
      <Business />
      <Footer />
    </div>
  );
}

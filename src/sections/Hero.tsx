import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowDown, Anchor, Globe2, ShieldCheck, Truck, Ship, Wheat, Factory,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const lineVariants = {
  hidden: { y: '108%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.95, delay: 0.35 + i * 0.1, ease },
  }),
};

const trustedSectors = [
  { icon: Anchor, label: 'Maritime freight' },
  { icon: Truck, label: 'Inland logistics' },
  { icon: ShieldCheck, label: 'Chain of Responsibility' },
  { icon: Factory, label: 'Industrial supply' },
  { icon: Wheat, label: 'Agricultural inputs' },
  { icon: Ship, label: 'Bulk commodities' },
  { icon: Globe2, label: 'Cross-border trade' },
];

export default function Hero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'Australia/Sydney',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat('en-AU', opts).format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        background: 'var(--paper)',
        color: 'var(--ink)',
        height: '100vh',
        minHeight: 620,
        maxHeight: 980,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ============ Paper grain (warmth & cohesion) ============ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          zIndex: 1,
        }}
      />

      {/* ============ IMAGE bleeds to viewport edge ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease }}
        className="hero-image-bleed"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 56, // leaves space for the trust strip
          width: '48%',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* The image — dual-axis mask: dissolves into paper on LEFT and BOTTOM */}
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/supply.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.04) saturate(0.86) brightness(0.94)',
            WebkitMaskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.28) 16%, rgba(0,0,0,0.55) 24%, rgba(0,0,0,0.82) 32%, rgba(0,0,0,0.96) 40%, #000 48%),
              linear-gradient(180deg, #000 0%, #000 48%, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.62) 76%, rgba(0,0,0,0.28) 88%, rgba(0,0,0,0.08) 95%, transparent 100%)
            `,
            maskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.28) 16%, rgba(0,0,0,0.55) 24%, rgba(0,0,0,0.82) 32%, rgba(0,0,0,0.96) 40%, #000 48%),
              linear-gradient(180deg, #000 0%, #000 48%, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.62) 76%, rgba(0,0,0,0.28) 88%, rgba(0,0,0,0.08) 95%, transparent 100%)
            `,
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        />

        {/* Warm river-tone overlay — same dual mask so it fades together */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(250,250,247,0.06) 0%, rgba(14,85,96,0.08) 55%, rgba(14,85,96,0.05) 85%)',
            mixBlendMode: 'multiply',
            WebkitMaskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.3) 22%, #000 48%),
              linear-gradient(180deg, #000 0%, #000 50%, rgba(0,0,0,0.6) 78%, transparent 100%)
            `,
            maskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.3) 22%, #000 48%),
              linear-gradient(180deg, #000 0%, #000 50%, rgba(0,0,0,0.6) 78%, transparent 100%)
            `,
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        />

        {/* Painterly noise at the LEFT edge transition */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'320\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.4\'/></svg>")',
            mixBlendMode: 'overlay',
            WebkitMaskImage:
              'linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.7) 10%, transparent 28%)',
            maskImage:
              'linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.7) 10%, transparent 28%)',
            pointerEvents: 'none',
          }}
        />

        {/* Painterly noise at the BOTTOM edge transition — same dissolve quality */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.4,
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'320\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.55\' numOctaves=\'3\' stitchTiles=\'stitch\' seed=\'8\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.4\'/></svg>")',
            mixBlendMode: 'overlay',
            WebkitMaskImage:
              'linear-gradient(180deg, transparent 0%, transparent 70%, rgba(0,0,0,0.7) 85%, transparent 100%)',
            maskImage:
              'linear-gradient(180deg, transparent 0%, transparent 70%, rgba(0,0,0,0.7) 85%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Live operations chip — top right of image, with coords beneath */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 130,
            right: 32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 10,
            zIndex: 5,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'rgba(255,255,255,0.95)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              background: 'rgba(10,10,10,0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#22d3ee' }}
            />
            Cargo · In transit
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 10,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.12em',
              textShadow: '0 1px 2px rgba(10,10,10,0.4)',
            }}
          >
            27.4°S · 153.0°E  ·  BULK CARRIER
          </div>
        </motion.div>

        {/* Vertical "RIVER · MMXXVI" editorial signature at right edge — in solid zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="vert-sig"
          style={{
            position: 'absolute',
            right: 12,
            top: '38%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center',
            color: 'rgba(255,255,255,0.42)',
            fontSize: 10,
            letterSpacing: '0.4em',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            fontFamily: 'JetBrains Mono, monospace',
            textTransform: 'uppercase',
            zIndex: 4,
          }}
        >
          River Global · MMXXVI · Sydney
        </motion.div>
      </motion.div>

      {/* ============ TOP META BAR ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ position: 'relative', zIndex: 5, paddingTop: 100 }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                className="pulse"
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--river)',
                  display: 'inline-block', position: 'relative',
                }}
              />
              Operations live
            </span>
            <span style={{ color: 'var(--line-2)' }}>·</span>
            <span className="mono" style={{ letterSpacing: '0.1em' }}>SYD {time}</span>
          </div>
          <div className="top-meta-right" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>AU</span>
            <span style={{ color: 'var(--line-2)' }}>×</span>
            <span>IN</span>
            <span style={{ color: 'var(--line-2)' }}>·</span>
            <span className="mono">VOL.01 / 2026</span>
          </div>
        </div>
      </motion.div>

      {/* ============ MAIN CONTENT ============ */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: 'clamp(72px, 10vh, 140px)',
          paddingBottom: 24,
        }}
      >
        <div className="hero-text-col">
          {/* Editorial staircase headline */}
          <h1
            style={{
              fontSize: 'clamp(40px, 5.4vw, 86px)',
              lineHeight: 0.96,
              letterSpacing: '-0.045em',
              fontWeight: 500,
              color: 'var(--ink)',
              marginBottom: 30,
              position: 'relative',
            }}
          >
            {/* Line 1 — "Integrated supply," */}
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
              <motion.span
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                Integrated{' '}
                <span
                  className="serif"
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--river)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    fontSize: '1.05em',
                  }}
                >
                  supply
                </span>
                <span style={{ color: 'var(--muted-2)', fontWeight: 400 }}>,</span>
              </motion.span>
            </span>

            {/* Line 2 — "coordinated globally." flush left, matching line 1 */}
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              <motion.span
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                <span
                  className="serif"
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--river)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    fontSize: '1.08em',
                  }}
                >
                  coordinated
                </span>{' '}
                globally
                <span
                  className="serif"
                  style={{
                    color: 'var(--river)',
                    fontStyle: 'italic',
                    fontSize: '1.1em',
                    marginLeft: '-0.04em',
                  }}
                >
                  .
                </span>
              </motion.span>
            </span>
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease }}
            style={{
              fontSize: 'clamp(14.5px, 1.1vw, 16.5px)',
              lineHeight: 1.5,
              color: 'var(--ink-soft)',
              maxWidth: 460,
              marginBottom: 28,
            }}
          >
            One accountable team for sourcing, freight and international trade —
            built on Australian operational discipline and the Chain of Responsibility framework.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.6, ease }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}
          >
            <a href="#contact" className="btn">
              Request sourcing <ArrowUpRight size={14} />
            </a>
            <a href="#capabilities" className="btn btn-ghost">
              How we operate
            </a>
          </motion.div>

          {/* Inline metrics */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6, ease }}
            style={{
              display: 'flex',
              gap: 28,
              flexWrap: 'wrap',
              alignItems: 'baseline',
              paddingTop: 22,
              borderTop: '1px solid var(--line)',
            }}
            className="hero-metrics"
          >
            {[
              { value: '11+', label: 'Countries' },
              { value: '6', label: 'Sectors' },
              { value: '25+', label: 'Routes' },
              { value: '24/7', label: 'Support' },
            ].map((m) => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </span>
              </div>
            ))}

            <motion.a
              href="#who"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 11,
                color: 'var(--muted)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginLeft: 'auto',
              }}
              whileHover={{ color: '#0a0a0a' as any }}
            >
              Scroll
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'flex' }}
              >
                <ArrowDown size={12} />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ============ TRUSTED MARQUEE — in-viewport at bottom of hero ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 6,
          height: 56,
          background: 'var(--ink)',
          color: 'var(--paper)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Edge fades */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(90deg, var(--ink), transparent)',
          zIndex: 3, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(-90deg, var(--ink), transparent)',
          zIndex: 3, pointerEvents: 'none',
        }} />

        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'rgba(250,250,247,0.45)',
              fontWeight: 600,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 12, height: 1, background: 'rgba(250,250,247,0.3)' }} />
            Trusted across
          </div>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex', gap: 48, flexShrink: 0 }}
            >
              {[...trustedSectors, ...trustedSectors].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      flexShrink: 0,
                      color: 'rgba(250,250,247,0.78)',
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <Icon size={15} strokeWidth={1.4} color="var(--river-mist)" />
                    {s.label}
                    <span style={{ color: 'rgba(250,250,247,0.2)', marginLeft: 14 }}>·</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ============ Responsive ============ */}
      <style>{`
        .hero-text-col {
          max-width: 56%;
        }

        @media (max-width: 1280px) {
          .hero-text-col { max-width: 58%; }
        }

        @media (max-width: 1100px) {
          .hero-text-col { max-width: 60%; }
          .hero-image-bleed { width: 44% !important; }
        }

        @media (max-width: 900px) {
          section#top { height: auto !important; min-height: 100vh; }
          .hero-text-col { max-width: 100% !important; }
          .hero-image-bleed {
            position: relative !important;
            width: 100% !important;
            height: 340px !important;
            bottom: auto !important;
            margin-top: 32px;
          }
          .vert-sig { display: none !important; }
        }

        @media (max-width: 600px) {
          .top-meta-right span:nth-child(n+4) { display: none; }
          .hero-metrics { gap: 18px !important; }
        }
      `}</style>
    </section>
  );
}

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
          width: '60%',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* The image — dual-axis mask: dissolves into paper on LEFT and BOTTOM */}
        <motion.div
          className="hero-image-inner"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/supply.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.04) saturate(0.88) brightness(0.95)',
            WebkitMaskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.12) 12%, rgba(0,0,0,0.24) 18%, rgba(0,0,0,0.4) 24%, rgba(0,0,0,0.58) 30%, rgba(0,0,0,0.76) 36%, rgba(0,0,0,0.9) 42%, rgba(0,0,0,0.98) 48%, #000 55%, #000 100%),
              linear-gradient(180deg, #000 0%, #000 50%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.6) 78%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0.08) 96%, transparent 100%)
            `,
            maskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.12) 12%, rgba(0,0,0,0.24) 18%, rgba(0,0,0,0.4) 24%, rgba(0,0,0,0.58) 30%, rgba(0,0,0,0.76) 36%, rgba(0,0,0,0.9) 42%, rgba(0,0,0,0.98) 48%, #000 55%, #000 100%),
              linear-gradient(180deg, #000 0%, #000 50%, rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.6) 78%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0.08) 96%, transparent 100%)
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
              'linear-gradient(180deg, rgba(250,250,247,0.05) 0%, rgba(14,85,96,0.06) 55%, rgba(14,85,96,0.04) 85%)',
            mixBlendMode: 'multiply',
            WebkitMaskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.72) 32%, #000 50%),
              linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 75%, transparent 100%)
            `,
            maskImage: `
              linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.72) 32%, #000 50%),
              linear-gradient(180deg, #000 0%, rgba(0,0,0,0.7) 75%, transparent 100%)
            `,
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        />


        {/* Paper-tinted bridge — covers left half only, fully out before the boat zone */}
        <div
          className="hero-left-blend"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(95deg,
              var(--paper) 0%,
              rgba(250,250,247,0.92) 10%,
              rgba(250,250,247,0.72) 18%,
              rgba(250,250,247,0.46) 26%,
              rgba(250,250,247,0.22) 34%,
              rgba(250,250,247,0.08) 42%,
              transparent 50%
            )`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Painterly noise at the LEFT edge transition */}
        <div
          className="hero-left-blend"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'320\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.4\'/></svg>")',
            mixBlendMode: 'overlay',
            WebkitMaskImage:
              'linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.55) 12%, rgba(0,0,0,0.5) 24%, rgba(0,0,0,0.15) 36%, transparent 48%)',
            maskImage:
              'linear-gradient(95deg, transparent 0%, rgba(0,0,0,0.55) 12%, rgba(0,0,0,0.5) 24%, rgba(0,0,0,0.15) 36%, transparent 48%)',
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

      </motion.div>

      {/* ============ TOP SPACER ============ */}
      <div className="hero-topspacer" style={{ paddingTop: 100 }} />

      {/* ============ MAIN CONTENT ============ */}
      <div
        className="container hero-main"
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
          {/* 3-line headline — premium display sans, all caps */}
          <h1
            style={{
              fontFamily: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: 'clamp(28px, 3.2vw, 50px)',
              lineHeight: 1.16,
              letterSpacing: '0.01em',
              fontWeight: 600,
              color: 'var(--ink)',
              marginBottom: 26,
              position: 'relative',
            }}
          >
            {/* Line 1 — all black */}
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              <motion.span custom={0} variants={lineVariants} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
                INTEGRATED SUPPLY
              </motion.span>
            </span>
            {/* Line 2 — all black */}
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              <motion.span custom={1} variants={lineVariants} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
                COORDINATED LOGISTICS
              </motion.span>
            </span>
            {/* Line 3 — full teal accent */}
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.05em' }}>
              <motion.span custom={2} variants={lineVariants} initial="hidden" animate="visible" style={{ display: 'inline-block', color: 'var(--river-soft)' }}>
                CONFIDENT GLOBAL TRADE
              </motion.span>
            </span>
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease }}
            style={{
              fontSize: 'clamp(13.5px, 1vw, 15.5px)',
              lineHeight: 1.6,
              color: 'var(--ink-soft)',
              maxWidth: 480,
              marginBottom: 28,
            }}
          >
            River Global is an Australian supply and trade partner connecting sourcing, logistics,
            trade coordination and international trade into one integrated execution platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.6, ease }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}
          >
            <a href="#capabilities" className="btn">
              Explore capabilities <ArrowUpRight size={14} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Talk to us
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
              className="hero-scroll"
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
        className="hero-marquee"
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
          max-width: 58%;
        }
        .hero-text-col h1 span {
          white-space: nowrap;
        }

        @media (max-width: 1280px) {
          .hero-text-col { max-width: 62%; }
        }

        @media (max-width: 1100px) {
          .hero-text-col { max-width: 66%; }
          .hero-image-bleed { width: 56% !important; }
        }

        @media (max-width: 900px) {
          /* Stack the hero cleanly: nav clearance → text → image banner → trust strip.
             Putting text first keeps the dark navbar logo over the light page, not the photo. */
          section#top { height: auto !important; min-height: auto !important; max-height: none !important; }
          .hero-text-col { max-width: 100% !important; }

          .hero-topspacer { order: 1; padding-top: 84px !important; }
          .hero-main {
            order: 2;
            padding-top: 8px !important;
            padding-bottom: 30px !important;
          }
          .hero-image-bleed {
            order: 3;
            position: relative !important;
            width: 100% !important;
            height: 280px !important;
            bottom: auto !important;
            margin-top: 4px;
          }
          .hero-marquee { order: 4; }

          /* Single clean bottom-and-top fade so the photo melts into the paper */
          .hero-image-inner {
            -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 16%, #000 72%, transparent 100%) !important;
            mask-image: linear-gradient(180deg, transparent 0%, #000 16%, #000 72%, transparent 100%) !important;
            -webkit-mask-composite: source-over !important;
            mask-composite: add !important;
            -webkit-mask-size: 100% 100% !important;
            mask-size: 100% 100% !important;
            background-position: center 35% !important;
          }
          /* The left-edge blends are for the desktop split layout only */
          .hero-left-blend { display: none !important; }
        }

        @media (max-width: 600px) {
          /* 2 metrics per row, and hide the scroll cue on mobile */
          .hero-metrics {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px 18px !important;
          }
          .hero-scroll { display: none !important; }
          .hero-image-bleed { height: 230px !important; }
        }
      `}</style>
    </section>
  );
}

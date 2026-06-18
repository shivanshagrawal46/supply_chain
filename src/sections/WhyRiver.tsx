import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check, Layers, Eye, Globe2, Package } from 'lucide-react';

const FRAGMENTED = [
  'Multiple vendors to coordinate',
  'Disconnected communication',
  'Unclear accountability',
  'Freight uncertainty',
  'Compliance friction',
  'Slower decision cycle',
  'Unreliable sourcing continuity',
];

const INTEGRATED = [
  'Single coordination partner',
  'Unified execution visibility',
  'Clear accountability',
  'Coordinated freight',
  'Documentation alignment',
  'Faster commercial movement',
  'Reliable sourcing continuity',
];

const CAPABILITY_BOXES = [
  {
    icon: Layers,
    title: 'Integrated Coordination',
    desc: 'One accountable execution layer across sourcing, logistics, freight and trade.',
  },
  {
    icon: Eye,
    title: 'Commercial Clarity',
    desc: 'Reduced ambiguity through aligned communication and clear ownership at every step.',
  },
  {
    icon: Globe2,
    title: 'Global Execution Confidence',
    desc: 'Cross-border trade coordination with logistics oversight across multiple jurisdictions.',
  },
  {
    icon: Package,
    title: 'Flexible Supply Solutions',
    desc: 'Source pathways aligned to client requirements — adaptable as markets shift.',
  },
];

export default function WhyRiver() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="why" className="section cream" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 680, marginBottom: 52 }}
        >
          <span className="eyebrow">WHY RIVER GLOBAL</span>
          <h2 className="h1" style={{ marginTop: 20 }}>
            WHAT SETS US<br />
            <span style={{ color: 'var(--river)' }}>APART?</span>
          </h2>
        </motion.div>

        {/* Comparison table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }} className="compare-grid">
          {/* Fragmented model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, right: 0, padding: '5px 12px',
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em',
              background: 'var(--paper-3)', color: 'var(--muted)',
              textTransform: 'uppercase', borderBottomLeftRadius: 8,
            }}>
              Traditional Model
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 24, marginTop: 10 }}>
              Fragmented supply chain
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {FRAGMENTED.map((risk, i) => (
                <motion.div
                  key={risk}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 0',
                    borderBottom: i < FRAGMENTED.length - 1 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 999,
                    background: 'rgba(177,55,42,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <X size={11} color="var(--red)" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{risk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* River Global — teal accent card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22 }}
            style={{
              background: 'linear-gradient(135deg, var(--river) 0%, var(--river-soft) 100%)',
              color: 'var(--paper)',
              borderRadius: 14,
              padding: '28px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: -50, right: -50, width: 180, height: 180,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <div style={{
              position: 'absolute', top: 0, right: 0, padding: '5px 12px',
              fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em',
              background: 'rgba(255,255,255,0.18)', color: 'var(--paper)',
              textTransform: 'uppercase', borderBottomLeftRadius: 8, zIndex: 2,
              backdropFilter: 'blur(8px)',
            }}>
              River Global
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 24, marginTop: 10, position: 'relative', color: 'var(--paper)' }}>
              One accountable team
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
              {INTEGRATED.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.42 + i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 0',
                    borderBottom: i < INTEGRATED.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 999,
                    background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Check size={11} color="var(--paper)" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.95)' }}>{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bold tagline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '24px 20px',
            marginBottom: 48,
            borderRadius: 10,
            background: 'rgba(29,137,151,0.05)',
            border: '1px solid rgba(29,137,151,0.15)',
          }}
        >
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            fontWeight: 600,
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
          }}>
            Fragmented vendors carry hidden risks —{' '}
            <span style={{ color: 'var(--river)' }}>
              River Global's integrated execution removes it.
            </span>
          </p>
        </motion.div>

        {/* 4 Capability boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="capability-boxes">
          {CAPABILITY_BOXES.map((box, i) => {
            const Icon = box.icon;
            return (
              <motion.div
                key={box.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.65 + i * 0.07 }}
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '20px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <Icon size={20} strokeWidth={1.4} color="var(--river-soft)" />
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8, color: 'var(--ink)' }}>
                    {box.title}
                  </h4>
                  <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
                    {box.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .compare-grid { grid-template-columns: 1fr !important; }
          .capability-boxes { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .capability-boxes { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

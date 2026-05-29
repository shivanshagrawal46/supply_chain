import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Check } from 'lucide-react';
import { whyRiverPoints, fragmentedRisks } from '../data/siteData';

export default function WhyRiver() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section className="section cream" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 60px' }}
        >
          <span className="eyebrow" style={{ justifyContent: 'center' }}>06 — Why River Global</span>
          <h2 className="h1" style={{ marginTop: 24 }}>
            Fragmented vendors carry hidden risk.<br />
            <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river)' }}>Integrated</span> execution removes it.
          </h2>
        </motion.div>

        {/* Comparison grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 80 }} className="compare-grid">
          {/* Fragmented */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, right: 0, padding: '6px 12px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
              background: 'var(--paper-3)', color: 'var(--muted)',
              textTransform: 'uppercase', borderBottomLeftRadius: 8,
            }}>
              Traditional Model
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8, marginTop: 12 }}>
              Fragmented supply chain
            </h3>
            <p className="body" style={{ marginBottom: 28 }}>
              Multiple vendors managing pieces of the same movement — each owning only their slice, none owning the outcome.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {fragmentedRisks.map((risk, i) => (
                <motion.div
                  key={risk}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < fragmentedRisks.length - 1 ? '1px solid var(--line)' : 'none' }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 999,
                    background: 'rgba(177, 55, 42, 0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <X size={12} color="var(--red)" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{risk}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* River Global */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(29,137,151,0.3), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <div style={{
              position: 'absolute', top: 0, right: 0, padding: '6px 12px',
              fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
              background: 'var(--river)', color: 'var(--paper)',
              textTransform: 'uppercase', borderBottomLeftRadius: 8,
              zIndex: 2,
            }}>
              River Global
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8, marginTop: 12, position: 'relative' }}>
              One accountable team
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.6, marginBottom: 28, position: 'relative' }}>
              Sourcing, freight, trade and compliance under unified responsibility — built around clear documentation
              and Chain of Responsibility ownership.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
              {whyRiverPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  style={{
                    padding: '14px 0',
                    borderBottom: i < whyRiverPoints.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 999,
                      background: 'rgba(29,137,151,0.2)',
                      border: '1px solid rgba(29,137,151,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <Check size={11} color="var(--river-mist)" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{point.title}</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{point.body}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .compare-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

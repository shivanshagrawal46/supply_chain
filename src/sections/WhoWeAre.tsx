import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, FileCheck, Scale, Truck } from 'lucide-react';

const pillars = [
  { icon: ShieldCheck, label: 'Chain of Responsibility' },
  { icon: FileCheck, label: 'Documentation control' },
  { icon: Scale, label: 'Weight & load compliance' },
  { icon: Truck, label: 'Trained execution' },
];

export default function WhoWeAre() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="who" className="section" ref={ref}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1.3fr)', gap: 60, alignItems: 'start' }} className="who-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">01 — Who we are</span>
            <h2 className="h2" style={{ marginTop: 28, marginBottom: 0 }}>
              We simplify <br />
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river)' }}>complex</span> supply chains.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="lead" style={{ marginBottom: 28 }}>
              River Global delivers integrated supply, logistics and international trade execution from a single accountable
              team. We operate with operational discipline — not marketing fluff. Every movement is owned end-to-end,
              with documented chain of responsibility from origin to delivery.
            </p>

            <p className="body" style={{ marginBottom: 40 }}>
              Our model is built on Australian compliance frameworks combined with on-the-ground Indian operational support —
              giving customers cross-border capability without the coordination overhead of managing multiple vendors.
            </p>

            {/* Operational Assurance pillar block */}
            <div
              style={{
                border: '1px solid var(--line)',
                borderRadius: 12,
                padding: 28,
                background: 'var(--paper-2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600, marginBottom: 6 }}>
                    Operational Assurance
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>
                    Chain of Responsibility — built into every movement
                  </div>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: 999, background: 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)',
                  flexShrink: 0,
                }}>
                  <ShieldCheck size={18} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="pillars-grid">
                {pillars.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <p.icon size={16} strokeWidth={1.6} color="var(--river)" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{p.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .who-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

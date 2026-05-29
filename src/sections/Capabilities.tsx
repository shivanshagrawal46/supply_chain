import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Plus } from 'lucide-react';
import { capabilities } from '../data/siteData';

export default function Capabilities() {
  const [hover, setHover] = useState<number | null>(null);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="capabilities" className="section cream" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">02 — How we do it</span>
            <h2 className="h1" style={{ marginTop: 24 }}>
              Five capabilities,<br />
              <span className="serif" style={{ fontStyle: 'italic' }}>one</span> accountable team.
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 360 }}>
            We replace the fragmented vendor model with a single point of execution — across sourcing, logistics, freight, trade and compliance.
          </p>
        </motion.div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const isHover = hover === i;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  borderBottom: '1px solid var(--line)',
                  padding: '32px 0',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Hover background sweep */}
                <motion.div
                  initial={false}
                  animate={{ scaleX: isHover ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--ink)',
                    transformOrigin: 'left',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 1fr 60px',
                    alignItems: 'center',
                    gap: 24,
                    color: isHover ? 'var(--paper)' : 'var(--ink)',
                    transition: 'color 0.4s',
                  }}
                  className="cap-row"
                >
                  <div className="mono" style={{ fontSize: 12, opacity: 0.6 }}>
                    0{i + 1}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <motion.div
                      animate={{ rotate: isHover ? 12 : 0, scale: isHover ? 1.05 : 1 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: isHover ? 'rgba(255,255,255,0.1)' : 'var(--paper)',
                        border: isHover ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--line)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background 0.4s, border 0.4s',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="h3" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.015em' }}>
                      {cap.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: 14, opacity: 0.75, maxWidth: 420, lineHeight: 1.55 }} className="cap-desc">
                    {cap.description}
                  </p>

                  <motion.div
                    animate={{ rotate: isHover ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: 36, height: 36, borderRadius: 999,
                      border: `1px solid ${isHover ? 'rgba(255,255,255,0.3)' : 'var(--line-2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginLeft: 'auto',
                    }}
                  >
                    <Plus size={14} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isHover && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'relative', overflow: 'hidden' }}
                    >
                      <div style={{ display: 'flex', gap: 12, paddingTop: 22, marginLeft: 84, color: 'rgba(255,255,255,0.85)' }}>
                        {cap.points.map((point) => (
                          <span
                            key={point}
                            style={{
                              fontSize: 12,
                              padding: '6px 14px',
                              borderRadius: 999,
                              border: '1px solid rgba(255,255,255,0.25)',
                              background: 'rgba(255,255,255,0.04)',
                            }}
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cap-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .cap-desc { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

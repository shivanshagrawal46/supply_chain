import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { supplyMotionFrames } from '../data/siteData';

export default function SupplyInMotion() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % supplyMotionFrames.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section className="section dark" ref={ref} style={{ overflow: 'hidden', padding: 0 }}>
      <div
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(60px, 10vw, 120px) 0',
        }}
      >
        {/* Background visual */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/supply.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.45) saturate(0.7)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.7) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 60 }}
          >
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>07 — Supply in Motion</span>
            <h2 className="h1" style={{ marginTop: 24, color: 'var(--paper)' }}>
              From source to delivery —<br />
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river-mist)' }}>visible</span>, traceable, accountable.
            </h2>
          </motion.div>

          {/* Frame indicators */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${supplyMotionFrames.length}, 1fr)`, gap: 12 }} className="motion-grid">
            {supplyMotionFrames.map((frame, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={frame.stage}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 14,
                    padding: '24px 20px',
                    color: 'var(--paper)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.4s',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(8px)',
                  }}
                  className="motion-card"
                >
                  {/* Progress bar */}
                  {isActive && (
                    <motion.div
                      key={`bar-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.2, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'var(--river-mist)',
                        transformOrigin: 'left',
                      }}
                    />
                  )}
                  <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 10 }}>
                    {frame.stage}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>
                    {frame.body}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 40,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', maxWidth: 520 }}>
              Visual story of every movement — from origin documentation, through loading and transit, to confirmed delivery.
              Footage updated as the operations team captures live operations.
            </p>
            <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>
              REC · STORYBOARD v1
            </span>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .motion-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .motion-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Package, Forklift, Truck, Warehouse, PackageCheck } from 'lucide-react';
import { supplyMotionFrames } from '../data/siteData';
import { useState, useEffect } from 'react';

const STAGE_ICONS = [Package, Forklift, Truck, Warehouse, PackageCheck];

export default function SupplyInMotion() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % supplyMotionFrames.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="motion" className="section" ref={ref} style={{ overflow: 'hidden', background: 'var(--ink)', padding: 0 }}>
      <div
        style={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(60px, 8vw, 100px) 0',
        }}
      >
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/supply.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.32) saturate(0.5)',
          }}
        />
        {/* Gradient overlay aligned to site palette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,26,30,0.65) 0%, rgba(10,26,30,0.78) 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 48 }}
          >
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>
              HOW WE DO IT
            </span>
            <h2 className="h1" style={{ marginTop: 20, color: 'var(--paper)' }}>
              HOW WE MOVE<br />
              <span style={{ color: 'var(--river-mist)' }}>YOUR CARGO</span>
            </h2>
          </motion.div>

          {/* Two-col layout: frame cards + video placeholder */}
          <div className="motion-layout">
            {/* Stage cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {supplyMotionFrames.map((frame, i) => {
                const isActive = active === i;
                const StageIcon = STAGE_ICONS[i % STAGE_ICONS.length];
                return (
                  <motion.button
                    key={frame.stage}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 10,
                      padding: '18px 20px',
                      color: 'var(--paper)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.35s',
                      position: 'relative',
                      overflow: 'hidden',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        key={`bar-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 3.2, ease: 'linear' }}
                        style={{
                          position: 'absolute', top: 0, left: 0, right: 0,
                          height: 2, background: 'var(--river)', transformOrigin: 'left',
                        }}
                      />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: isActive ? 'rgba(29,137,151,0.22)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isActive ? 'rgba(29,137,151,0.45)' : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isActive ? 'var(--river-mist)' : 'rgba(255,255,255,0.6)',
                        transition: 'all 0.35s',
                      }}>
                        <StageIcon size={17} strokeWidth={1.6} />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 4, color: isActive ? 'var(--paper)' : 'rgba(255,255,255,0.75)' }}>
                          {frame.stage}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                          {frame.body}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Video placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                minHeight: 260,
                backdropFilter: 'blur(6px)',
                padding: 32,
                textAlign: 'center',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                style={{
                  width: 60, height: 60, borderRadius: 999,
                  background: 'rgba(29,137,151,0.2)',
                  border: '1px solid rgba(29,137,151,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Play size={22} color="var(--river-mist)" fill="var(--river-mist)" strokeWidth={0} />
              </motion.div>
              <div>
                <span style={{
                  display: 'inline-block', marginBottom: 12,
                  fontSize: 9.5, fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--river-mist)',
                  padding: '5px 12px', borderRadius: 999,
                  border: '1px solid rgba(29,137,151,0.4)', background: 'rgba(29,137,151,0.12)',
                }}>
                  Coming soon
                </span>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 6 }}>
                  Watch River Global in motion
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  Professional footage in production —<br />showcasing sourcing, loading, transit and delivery.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .motion-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .motion-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

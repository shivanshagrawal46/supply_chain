import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '../data/siteData';

export default function Industries() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="industries" className="section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 64,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">03 — Who we serve</span>
            <h2 className="h1" style={{ marginTop: 24 }}>
              Industries <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river)' }}>built</span>
              <br />
              on dependable supply.
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 360 }}>
            Six sectors where consistent sourcing, on-time delivery and compliant documentation are non-negotiable.
          </p>
        </motion.div>

        {/* Refined card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isHover = hovered === ind.id;
            const num = String(i + 1).padStart(2, '0');
            const total = String(industries.length).padStart(2, '0');

            return (
              <motion.a
                key={ind.id}
                href="#contact"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(ind.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'var(--paper)',
                  border: `1px solid ${isHover ? 'var(--ink)' : 'var(--line)'}`,
                  borderRadius: 14,
                  padding: '22px 22px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 300,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isHover ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: isHover
                    ? '0 20px 50px -24px rgba(14, 85, 96, 0.22), 0 6px 18px -10px rgba(0,0,0,0.06)'
                    : '0 1px 2px rgba(0,0,0,0.02)',
                  transition:
                    'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease',
                }}
              >
                {/* Decorative giant ghost icon — visual signature per industry */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: -22,
                    right: -22,
                    pointerEvents: 'none',
                    opacity: isHover ? 0.075 : 0.045,
                    transition: 'opacity 0.5s, transform 0.5s',
                    transform: isHover ? 'rotate(-6deg) scale(1.05)' : 'rotate(0) scale(1)',
                    color: 'var(--ink)',
                  }}
                >
                  <Icon size={170} strokeWidth={0.9} />
                </div>

                {/* Top: icon container + arrow */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isHover ? 1.04 : 1,
                      backgroundColor: isHover ? 'var(--ink)' : 'var(--paper-2)',
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      border: `1px solid ${isHover ? 'var(--ink)' : 'var(--line)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.4}
                      style={{
                        color: isHover ? 'var(--paper)' : 'var(--ink)',
                        transition: 'color 0.4s',
                      }}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: isHover ? 45 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 999,
                      border: `1px solid ${isHover ? 'var(--ink)' : 'var(--line-2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHover ? 'var(--ink)' : 'var(--muted)',
                      transition: 'all 0.4s',
                    }}
                  >
                    <ArrowUpRight size={13} strokeWidth={1.8} />
                  </motion.div>
                </div>

                {/* Middle content */}
                <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--muted)',
                      marginBottom: 10,
                      fontWeight: 600,
                    }}
                  >
                    {ind.tag}
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(22px, 1.8vw, 26px)',
                      fontWeight: 500,
                      letterSpacing: '-0.022em',
                      lineHeight: 1.05,
                      marginBottom: 14,
                      color: 'var(--ink)',
                    }}
                  >
                    {ind.title}
                    <span
                      className="serif"
                      style={{
                        color: 'var(--river)',
                        fontStyle: 'italic',
                        marginLeft: 2,
                      }}
                    >
                      .
                    </span>
                  </h3>

                  <motion.div
                    animate={{
                      width: isHover ? '64%' : '24%',
                      backgroundColor: isHover ? 'var(--river)' : 'var(--line-2)',
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: 1.5,
                      marginBottom: 14,
                    }}
                  />

                  <p
                    style={{
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: 'var(--muted)',
                      maxWidth: 280,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {ind.description}
                  </p>
                </div>

                {/* Bottom: editorial page numbering + reveal action */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    paddingTop: 12,
                    borderTop: '1px solid var(--line)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10.5,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--muted-2)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {num} <span style={{ color: 'var(--line-2)' }}>/</span> {total}
                  </span>
                  <motion.span
                    animate={{
                      opacity: isHover ? 1 : 0,
                      x: isHover ? 0 : -6,
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    View capabilities <ArrowUpRight size={11} strokeWidth={2} />
                  </motion.span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .industry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">INDUSTRIES WE SERVE</span>
            <h2 className="h1" style={{ marginTop: 22 }}>
              INDUSTRIES BUILT ON<br />
              <span style={{ color: 'var(--river)' }}>DEPENDABLE SUPPLY</span>
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 380 }}>
            We serve multiple sectors where consistent sourcing, on-time delivery and compliance are
            non-negotiable.
          </p>
        </motion.div>

        {/* Minimalist 4-up grid */}
        <div className="industry-grid">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isHover = hovered === ind.id;

            return (
              <motion.a
                key={ind.id}
                href="#contact"
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(ind.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'var(--paper)',
                  border: `1px solid ${isHover ? 'var(--ink)' : 'var(--line)'}`,
                  borderRadius: 12,
                  padding: '20px 18px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 200,
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  position: 'relative',
                  transform: isHover ? 'translateY(-3px)' : 'translateY(0)',
                  transition:
                    'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease',
                }}
              >
                {/* Icon — minimal, no container, river teal */}
                <Icon
                  size={22}
                  strokeWidth={1.4}
                  style={{
                    color: isHover ? 'var(--river)' : 'var(--river-soft)',
                    transition: 'color 0.35s',
                  }}
                />

                {/* Animated teal hairline */}
                <motion.div
                  animate={{
                    width: isHover ? 28 : 16,
                    backgroundColor: isHover ? 'var(--river)' : 'var(--line-2)',
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: 1.5 }}
                />

                {/* Tag */}
                <div
                  style={{
                    fontSize: 9.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--muted)',
                    fontWeight: 600,
                  }}
                >
                  {ind.tag}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    marginTop: 'auto',
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

                {/* Short description — 2-line clamp */}
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: 'var(--muted)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {ind.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>

      <style>{`
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .industry-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .industry-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';
import { leadership } from '../data/siteData';

export default function Leadership() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="section cream" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 60 }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">09 — Leadership</span>
            <h2 className="h1" style={{ marginTop: 24 }}>
              The team behind<br />
              the <span className="serif" style={{ fontStyle: 'italic' }}>execution</span>.
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 360 }}>
            People who take ownership of the work — not biographies, just clear responsibility and a focus on outcomes.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {leadership.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6 }}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Portrait area */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, var(--ink), #2a2a2a)`,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 70% 30%, rgba(29,137,151,0.25), transparent 60%)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
                  backgroundSize: '14px 14px',
                }} />
                <span
                  className="serif"
                  style={{
                    fontSize: 88,
                    color: 'rgba(250,250,247,0.92)',
                    fontWeight: 400,
                    letterSpacing: '-0.04em',
                    position: 'relative',
                  }}
                >
                  {person.initials}
                </span>
                <div style={{
                  position: 'absolute', bottom: 14, left: 14,
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: 'rgba(250,250,247,0.6)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}>
                  <MapPin size={11} strokeWidth={1.6} /> {person.location}
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6, fontWeight: 600 }}>
                  {person.role}
                </div>
                <h3 style={{ fontSize: 21, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 12 }}>
                  {person.name}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {person.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

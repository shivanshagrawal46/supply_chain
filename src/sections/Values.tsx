import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { values } from '../data/siteData';

export default function Values() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="values" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}
        >
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow">WHAT WE OPERATE ON</span>
            <h2 className="h1" style={{ marginTop: 22 }}>
              VALUES THAT DECIDE<br />
              <span style={{ color: 'var(--river)' }}>HOW WE OPERATE</span>
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 380 }}>
            The principles that shape every contract, every shipment, every conversation — clear, direct, no ambiguity.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}
          className="values-grid-classic"
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                whileHover={{ backgroundColor: 'var(--paper-2)' }}
                style={{
                  background: 'var(--paper)',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  minHeight: 220,
                  cursor: 'default',
                  transition: 'background 0.3s',
                }}
              >
                <Icon size={26} strokeWidth={1.4} color="var(--river-soft)" />
                <h3 style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 'auto' }}>
                  {v.name}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .values-grid-classic { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .values-grid-classic { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

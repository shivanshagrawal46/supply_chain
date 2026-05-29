import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'hello@riverglobal.com.au', href: 'mailto:hello@riverglobal.com.au' },
    { icon: Phone, label: 'Phone (AU)', value: '+61 2 0000 0000', href: 'tel:+61200000000' },
    { icon: MapPin, label: 'Headquarters', value: 'Sydney, Australia · Mumbai, India', href: null },
    { icon: Clock, label: 'Response time', value: 'Within one business day', href: null },
  ];

  return (
    <section id="contact" className="section dark" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>
            10 — Contact
          </span>
          <h2 className="h1" style={{ marginTop: 20, color: 'var(--paper)' }}>
            Talk to the
            <br />
            <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river-mist)' }}>
              operations
            </span>{' '}
            team.
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 15,
              lineHeight: 1.65,
              marginTop: 20,
              maxWidth: 520,
            }}
          >
            Tell us about your sourcing requirement, freight movement or trade execution need.
            Inquiries are routed to the relevant lead and replied to within one business day.
          </p>
        </motion.div>

        {/* Contact cards row */}
        <div className="contact-cards">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 14,
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--river-mist)',
                }}
              >
                <item.icon size={15} strokeWidth={1.6} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: 'rgba(255,255,255,0.42)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize: 14.5,
                      color: 'var(--paper)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                      paddingBottom: 1,
                      transition: 'border-color 0.25s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')
                    }
                  >
                    {item.value}
                  </a>
                ) : (
                  <div style={{ fontSize: 14.5, color: 'var(--paper)' }}>{item.value}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            marginTop: 28,
            padding: '32px 36px',
            borderRadius: 14,
            background:
              'linear-gradient(135deg, rgba(29,137,151,0.14), rgba(29,137,151,0.02))',
            border: '1px solid rgba(29,137,151,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10.5,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--river-mist)',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Start a conversation
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', maxWidth: 520, lineHeight: 1.55 }}>
              Reach out directly — our operations team handles sourcing, freight, trade and
              compliance inquiries. No forms, no automation. Direct response from the team.
            </p>
          </div>
          <a
            href="mailto:hello@riverglobal.com.au"
            className="btn btn-light"
            style={{ whiteSpace: 'nowrap' }}
          >
            Send an email <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1024px) {
          .contact-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .contact-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

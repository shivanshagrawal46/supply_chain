import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Modal } from 'antd';
import { ArrowUpRight, X, Download, FileText, CheckCircle2, Plus } from 'lucide-react';
import { products, productCategories, type Product } from '../data/siteData';

export default function Products() {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered = useMemo(() => {
    if (activeCat === 'all') return products;
    return products.filter((p) => p.category === activeCat);
  }, [activeCat]);

  const tabs = [{ id: 'all', label: 'All Products' }, ...productCategories];

  return (
    <section id="products" className="section dark" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 36,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>
              04 — Products & Materials
            </span>
            <h2 className="h1" style={{ marginTop: 20, fontSize: 'clamp(34px, 4vw, 56px)' }}>
              A growing catalogue of <br />
              <span
                className="serif"
                style={{ fontStyle: 'italic', color: 'var(--river-mist)', fontWeight: 400 }}
              >
                traceable
              </span>{' '}
              materials.
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 360, fontSize: 14, lineHeight: 1.65 }}>
            Industrial minerals, fertilisers, reagents, bulk commodities and gases — each backed by
            specifications, compliance information and document control.
          </p>
        </motion.div>

        {/* Refined filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 28,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '12px 0',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const active = activeCat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCat(tab.id)}
                  style={{
                    background: active ? 'var(--paper)' : 'transparent',
                    color: active ? 'var(--ink)' : 'rgba(255,255,255,0.65)',
                    border: `1px solid ${active ? 'var(--paper)' : 'rgba(255,255,255,0.12)'}`,
                    padding: '7px 14px',
                    borderRadius: 999,
                    fontSize: 11.5,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 10.5,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            {String(filtered.length).padStart(2, '0')} ITEMS · UPDATED 05/26
          </div>
        </motion.div>

        {/* Product grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => {
              const isHover = hovered === product.id;
              const num = String(i + 1).padStart(2, '0');
              const total = String(filtered.length).padStart(2, '0');
              const formula = product.formula || product.name.slice(0, 2).toUpperCase();
              const catLabel = productCategories.find((c) => c.id === product.category)?.label || '';

              return (
                <motion.button
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  onClick={() => setSelectedProduct(product)}
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHover
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                      : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${isHover ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14,
                    padding: '20px 20px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--paper)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 240,
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHover ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHover
                      ? '0 18px 40px -22px rgba(29, 137, 151, 0.32), 0 4px 14px -8px rgba(0,0,0,0.4)'
                      : 'none',
                    transition:
                      'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, background 0.4s ease',
                  }}
                >
                  {/* Subtle hover glow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(120% 80% at 0% 0%, rgba(29,137,151,0.18) 0%, transparent 55%)',
                      opacity: isHover ? 1 : 0,
                      transition: 'opacity 0.5s',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top row — formula chip + arrow pill */}
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
                        backgroundColor: isHover ? 'var(--river)' : 'rgba(255,255,255,0.04)',
                        borderColor: isHover ? 'var(--river)' : 'rgba(255,255,255,0.14)',
                      }}
                      transition={{ duration: 0.4 }}
                      style={{
                        minWidth: 52,
                        height: 32,
                        padding: '0 10px',
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.14)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        color: isHover ? 'var(--paper)' : 'var(--river-mist)',
                        transition: 'color 0.4s',
                      }}
                    >
                      {formula}
                    </motion.div>

                    <motion.div
                      animate={{ rotate: isHover ? 45 : 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        border: `1px solid ${isHover ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.12)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHover ? 'var(--paper)' : 'rgba(255,255,255,0.55)',
                        transition: 'all 0.4s',
                      }}
                    >
                      <ArrowUpRight size={12} strokeWidth={1.8} />
                    </motion.div>
                  </div>

                  {/* Middle content */}
                  <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        fontSize: 9.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        color: 'rgba(255,255,255,0.42)',
                        marginBottom: 10,
                        fontWeight: 600,
                      }}
                    >
                      {catLabel}
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(17px, 1.4vw, 20px)',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        marginBottom: 12,
                        color: 'var(--paper)',
                      }}
                    >
                      {product.name}
                      <span
                        className="serif"
                        style={{
                          color: 'var(--river-mist)',
                          fontStyle: 'italic',
                          marginLeft: 2,
                        }}
                      >
                        .
                      </span>
                    </h3>

                    {/* Animated divider */}
                    <motion.div
                      animate={{
                        width: isHover ? '58%' : '22%',
                        backgroundColor: isHover ? 'var(--river-mist)' : 'rgba(255,255,255,0.15)',
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        height: 1.5,
                        marginBottom: 12,
                      }}
                    />

                    <p
                      style={{
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom — page numbering + reveal action */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 16,
                      paddingTop: 12,
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.35)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {num} <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span> {total}
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
                        color: 'var(--paper)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      View specs <ArrowUpRight size={11} strokeWidth={2} />
                    </motion.span>
                  </div>
                </motion.button>
              );
            })}

            {/* "Add product" tile — communicates scalability
            <motion.div
              key="add-tile"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: filtered.length * 0.03 }}
              style={{
                border: '1px dashed rgba(255,255,255,0.14)',
                borderRadius: 14,
                padding: 20,
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'transparent',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <Plus size={16} strokeWidth={1.6} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 9.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  Custom Sourcing
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: 10,
                  }}
                >
                  Material not listed?
                </h3>
                <a
                  href="#contact"
                  style={{
                    fontSize: 11,
                    color: 'var(--river-mist)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    textDecoration: 'none',
                  }}
                >
                  Request sourcing <ArrowUpRight size={12} strokeWidth={2} />
                </a>
              </div>
            </motion.div> */}
          </AnimatePresence>
        </motion.div>

        {/* Scalability note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: 40,
            padding: '20px 24px',
            borderRadius: 12,
            background:
              'linear-gradient(135deg, rgba(29,137,151,0.10), rgba(29,137,151,0.015))',
            border: '1px solid rgba(29, 137, 151, 0.22)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 18,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10.5,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--river-mist)',
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              Catalogue is expandable
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', maxWidth: 560, lineHeight: 1.55 }}>
              Need a material not listed? Our sourcing team can qualify new vendors and onboard
              products into the catalogue with full compliance documentation.
            </p>
          </div>
          <a href="#contact" className="btn btn-light">
            Request Sourcing <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* Product detail modal */}
      <Modal
        open={!!selectedProduct}
        onCancel={() => setSelectedProduct(null)}
        footer={null}
        width={820}
        closable={false}
        centered
        styles={{
          body: { padding: 0 },
          mask: { background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)' },
        }}
      >
        {selectedProduct && (
          <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </Modal>
    </section>
  );
}

function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const formula = product.formula || product.name.slice(0, 2).toUpperCase();
  const catLabel = productCategories.find((c) => c.id === product.category)?.label || '';

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', position: 'relative' }}>
      {/* Editorial top band */}
      <div
        style={{
          padding: '14px 28px',
          background: 'var(--ink)',
          color: 'var(--paper)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 10.5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        <span>River Global · Product Specification</span>
        <span className="mono" style={{ letterSpacing: '0.1em' }}>
          RG-{product.id.toUpperCase().slice(0, 6)}-001
        </span>
      </div>

      {/* Header */}
      <div
        style={{
          padding: '28px 28px 24px',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div
            style={{
              minWidth: 62,
              height: 62,
              padding: '0 12px',
              borderRadius: 12,
              background: 'var(--ink)',
              color: 'var(--paper)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'JetBrains Mono, monospace',
              flexShrink: 0,
            }}
          >
            {formula}
          </div>
          <div>
            <div
              style={{
                fontSize: 10.5,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              {catLabel}
            </div>
            <h3 style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.022em', marginBottom: 4, lineHeight: 1.1 }}>
              {product.name}
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river)', marginLeft: 2 }}>
                .
              </span>
            </h3>
            <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>
              Reviewed 05/2026 · Document control active
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid var(--line)',
            width: 38,
            height: 38,
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: 28, maxHeight: '58vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: 28 }}>
          <SectionLabel>Overview</SectionLabel>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
            {product.description}
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}
          className="detail-grid"
        >
          <div>
            <SectionLabel>Applications</SectionLabel>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {product.applications.map((app) => (
                <li
                  key={app}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}
                >
                  <CheckCircle2 size={14} color="var(--river)" strokeWidth={1.6} />
                  {app}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Specifications</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {product.specifications.map((spec, i) => (
                <div
                  key={spec.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '9px 0',
                    borderBottom:
                      i < product.specifications.length - 1 ? '1px solid var(--line)' : 'none',
                    fontSize: 12.5,
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>{spec.label}</span>
                  <span style={{ fontWeight: 600 }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Compliance & Documentation</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {product.compliance.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 11.5,
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '1px solid var(--line-2)',
                  background: 'var(--paper-2)',
                  fontWeight: 500,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '18px 28px',
          borderTop: '1px solid var(--line)',
          background: 'var(--paper-2)',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--muted)' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={13} /> Safety Data Sheet
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={13} /> Technical Brochure
          </span>
        </div>
        <a href="#contact" className="btn" onClick={onClose}>
          Inquire about {product.name} <ArrowUpRight size={14} />
        </a>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10.5,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        color: 'var(--muted)',
        fontWeight: 600,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

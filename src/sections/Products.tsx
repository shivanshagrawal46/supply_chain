import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Modal } from 'antd';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

type ProductDetail = {
  id: string;
  name: string;
  formula?: string;
  description: string;
  applications: string[];
  specifications: { label: string; value: string }[];
  compliance: string[];
};

type Category = {
  id: string;
  title: string;
  desc: string;
  products: ProductDetail[];
};

const CATALOGUE: Category[] = [
  {
    id: 'fracs',
    title: 'FRACS & PROPPANTS',
    desc: 'Premium proppant grade for oilfield completion programs sourced to specification with coordinated field logistics.',
    products: [
      {
        id: '100-mesh',
        name: '100 Mesh',
        formula: '100M',
        description: 'High-purity 100 mesh frac sand engineered for hydraulic fracturing in tight formations — sourced to API specification with consistent grain distribution.',
        applications: ['Hydraulic fracturing', 'Unconventional plays', 'Slickwater completions', 'Tight gas reservoirs'],
        specifications: [
          { label: 'Mesh size', value: '100' },
          { label: 'Sphericity / Roundness', value: '≥ 0.7 / 0.7' },
          { label: 'Crush resistance', value: 'API RP 19C compliant' },
          { label: 'Packaging', value: 'Bulk pneumatic / 1 MT bags' },
        ],
        compliance: ['API RP 19C', 'ISO 13503-2', 'Field logistics coordinated'],
      },
      {
        id: '40-70',
        name: '40 / 70',
        formula: '40/70',
        description: 'Intermediate frac sand grade balancing conductivity and proppant flowback control for medium-pressure completions.',
        applications: ['Conventional fracturing', 'Sandstone reservoirs', 'Tight oil completions'],
        specifications: [
          { label: 'Mesh range', value: '40 – 70' },
          { label: 'Sphericity / Roundness', value: '≥ 0.7 / 0.7' },
          { label: 'Crush strength', value: '6K psi grade' },
          { label: 'Packaging', value: 'Bulk / 1 MT bags' },
        ],
        compliance: ['API RP 19C', 'ISO 13503-2'],
      },
      {
        id: '40-140',
        name: '40 / 140',
        formula: '40/140',
        description: 'Wide-range frac sand designed for varied fracture geometry and improved propped fracture coverage.',
        applications: ['Multi-stage completions', 'Variable formation profiles', 'Hybrid frac designs'],
        specifications: [
          { label: 'Mesh range', value: '40 – 140' },
          { label: 'Sphericity / Roundness', value: '≥ 0.7 / 0.7' },
          { label: 'Crush strength', value: '6K – 8K psi grades' },
          { label: 'Packaging', value: 'Bulk transport' },
        ],
        compliance: ['API RP 19C', 'ISO 13503-2'],
      },
      {
        id: '70-140',
        name: '70 / 140',
        formula: '70/140',
        description: 'Fine-grade proppant for high-pressure tight reservoirs requiring deeper fracture penetration with controlled conductivity.',
        applications: ['Deep tight formations', 'Slickwater fracs', 'Stacked completion programs'],
        specifications: [
          { label: 'Mesh range', value: '70 – 140' },
          { label: 'Sphericity / Roundness', value: '≥ 0.7 / 0.7' },
          { label: 'Crush resistance', value: 'High-stress grades' },
          { label: 'Packaging', value: 'Bulk pneumatic' },
        ],
        compliance: ['API RP 19C', 'ISO 13503-2'],
      },
      {
        id: 'custom-proppant',
        name: 'Custom Proppant Specifications',
        formula: 'CPS',
        description: 'Bespoke proppant blends and grades engineered to client well specifications — including resin-coated and ceramic alternatives where required.',
        applications: ['Client-specific reservoir programs', 'Resin-coated proppant blends', 'Ceramic proppant supply'],
        specifications: [
          { label: 'Mesh range', value: 'Custom' },
          { label: 'Coating', value: 'Optional resin / ceramic' },
          { label: 'Sourcing', value: 'Pathway development included' },
          { label: 'Logistics', value: 'Field-side coordinated' },
        ],
        compliance: ['API RP 19C', 'ISO 13503-2', 'Custom QA program'],
      },
    ],
  },
  {
    id: 'minerals',
    title: 'INDUSTRIAL MINERALS',
    desc: 'Verified industrial minerals with quality documentation and logistics coordination.',
    products: [
      {
        id: 'silica-sand',
        name: 'Silica Sand',
        formula: 'SiO₂',
        description: 'High purity silica sand sourced for industrial applications including glass manufacturing, foundry operations and construction inputs.',
        applications: ['Glass manufacturing', 'Foundry casting', 'Filtration media', 'Construction aggregate'],
        specifications: [
          { label: 'Purity (SiO₂)', value: '≥ 99.0%' },
          { label: 'Grain size', value: '0.1 – 0.8 mm' },
          { label: 'Moisture', value: '< 0.5%' },
          { label: 'Packaging', value: 'Bulk / 1 MT bags' },
        ],
        compliance: ['ISO 9001', 'REACH registered', 'Australian Workplace standards'],
      },
      {
        id: 'hydrated-lime',
        name: 'Hydrated Lime',
        formula: 'Ca(OH)₂',
        description: 'Calcium hydroxide produced for water treatment, environmental remediation and industrial process applications.',
        applications: ['Water treatment', 'Flue gas desulphurisation', 'Soil stabilisation', 'pH adjustment'],
        specifications: [
          { label: 'Ca(OH)₂ content', value: '≥ 92%' },
          { label: 'Fineness (200 mesh)', value: '≥ 95%' },
          { label: 'Bulk density', value: '0.40 – 0.55 g/cm³' },
          { label: 'Packaging', value: '25 kg bags / Bulk' },
        ],
        compliance: ['AS 1672.1', 'Food grade variant available', 'HSE compliant'],
      },
      {
        id: 'quick-lime',
        name: 'Quicklime',
        formula: 'CaO',
        description: 'Calcium oxide for high-temperature industrial processes, metallurgy, water treatment and chemical manufacturing.',
        applications: ['Steel manufacturing', 'Water treatment', 'Acid neutralisation', 'Soil stabilisation'],
        specifications: [
          { label: 'CaO content', value: '≥ 90%' },
          { label: 'Reactivity', value: 'High / Medium grades' },
          { label: 'Lump size', value: '5 – 40 mm' },
          { label: 'Packaging', value: 'Bulk transport' },
        ],
        compliance: ['ISO 9001', 'Dangerous goods Class 8'],
      },
      {
        id: 'sodium-silicofluoride',
        name: 'Sodium Silicofluoride',
        formula: 'Na₂SiF₆',
        description: 'Sodium fluosilicate for water fluoridation, glass and enamel manufacturing, and industrial fluorination processes.',
        applications: ['Water fluoridation', 'Glass & enamel', 'Timber preservation', 'Industrial fluorination'],
        specifications: [
          { label: 'Purity', value: '≥ 98%' },
          { label: 'Form', value: 'Crystalline powder' },
          { label: 'Packaging', value: '25 kg bags' },
          { label: 'Handling', value: 'Controlled / regulated' },
        ],
        compliance: ['AS/NZS standards', 'Dangerous goods compliant'],
      },
      {
        id: 'activated-carbon',
        name: 'Activated Carbon',
        formula: 'C',
        description: 'High surface area carbon for purification, filtration and adsorption applications across industries.',
        applications: ['Water purification', 'Gas treatment', 'Gold recovery', 'Air filtration'],
        specifications: [
          { label: 'Surface area', value: '900 – 1200 m²/g' },
          { label: 'Iodine number', value: '≥ 1000 mg/g' },
          { label: 'Moisture', value: '< 5%' },
          { label: 'Form', value: 'Granular / Powder' },
        ],
        compliance: ['NSF certified options', 'Food grade available'],
      },
      {
        id: 'agricultural-lime',
        name: 'Agricultural Lime',
        formula: 'CaCO₃',
        description: 'Calcium carbonate-based agricultural lime for soil pH correction, calcium supply, and yield optimisation in broadacre farming.',
        applications: ['Soil pH correction', 'Pasture improvement', 'Broadacre cropping', 'Calcium supplementation'],
        specifications: [
          { label: 'CaCO₃ content', value: '≥ 90%' },
          { label: 'Neutralising value', value: '≥ 95%' },
          { label: 'Moisture', value: '< 2%' },
          { label: 'Packaging', value: 'Bulk delivery' },
        ],
        compliance: ['AS 4454', 'Approved agricultural input'],
      },
      {
        id: 'aggregates',
        name: 'Aggregates',
        formula: 'AGG',
        description: 'Quality-controlled construction aggregates for civil infrastructure, concrete production and large-scale building programs.',
        applications: ['Concrete production', 'Road base', 'Civil infrastructure', 'Drainage'],
        specifications: [
          { label: 'Grading', value: 'Per client specification' },
          { label: 'Source', value: 'Quarried & screened' },
          { label: 'Quality', value: 'AS 2758 compliant' },
          { label: 'Supply', value: 'Bulk haulage' },
        ],
        compliance: ['AS 2758', 'Civil engineering grade'],
      },
      {
        id: 'crushed-rock',
        name: 'Crushed Rock',
        formula: 'CR',
        description: 'Sized crushed rock supply for road construction, drainage layers and structural fill applications.',
        applications: ['Road construction', 'Structural fill', 'Drainage layers', 'Civil works'],
        specifications: [
          { label: 'Size range', value: '5 – 65 mm grades' },
          { label: 'Density', value: '1.4 – 1.8 t/m³' },
          { label: 'Classification', value: 'AS 2758.2' },
          { label: 'Supply', value: 'Bulk haulage' },
        ],
        compliance: ['AS 2758.2', 'Geotechnical certified'],
      },
    ],
  },
  {
    id: 'ag-inputs',
    title: 'AGRICULTURAL INPUTS & FERTILIZERS',
    desc: 'Advanced crop nutrition, fertilizers, and agricultural inputs for large-scale operations.',
    products: [
      {
        id: 'nano-urea',
        name: 'Nano Urea',
        formula: 'N₂H₄CO',
        description: 'Liquid nano-urea formulation for foliar application — improved nitrogen use efficiency and reduced environmental footprint.',
        applications: ['Foliar nutrition', 'Precision agriculture', 'Sustainable farming'],
        specifications: [
          { label: 'Nitrogen content', value: '4% (w/v)' },
          { label: 'Particle size', value: '< 100 nm' },
          { label: 'Application rate', value: '2 – 4 mL/L water' },
          { label: 'Pack size', value: '500 mL bottles' },
        ],
        compliance: ['Approved fertiliser', 'Environmental safety assessed'],
      },
      {
        id: 'nano-dap',
        name: 'Nano DAP',
        formula: 'Nano',
        description: 'Nanoscale diammonium phosphate for efficient delivery of nitrogen and phosphorus nutrients to crops.',
        applications: ['Soil & foliar application', 'Cereal crops', 'High-value horticulture'],
        specifications: [
          { label: 'N content', value: '8.0%' },
          { label: 'P₂O₅ content', value: '16.0%' },
          { label: 'Particle size', value: '< 100 nm' },
          { label: 'Pack size', value: '500 mL / 1 L' },
        ],
        compliance: ['Fertiliser registration', 'Toxicity tested'],
      },
      {
        id: 'advanced-tech',
        name: 'Advanced New Technologies',
        formula: 'ANT',
        description: 'Next-generation crop nutrition technologies including controlled-release and biostimulant inputs for precision agriculture.',
        applications: ['Precision agriculture', 'Sustainable farming', 'High-value horticulture'],
        specifications: [
          { label: 'Product types', value: 'Controlled-release, biostimulants' },
          { label: 'Application', value: 'Variable rate compatible' },
          { label: 'Sourcing', value: 'Curated technology partners' },
          { label: 'Pack size', value: 'Per crop program' },
        ],
        compliance: ['Registered for agricultural use', 'Environmental assessed'],
      },
      {
        id: 'dap',
        name: 'DAP',
        formula: 'DAP',
        description: 'Diammonium phosphate fertiliser — high analysis source of nitrogen and phosphorus for broadacre cropping.',
        applications: ['Cereal crops', 'Oilseeds', 'Pulses', 'Pasture establishment'],
        specifications: [
          { label: 'N content', value: '18%' },
          { label: 'P content', value: '20%' },
          { label: 'Granule size', value: '2 – 4 mm' },
          { label: 'Packaging', value: '1 MT bags / Bulk' },
        ],
        compliance: ['Fertiliser standards', 'Quality assured'],
      },
      {
        id: 'map',
        name: 'MAP',
        formula: 'MAP',
        description: 'Monoammonium phosphate fertiliser — high phosphorus content with lower nitrogen for starter applications.',
        applications: ['Crop establishment', 'Starter fertiliser', 'Acidic soil applications'],
        specifications: [
          { label: 'N content', value: '11%' },
          { label: 'P content', value: '22%' },
          { label: 'Form', value: 'Granular' },
          { label: 'Packaging', value: '1 MT bags / Bulk' },
        ],
        compliance: ['Fertiliser standards', 'Quality assured'],
      },
      {
        id: 'urea',
        name: 'Urea',
        formula: 'CO(NH₂)₂',
        description: 'Granular urea — concentrated nitrogen fertiliser for broadacre cropping, pasture and side-dress applications.',
        applications: ['Cereal nitrogen', 'Pasture fertilising', 'Side-dressing', 'Topdressing'],
        specifications: [
          { label: 'N content', value: '46%' },
          { label: 'Form', value: 'Prilled / Granular' },
          { label: 'Biuret', value: '< 1.0%' },
          { label: 'Packaging', value: 'Bulk / 1 MT bags' },
        ],
        compliance: ['Fertiliser standards', 'Quality assured'],
      },
      {
        id: 'npk',
        name: 'NPK Blends',
        formula: 'NPK',
        description: 'Custom-blended NPK fertilisers tailored to crop and soil requirements with optional micronutrient inclusion.',
        applications: ['Custom crop programs', 'Horticulture', 'Broadacre cropping'],
        specifications: [
          { label: 'Ratios', value: 'Custom blended' },
          { label: 'Form', value: 'Granular' },
          { label: 'Inclusions', value: 'Optional micronutrients' },
          { label: 'Packaging', value: '1 MT bags / Bulk' },
        ],
        compliance: ['Fertiliser standards', 'Blended to specification'],
      },
      {
        id: 'micronutrients',
        name: 'Micronutrients',
        formula: 'µ',
        description: 'Targeted micronutrient products — zinc, boron, manganese and iron — for correcting soil and crop deficiencies.',
        applications: ['Deficiency correction', 'Foliar application', 'Specialty crops'],
        specifications: [
          { label: 'Nutrients', value: 'Zn, B, Mn, Fe, Cu' },
          { label: 'Form', value: 'Granular / Liquid' },
          { label: 'Application', value: 'Soil or foliar' },
          { label: 'Pack size', value: 'Per program' },
        ],
        compliance: ['Agricultural input registered'],
      },
      {
        id: 'soil-conditioners',
        name: 'Soil Conditioners',
        formula: 'SC',
        description: 'Soil conditioning products including gypsum, organic amendments and biochar for soil structure and chemistry improvement.',
        applications: ['Soil structure improvement', 'Sodic soil management', 'Carbon retention'],
        specifications: [
          { label: 'Products', value: 'Gypsum, organic, biochar' },
          { label: 'Form', value: 'Granular / Bulk' },
          { label: 'Application', value: 'Soil incorporation' },
          { label: 'Packaging', value: 'Bulk / 1 MT bags' },
        ],
        compliance: ['Agricultural input certified'],
      },
    ],
  },
  {
    id: 'chemicals',
    title: 'CHEMICALS & REAGENTS',
    desc: 'Industrial chemicals, mining reagents, and specialty products with compliant documentation and logistics.',
    products: [
      {
        id: 'industrial-chemicals',
        name: 'Industrial Chemicals',
        formula: 'IC',
        description: 'Bulk industrial chemicals across acids, bases, solvents and process inputs sourced with full documentation and SDS compliance.',
        applications: ['Process manufacturing', 'Cleaning agents', 'Industrial processes'],
        specifications: [
          { label: 'Product range', value: 'Acids, bases, solvents' },
          { label: 'Grades', value: 'Industrial / Technical' },
          { label: 'Supply', value: 'Drum / IBC / Bulk' },
          { label: 'Documentation', value: 'Full SDS package' },
        ],
        compliance: ['REACH', 'SDS compliant', 'Dangerous goods certified'],
      },
      {
        id: 'mining-reagents',
        name: 'Mining Reagents',
        formula: 'MR',
        description: 'Flotation reagents, collectors, depressants and frothers for mineral processing across base and precious metal operations.',
        applications: ['Mineral flotation', 'Leaching processes', 'Tailings management'],
        specifications: [
          { label: 'Reagent types', value: 'Collectors, frothers, modifiers' },
          { label: 'Form', value: 'Liquid / Granular' },
          { label: 'Supply', value: 'IBC / Drum / Bulk' },
          { label: 'Sourcing', value: 'Specification-matched' },
        ],
        compliance: ['HSE compliant', 'Mining sector approved'],
      },
      {
        id: 'water-treatment',
        name: 'Water Treatment Chemicals',
        formula: 'WTC',
        description: 'Coagulants, flocculants, pH adjusters and disinfectants for municipal, industrial and mine site water treatment applications.',
        applications: ['Municipal water', 'Industrial process water', 'Mine site water', 'Wastewater treatment'],
        specifications: [
          { label: 'Categories', value: 'Coagulants, flocculants, pH' },
          { label: 'Standards', value: 'NSF / Drinking water grade' },
          { label: 'Supply', value: 'Drum / Bulk' },
          { label: 'Documentation', value: 'Compliance certificates' },
        ],
        compliance: ['NSF certified options', 'AS/NZS 4020'],
      },
      {
        id: 'specialty-products',
        name: 'Specialty Industrial Products',
        formula: 'SIP',
        description: 'Specialty chemicals and process inputs sourced for niche industrial applications with custom supply pathways.',
        applications: ['Specialty manufacturing', 'Pharmaceutical inputs', 'Niche industrial processes'],
        specifications: [
          { label: 'Sourcing', value: 'Custom pathway' },
          { label: 'Documentation', value: 'Full QA & compliance' },
          { label: 'Supply', value: 'Per requirement' },
          { label: 'Lead time', value: 'Project-specific' },
        ],
        compliance: ['QA tracked', 'Application-specific certified'],
      },
    ],
  },
  {
    id: 'bulk',
    title: 'BULK COMMODITIES',
    desc: 'Bulk commodity supply with domestic and international trade pathway coordination.',
    products: [
      {
        id: 'bulk-supply',
        name: 'Bulk Commodity Supply',
        formula: 'BCS',
        description: 'Large-volume commodity supply across grains, minerals and industrial inputs — coordinated with freight and trade documentation.',
        applications: ['Industrial consumers', 'Trading houses', 'Manufacturers', 'Government tenders'],
        specifications: [
          { label: 'Volume', value: 'Container to vessel load' },
          { label: 'Commodities', value: 'Grains, minerals, inputs' },
          { label: 'Quality', value: 'Origin-certified' },
          { label: 'Documentation', value: 'Full trade package' },
        ],
        compliance: ['Origin certification', 'Quality assured', 'Customs ready'],
      },
      {
        id: 'containerized',
        name: 'Containerized Movement',
        formula: 'CTR',
        description: 'Containerised commodity movement with consolidated freight, customs handling and last-mile delivery coordination.',
        applications: ['FCL & LCL movements', 'Multi-modal transport', 'Cross-border container freight'],
        specifications: [
          { label: 'Container types', value: '20ft / 40ft / Reefer / Open-top' },
          { label: 'Modes', value: 'Sea / Road / Rail' },
          { label: 'Routing', value: 'Port-to-door' },
          { label: 'Tracking', value: 'Shipment visibility' },
        ],
        compliance: ['IMDG compliant', 'Customs documentation'],
      },
      {
        id: 'domestic-pathways',
        name: 'Domestic Supply Pathways',
        formula: 'DSP',
        description: 'Australian domestic supply coordination — connecting producers, processors and end-users across the country with logistics oversight.',
        applications: ['Inter-state supply', 'Australian manufacturers', 'Domestic processors'],
        specifications: [
          { label: 'Coverage', value: 'Nationwide' },
          { label: 'Modes', value: 'Road / Rail' },
          { label: 'Coordination', value: 'Single point of contact' },
          { label: 'Documentation', value: 'Chain of Responsibility' },
        ],
        compliance: ['Chain of Responsibility', 'HSE compliant'],
      },
      {
        id: 'international-pathways',
        name: 'International Trade Pathways',
        formula: 'ITP',
        description: 'Cross-border trade execution between Australia, India, and partner markets — including documentation, finance instruments and customs.',
        applications: ['Import / Export programs', 'Cross-border commodity trade', 'Letter of credit transactions'],
        specifications: [
          { label: 'Corridors', value: 'AU · IN · ASEAN · ME' },
          { label: 'Instruments', value: 'LC / Open account' },
          { label: 'Documentation', value: 'Full trade pack' },
          { label: 'Customs', value: 'End-to-end coordinated' },
        ],
        compliance: ['Customs / Trade certified', 'Incoterms aligned'],
      },
    ],
  },
];

// Display order: Fracs → Chemicals → Industrial Minerals → Agricultural → Bulk
const CATEGORY_ORDER = ['fracs', 'chemicals', 'minerals', 'ag-inputs', 'bulk'];
const ORDERED_CATALOGUE = CATEGORY_ORDER
  .map((id) => CATALOGUE.find((c) => c.id === id))
  .filter((c): c is Category => Boolean(c));

export default function Products() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });
  const [selected, setSelected] = useState<ProductDetail | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('');

  const openProduct = (p: ProductDetail, catTitle: string) => {
    setSelected(p);
    setSelectedCat(catTitle);
  };

  return (
    <section id="products" className="section cream" ref={ref}>
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
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">PRODUCTS & MATERIALS</span>
            <h2 className="h1" style={{ marginTop: 22 }}>
              A GROWING CATALOGUE OF<br />
              <span style={{ color: 'var(--river)' }}>TRACEABLE MATERIALS</span>
            </h2>
          </div>
          <p className="body" style={{ maxWidth: 380 }}>
            Industrial minerals, fertilisers, reagents, bulk commodities and proppants — each backed by
            specifications, compliance information and document control.
          </p>
        </motion.div>

        {/* Category boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ORDERED_CATALOGUE.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 + ci * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                padding: '24px 26px 22px',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--line-2)';
                e.currentTarget.style.boxShadow = '0 18px 40px -28px rgba(14,85,96,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                gap: 24, marginBottom: 16, flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: 16, fontWeight: 600, letterSpacing: '-0.005em',
                    color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2,
                  }}>
                    {cat.title}
                  </h3>
                  <p style={{
                    fontSize: 13, color: 'var(--muted)',
                    lineHeight: 1.55, maxWidth: 620,
                  }}>
                    {cat.desc}
                  </p>
                </div>
                <span className="mono" style={{
                  fontSize: 10, color: 'var(--muted-2)', letterSpacing: '0.1em',
                  whiteSpace: 'nowrap', paddingTop: 6,
                }}>
                  {String(ci + 1).padStart(2, '0')} / {String(CATALOGUE.length).padStart(2, '0')}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--line)', marginBottom: 16 }} />

              {/* Product buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.products.map((prod) => (
                  <button
                    key={prod.id}
                    /* Product detail modal temporarily disabled — clicking does nothing for now.
                       Re-enable by restoring: onClick={() => openProduct(prod, cat.title)} */
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '8px 14px',
                      borderRadius: 999,
                      border: '1px solid var(--line-2)',
                      background: 'var(--paper)',
                      color: 'var(--ink-soft)',
                      fontSize: 12.5, fontWeight: 500,
                      transition: 'all 0.25s',
                      cursor: 'pointer',
                      letterSpacing: '0.01em',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--ink)';
                      e.currentTarget.style.borderColor = 'var(--ink)';
                      e.currentTarget.style.color = 'var(--paper)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--paper)';
                      e.currentTarget.style.borderColor = 'var(--line-2)';
                      e.currentTarget.style.color = 'var(--ink-soft)';
                    }}
                  >
                    {prod.name}
                    <ArrowUpRight size={12} strokeWidth={1.8} style={{ opacity: 0.6 }} />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sourcing request box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 18,
            padding: '24px 26px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(14,85,96,0.06), rgba(14,85,96,0.01))',
            border: '1px solid rgba(14,85,96,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20,
          }}
        >
          <div>
            <div style={{
              fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.18em',
              color: 'var(--river)', fontWeight: 600, marginBottom: 8,
            }}>
              CUSTOM SOURCING
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 540, lineHeight: 1.55 }}>
              Need a material not listed? Our sourcing team maintains an extended portfolio.
              Contact us with your requirements.
            </p>
          </div>
          <a href="#contact" className="btn" style={{ whiteSpace: 'nowrap' }}>
            Request sourcing discussion <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>

      {/* Detail modal — TEMPORARILY DISABLED (do not delete). Restore this block to re-enable product pages.
      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        width={820}
        closable={false}
        centered
        styles={{
          body: { padding: 0 },
          mask: { background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)' },
        }}
      >
        {selected && (
          <ProductDetailPanel
            product={selected}
            catTitle={selectedCat}
            onClose={() => setSelected(null)}
          />
        )}
      </Modal>
      */}
    </section>
  );
}

function ProductDetailPanel({
  product, catTitle, onClose,
}: { product: ProductDetail; catTitle: string; onClose: () => void }) {
  const formula = product.formula || product.name.slice(0, 2).toUpperCase();

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', position: 'relative' }}>
      {/* Top band */}
      <div style={{
        padding: '14px 28px', background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
      }}>
        <span>River Global · Product Specification</span>
        <span className="mono" style={{ letterSpacing: '0.1em' }}>
          RG-{product.id.toUpperCase().replace(/-/g, '').slice(0, 6)}-001
        </span>
      </div>

      {/* Header */}
      <div style={{
        padding: '28px 28px 24px', borderBottom: '1px solid var(--line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20,
      }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{
            minWidth: 62, height: 62, padding: '0 12px', borderRadius: 12,
            background: 'var(--ink)', color: 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace',
            flexShrink: 0,
          }}>
            {formula}
          </div>
          <div>
            <div style={{
              fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase',
              letterSpacing: '0.14em', marginBottom: 6, fontWeight: 600,
            }}>
              {catTitle}
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.022em', marginBottom: 4, lineHeight: 1.1 }}>
              {product.name}
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--river)', marginLeft: 2 }}>.</span>
            </h3>
            <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>
              Reviewed 05/2026 · Document control active
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: '1px solid var(--line)',
            width: 38, height: 38, borderRadius: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
          <div>
            <SectionLabel>Applications</SectionLabel>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, padding: 0, margin: 0 }}>
              {product.applications.map((app) => (
                <li key={app} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5 }}>
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
                <div key={spec.label} style={{
                  display: 'flex', justifyContent: 'space-between', padding: '9px 0',
                  borderBottom: i < product.specifications.length - 1 ? '1px solid var(--line)' : 'none',
                  fontSize: 12.5,
                }}>
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
              <span key={c} style={{
                fontSize: 11.5, padding: '6px 12px', borderRadius: 999,
                border: '1px solid var(--line-2)', background: 'var(--paper-2)',
                fontWeight: 500,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '18px 28px', borderTop: '1px solid var(--line)',
        background: 'var(--paper-2)', display: 'flex', gap: 12, flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'flex-end',
      }}>
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
    <div style={{
      fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.16em',
      color: 'var(--muted)', fontWeight: 600, marginBottom: 12,
    }}>
      {children}
    </div>
  );
}

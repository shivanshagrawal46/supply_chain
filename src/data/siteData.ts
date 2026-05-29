import {
  Layers, Truck, Globe2, Ship, ShieldCheck,
  Wheat, Mountain, Flame, HardHat, Factory, HeartPulse,
  Users, Handshake, TrendingUp, Scale, Sparkles, Leaf, FileCheck,
} from 'lucide-react';

export const navLinks = [
  { label: 'Who we are', href: '#who' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Industries', href: '#industries' },
  { label: 'Products', href: '#products' },
  { label: 'Network', href: '#network' },
  { label: 'Contact', href: '#contact' },
];

export const heroMetrics = [
  { value: '11+', label: 'Countries served' },
  { value: '6', label: 'Industry sectors' },
  { value: '25+', label: 'Supply routes' },
  { value: 'AU · IN', label: 'Operational base' },
];

export const capabilities = [
  {
    id: 'integrated-supply',
    icon: Layers,
    title: 'Integrated Supply',
    description: 'End-to-end sourcing and procurement across raw materials, industrial inputs and bulk commodities — coordinated under a single accountable point of contact.',
    points: ['Vendor qualification', 'Quality assurance', 'Inventory planning'],
  },
  {
    id: 'logistics-coordination',
    icon: Truck,
    title: 'Logistics Coordination',
    description: 'Multi-modal movement of freight optimised for cost, time and compliance — combining road, rail and intermodal options.',
    points: ['Route planning', 'Carrier management', 'Last-mile execution'],
  },
  {
    id: 'freight-coordination',
    icon: Ship,
    title: 'Freight Coordination',
    description: 'Sea and air freight management with documentation control, customs handling and port-side operations for both inbound and outbound flows.',
    points: ['Ocean & air freight', 'Customs clearance', 'Port operations'],
  },
  {
    id: 'international-trade',
    icon: Globe2,
    title: 'International Trade',
    description: 'Cross-border trade execution between Australia, India and partner markets — handling contracts, finance instruments and compliance.',
    points: ['Trade finance', 'Documentation', 'Cross-border compliance'],
  },
  {
    id: 'operational-assurance',
    icon: ShieldCheck,
    title: 'Operational Assurance',
    description: 'Chain of Responsibility ownership across the movement — safe loading, weight compliance, documentation control and trained execution.',
    points: ['Chain of Responsibility', 'HSE compliance', 'Documentation control'],
  },
];

export const industries = [
  { id: 'agriculture', icon: Wheat, title: 'Agriculture', tag: 'Fertilisers · Inputs', description: 'Fertilisers, soil amendments and nano-nutrient inputs to support large-scale agricultural operations.' },
  { id: 'mining', icon: Mountain, title: 'Mining', tag: 'Reagents · Minerals', description: 'Industrial minerals, reagents and bulk inputs for mineral processing and resource extraction.' },
  { id: 'energy', icon: Flame, title: 'Energy & Oil/Gas', tag: 'Process chemicals', description: 'Process chemicals, gases and specialised inputs for upstream and downstream energy operations.' },
  { id: 'infrastructure', icon: HardHat, title: 'Infrastructure', tag: 'Construction · Civil', description: 'Materials and coordination for large infrastructure programs and civil construction projects.' },
  { id: 'manufacturing', icon: Factory, title: 'Manufacturing', tag: 'Industrial inputs', description: 'Continuous flow of industrial inputs supporting production lines and manufacturing operations.' },
  { id: 'medical', icon: HeartPulse, title: 'Medical & Pharma', tag: 'Gases · Reagents', description: 'Specialty gases, reagents and compliant materials for medical and pharmaceutical applications.' },
];

export interface Product {
  id: string;
  name: string;
  category: string;
  formula?: string;
  description: string;
  applications: string[];
  specifications: { label: string; value: string }[];
  compliance: string[];
}

export const productCategories = [
  { id: 'industrial-minerals', label: 'Industrial Minerals' },
  { id: 'fertilisers', label: 'Fertilisers' },
  { id: 'chemicals', label: 'Chemicals & Reagents' },
  { id: 'bulk-commodities', label: 'Bulk Commodities' },
  { id: 'gases', label: 'Industrial & Medical Gases' },
];

export const products: Product[] = [
  {
    id: 'silica-sand',
    name: 'Silica Sand',
    category: 'industrial-minerals',
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
    category: 'industrial-minerals',
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
    name: 'Quick Lime',
    category: 'industrial-minerals',
    formula: 'CaO',
    description: 'Calcium oxide for high-temperature industrial processes, metallurgy and chemical manufacturing.',
    applications: ['Steel manufacturing', 'Pulp & paper', 'Sugar refining', 'Acid neutralisation'],
    specifications: [
      { label: 'CaO content', value: '≥ 90%' },
      { label: 'Reactivity', value: 'High / Medium grades' },
      { label: 'Lump size', value: '5 – 40 mm' },
      { label: 'Packaging', value: 'Bulk transport' },
    ],
    compliance: ['ISO 9001', 'Dangerous goods Class 8'],
  },
  {
    id: 'activated-carbon',
    name: 'Activated Carbon',
    category: 'industrial-minerals',
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
    id: 'nano-urea',
    name: 'Nano Urea',
    category: 'fertilisers',
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
    category: 'fertilisers',
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
    id: 'dap',
    name: 'DAP',
    category: 'fertilisers',
    formula: '(NH₄)₂HPO₄',
    description: 'Diammonium Phosphate — globally recognised macronutrient fertiliser with high nutrient content.',
    applications: ['Broadacre cropping', 'Pasture establishment', 'Soil enrichment'],
    specifications: [
      { label: 'N content', value: '18%' },
      { label: 'P₂O₅ content', value: '46%' },
      { label: 'Granule size', value: '2 – 4 mm' },
      { label: 'Packaging', value: 'Bulk / 50 kg bags' },
    ],
    compliance: ['IFA quality standards', 'AS standards'],
  },
  {
    id: 'map',
    name: 'MAP',
    category: 'fertilisers',
    formula: 'NH₄H₂PO₄',
    description: 'Monoammonium Phosphate — highly soluble phosphorus source ideal for fertigation and starter applications.',
    applications: ['Fertigation systems', 'Starter fertiliser', 'Horticulture'],
    specifications: [
      { label: 'N content', value: '11%' },
      { label: 'P₂O₅ content', value: '52%' },
      { label: 'Solubility', value: '100% water soluble' },
      { label: 'Packaging', value: 'Bulk / 25 kg bags' },
    ],
    compliance: ['Greenhouse certified', 'IFA standards'],
  },
  {
    id: 'granular-urea',
    name: 'Granular Urea',
    category: 'fertilisers',
    formula: 'CO(NH₂)₂',
    description: 'High-nitrogen granular urea — the most widely used nitrogen fertiliser globally for broadacre cropping.',
    applications: ['Broadacre cropping', 'Pasture', 'Sugarcane', 'Industrial use'],
    specifications: [
      { label: 'N content', value: '46%' },
      { label: 'Biuret', value: '< 1.0%' },
      { label: 'Granule size', value: '2 – 4 mm' },
      { label: 'Packaging', value: 'Bulk / 50 kg bags' },
    ],
    compliance: ['IFA standards', 'Coated variants available'],
  },
  {
    id: 'nitrogen',
    name: 'Nitrogen Gas',
    category: 'gases',
    formula: 'N₂',
    description: 'High purity nitrogen for inerting, pressurisation, food packaging and industrial process applications.',
    applications: ['Inerting & purging', 'Food packaging', 'Electronics manufacturing', 'Heat treatment'],
    specifications: [
      { label: 'Purity', value: '99.99% – 99.999%' },
      { label: 'Supply', value: 'Cylinder / Bulk liquid' },
      { label: 'Pressure', value: '200 / 300 bar cylinders' },
      { label: 'Variants', value: 'Industrial / Food / Medical' },
    ],
    compliance: ['ISO 9001', 'TGA approved (medical)'],
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    category: 'gases',
    formula: 'CO₂',
    description: 'CO₂ supply for beverage carbonation, food preservation, welding shielding and industrial applications.',
    applications: ['Beverage industry', 'Food preservation', 'Welding shield gas', 'pH control'],
    specifications: [
      { label: 'Purity', value: '≥ 99.9%' },
      { label: 'Form', value: 'Liquid / Gas / Solid (dry ice)' },
      { label: 'Supply', value: 'Cylinder / Bulk tanker' },
      { label: 'Variants', value: 'Industrial / Food / Medical' },
    ],
    compliance: ['ISBT beverage grade', 'Food grade certified'],
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    category: 'gases',
    formula: 'O₂',
    description: 'Industrial and medical oxygen for steelmaking, healthcare, welding and life-support applications.',
    applications: ['Medical use', 'Steelmaking', 'Welding & cutting', 'Wastewater treatment'],
    specifications: [
      { label: 'Purity', value: '99.5% – 99.999%' },
      { label: 'Supply', value: 'Cylinder / Bulk liquid' },
      { label: 'Grades', value: 'Industrial / Medical / USP' },
      { label: 'Packaging', value: 'Various cylinder sizes' },
    ],
    compliance: ['TGA approved (medical)', 'USP / EP standards'],
  },
];

export const networkLocations = [
  { region: 'Australia', cities: ['Sydney', 'Melbourne', 'Perth', 'Brisbane'], type: 'Primary operations' },
  { region: 'India', cities: ['Mumbai', 'Chennai', 'Kandla', 'Gujarat'], type: 'Operational support' },
  { region: 'Asia Pacific', cities: ['Singapore', 'Jakarta', 'Manila'], type: 'Partner network' },
  { region: 'Middle East', cities: ['Dubai', 'Jebel Ali', 'Dammam'], type: 'Trade corridor' },
];

export const whyRiverPoints = [
  { title: 'Integrated Flexibility', body: 'Sourcing, freight and trade execution under one accountable team. No hand-offs between disconnected vendors.' },
  { title: 'Commercial Clarity', body: 'Transparent pricing structures, clean documentation, and contracts written in plain English. No surprises.' },
  { title: 'Global Execution Confidence', body: 'Australian operational discipline combined with on-the-ground Indian capability — delivery you can trust.' },
  { title: 'Operational Assurance', body: 'Chain of Responsibility ownership, HSE compliance and documentation control built into every movement.' },
];

export const fragmentedRisks = [
  'Accountability gaps between vendors',
  'Coordination failures across hand-offs',
  'Compliance exposure on shared movements',
  'Documentation breakdowns',
  'Delivery and timing uncertainty',
  'Execution risk in critical routes',
];

export const values = [
  { icon: Users, name: 'Customer Focus', body: 'Built around the operational reality of our customers — not generic playbooks.' },
  { icon: Handshake, name: 'Teamwork', body: 'Coordinated effort across geographies, vendors and disciplines.' },
  { icon: TrendingUp, name: 'Progress', body: 'Continual refinement of how we source, move and deliver.' },
  { icon: Scale, name: 'Accountability', body: 'Owning the full Chain of Responsibility across every shipment.' },
  { icon: Sparkles, name: 'Integrity', body: 'Clean documentation, clear contracts, no hidden margins.' },
  { icon: ShieldCheck, name: 'Safety', body: 'Safe loading, weight compliance, trained execution at every step.' },
  { icon: Leaf, name: 'Environment', body: 'Responsibly sourced, efficiently moved — minimising waste and footprint.' },
  { icon: FileCheck, name: 'Compliance', body: 'Documentation control, HSE policy and review framework as standard.' },
];

export const leadership = [
  {
    name: 'Raji Krishnan',
    role: 'Managing Director',
    location: 'Sydney, Australia',
    initials: 'RK',
    note: 'Operational leadership across integrated supply, logistics and international trade. Responsible for execution discipline and compliance.',
  },
  {
    name: 'Operations Lead',
    role: 'Head of Logistics',
    location: 'Melbourne, Australia',
    initials: 'OL',
    note: 'End-to-end coordination of freight, route planning and Chain of Responsibility ownership across Australian movements.',
  },
  {
    name: 'India Operations',
    role: 'Head — India Support',
    location: 'Mumbai, India',
    initials: 'IO',
    note: 'Vendor qualification, documentation control and cross-border execution between India and Australian operations.',
  },
  {
    name: 'Trade & Compliance',
    role: 'Head of Trade Execution',
    location: 'Sydney, Australia',
    initials: 'TC',
    note: 'International contracts, customs documentation and trade finance instruments across partner markets.',
  },
];

export const supplyMotionFrames = [
  { stage: 'Source', body: 'Qualified vendors, verified quality, documented at origin.' },
  { stage: 'Load', body: 'Safe loading, weight compliance, Chain of Responsibility ownership.' },
  { stage: 'Move', body: 'Multi-modal coordination across road, rail, sea and air.' },
  { stage: 'Warehouse', body: 'Controlled storage, inventory accuracy, regulated handling.' },
  { stage: 'Deliver', body: 'Last-mile execution into customer operations on the agreed schedule.' },
];

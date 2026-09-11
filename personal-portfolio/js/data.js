// Content data for the portfolio. Kept separate from rendering logic in main.js.

const EXPERIENCE = [
  { dates: '2025 — Present', company: 'ThermEx International NV', role: 'Senior Mechanical Design Engineer', location: 'Antwerp, Belgium', description: 'High-performance heating jackets and non-intrusive clamping systems (ASME/PED), advanced sheet metal for complex geometries. iLogic-driven configuration for a highly repetitive, variant-driven product line.' },
  { dates: '2023 — 2025', company: 'WTEenergy', role: 'Senior Mechanical Design Engineer', location: 'Barcelona, Spain', description: 'Detailed design of gasifiers, syngas coolers and pressure vessels for Waste-to-Energy plants; FEA & CFD; on-site supervision in Switzerland and France; fabrication drawings (IFC/AFC). Parametric templates and rule-driven sheet metal for complex weldments.' },
  { dates: '2022 — 2023', company: 'Technip', role: 'Rotating Equipment & Package Engineer', location: 'Barcelona, Spain', description: 'Technical Bid Tabulation (TBT), rotating-equipment specification and evaluation, P&ID review, VDR approval, interdisciplinary coordination for an oil & gas package.' },
  { dates: '2016 — 2022', company: 'SECCO S.A.', role: 'Senior Mechanical Design Engineer', location: 'Rosario, Argentina', description: 'Compressors, manifolds, coalescing filters and launcher traps; pressure vessels and piping under ASME. SAP ERP and Vault PDM power user. iLogic configurators and Vault-based reuse for recurring equipment families.' }
];

const PROJECTS = [
  {
    tag: 'WTEenergy · GCPV Monjos',
    title: 'GASIFIER G-400',
    subtitle: 'DWG 23532-233-501 · REV 1',
    dwgNo: '233-501',
    discipline: 'PRESSURE EQUIPMENT',
    pdf: 'assets/drawings/gasifier-g400.pdf',
    photo: 'assets/photos/gasifier.png',
    desc: 'Fluidised-bed gasifier converting CDR waste-derived fuel into syngas. Refractory-lined shell with 40+ instrumented penetrations mapped by elevation and azimuth for bed-temperature and pressure profiling.',
    specs: [
      { k: 'Syngas outlet', v: 'DN1600 PN10' },
      { k: 'Weight', v: '18 t empty / 82.8 t lined' },
      { k: 'Materials', v: 'EN 1.4835 / 1.4307' }
    ]
  },
  {
    tag: 'WTEenergy · GCPV Monjos',
    title: 'HEAT EXCHANGERS',
    subtitle: 'E-811 SYNGAS / E-812 AIR · 233-503',
    dwgNo: '233-503',
    discipline: 'HEAT TRANSFER',
    pdf: 'assets/drawings/heat-exchangers-e811-e812.pdf',
    photo: 'assets/photos/heat-exchangers.jpeg',
    desc: 'Twin syngas and combustion-air exchangers joined by a flexible connection duct, recovering syngas heat to preheat gasification air. Perforated internal plates distribute flow across the bundle.',
    specs: [
      { k: 'Overall height', v: '8 927 mm' },
      { k: 'Weight', v: '≈ 7 000 kg' },
      { k: 'Material', v: 'S235JR carbon steel' }
    ]
  },
  {
    tag: 'WTEenergy · GCPV Monjos',
    title: 'CDR HOPPER',
    subtitle: 'M341-04-65 · DWG 23532-233-510',
    dwgNo: '233-510',
    discipline: 'BULK HANDLING',
    pdf: 'assets/drawings/cdr-hopper.pdf',
    photo: 'assets/photos/cdr-hopper.png',
    desc: 'Insulated stainless feed hopper with a vibration motor to prevent bridging of waste-derived fuel. Fully jacketed in 100 mm rock wool under aluminium cladding, with a DN600 inspection manhole.',
    specs: [
      { k: 'Empty weight', v: '1 875 kg' },
      { k: 'Vibration motor', v: 'MVE 100-3 AP214' },
      { k: 'Material', v: 'AISI 304 · 6 mm' }
    ]
  },
  {
    tag: 'AKIOLIS · Biomass Cogeneration',
    title: 'AIR DUCT X-201',
    subtitle: 'TO SYNGAS BURNER · 23526-233-194 R5',
    dwgNo: '233-194',
    discipline: 'DUCTING',
    pdf: 'assets/drawings/air-duct-x201.pdf',
    photo: 'assets/photos/air-duct.png',
    desc: 'Hot combustion-air ducting to the syngas burner, split into eight shop spools for transport and site bolt-up. High-temperature AISI 310S at the burner end, stepping down through eccentric reducers DN1200 to DN400.',
    specs: [
      { k: 'Weight', v: '≈ 5 200 kg' },
      { k: 'Insulation', v: '70 mm rock wool + Al' },
      { k: 'Materials', v: 'AISI 310S / 304L' }
    ]
  },
  {
    tag: 'AKIOLIS · Biomass Cogeneration',
    title: 'BURNER STRUCTURE',
    subtitle: 'ACCESS PLATFORMS · 23526-223-101 R1',
    dwgNo: '223-101',
    discipline: 'STRUCTURAL',
    pdf: 'assets/drawings/burner-structure.pdf',
    photo: 'assets/photos/burner-structure.png',
    desc: 'Steel access structure over the syngas burner: upper platform, lateral frames, grating, guardrails and a caged vertical ladder, plus davit support profiles for maintenance lifting.',
    specs: [
      { k: 'Main profiles', v: 'IPN 200 / IPN 140' },
      { k: 'Coating', v: 'C3 per ISO 12944' },
      { k: 'Scope', v: '7 fabricated sub-assemblies' }
    ]
  },
  {
    tag: 'SECCO · YPF Puente Gallego',
    title: 'COALESCING VESSEL',
    subtitle: 'FC-010 · 12765-EPG-M-PL-GE-002',
    dwgNo: 'GE-002',
    discipline: 'ASME VIII DIV.1',
    pdf: 'assets/drawings/coalescing-vessel-fc010.pdf',
    photo: null,
    desc: 'Gas coalescing filter vessel separating entrained liquids from a 12" gas stream. Over thirty nozzles for level, pressure and differential-pressure instrumentation, with vortex breaker, davit and sacrificial anodes.',
    specs: [
      { k: 'Shell OD', v: '812.8 mm (32")' },
      { k: 'Inlet / outlet', v: 'NPS 12 CL150 WNRF' },
      { k: 'Code', v: 'ASME VIII Div.1' }
    ]
  },
  {
    tag: 'SECCO · YPF Puente Gallego',
    title: 'FILTER SKID',
    subtitle: 'FC-231 · EPG-12765-M-PL-00023',
    dwgNo: 'SK-001',
    discipline: 'SKID & PIPING',
    pdf: 'assets/drawings/filter-skid-fc231.pdf',
    photo: 'assets/photos/filter-skid.png',
    desc: 'Shop-assembled skid carrying the coalescing filter with its supports, access platforms and stairs. Interconnecting 12" piping to ASME B31.3, hydro-tested at 30 kg/cm² with 10% radiography.',
    specs: [
      { k: 'Weight', v: '≈ 7 t' },
      { k: 'Piping class', v: 'CA11 · ASME B16.5' },
      { k: 'Test', v: '30 kg/cm² @ 0.5 h' }
    ]
  }
];

const SKILLS = [
  { name: 'Autodesk Inventor', level: 95, img: 'assets/skills/inventor.png', group: 'technical' },
  { name: 'iLogic & API Automation', level: 92, img: 'assets/skills/ilogic.png', group: 'technical' },
  { name: 'Vault PDM', level: 85, img: 'assets/skills/vault.png', group: 'technical' },
  { name: 'ASME / PED Design', level: 88, img: 'assets/skills/asme-ped.png', group: 'technical' },
  { name: 'FEA & CFD', level: 75, img: 'assets/skills/fea-cfd.png', group: 'technical' },
  { name: 'Sheet Metal Design', level: 82, img: 'assets/skills/asme-ped.png', group: 'technical' },
  { name: 'Team Leadership', level: 88, img: 'assets/skills/people.png', group: 'people' },
  { name: 'Client & Stakeholder Communication', level: 90, img: 'assets/skills/people.png', group: 'people' },
  { name: 'Cross-functional Coordination', level: 85, img: 'assets/skills/people.png', group: 'people' },
  { name: 'Mentoring & Training', level: 80, img: 'assets/skills/people.png', group: 'people' }
];

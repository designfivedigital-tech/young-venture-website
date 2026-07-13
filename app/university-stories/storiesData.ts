export type University = {
  key: string;
  name: string;
};

export type Startup = {
  name: string;
  sector: string;
  founder: string;
  uni: string;
  portfolio?: boolean;
  founded: number;
  hq: string;
  stage: string;
  employees: string;
  description: string;
};

export const UNIVERSITIES: University[] = [
  { key: "bocconi", name: "Bocconi" },
  { key: "oxford", name: "Oxford" },
  { key: "cambridge", name: "Cambridge" },
  { key: "lse", name: "LSE" },
  { key: "eth", name: "ETH Zürich" },
  { key: "harvard", name: "Harvard" },
  { key: "stanford", name: "Stanford" },
  { key: "caltech", name: "Caltech" },
  { key: "nyu", name: "NYU" },
];

export const STARTUPS: Startup[] = [
  // Bocconi
  {
    name: "Bending Spoons",
    sector: "Consumer Apps",
    founder: "Luca Ferrari",
    uni: "bocconi",
    portfolio: true,
    founded: 2013,
    hq: "Milan, Italy",
    stage: "Late stage",
    employees: "400+",
    description:
      "Milan-based product studio behind some of the most downloaded apps in Europe, known for exceptional engineering culture and profitable growth.",
  },
  {
    name: "Satispay",
    sector: "Fintech",
    founder: "Alberto Dalmasso",
    uni: "bocconi",
    founded: 2013,
    hq: "Milan, Italy",
    stage: "Series D",
    employees: "500+",
    description:
      "Independent mobile payment network that lets users pay stores and friends directly from their smartphone, bypassing card circuits.",
  },
  {
    name: "Everli",
    sector: "E-commerce",
    founder: "Enrico Pandian",
    uni: "bocconi",
    founded: 2014,
    hq: "Milan, Italy",
    stage: "Series C",
    employees: "300+",
    description:
      "Online grocery marketplace connecting customers, retailers and personal shoppers for same-day delivery across Europe.",
  },
  // Oxford
  {
    name: "DeepMind",
    sector: "Artificial Intelligence",
    founder: "Mustafa Suleyman",
    uni: "oxford",
    founded: 2010,
    hq: "London, UK",
    stage: "Acquired (Google)",
    employees: "1000+",
    description:
      "AI research lab that produced breakthroughs like AlphaGo and AlphaFold, now the core of Google's AI efforts.",
  },
  {
    name: "Oxford Nanopore",
    sector: "Biotech",
    founder: "Gordon Sanghera",
    uni: "oxford",
    founded: 2005,
    hq: "Oxford, UK",
    stage: "Public (LSE)",
    employees: "900+",
    description:
      "Pioneer of portable, real-time DNA and RNA sequencing built on nanopore technology spun out of Oxford research.",
  },
  {
    name: "Onfido",
    sector: "Identity & Security",
    founder: "Husayn Kassai",
    uni: "oxford",
    portfolio: true,
    founded: 2012,
    hq: "London, UK",
    stage: "Acquired (Entrust)",
    employees: "600+",
    description:
      "Digital identity verification platform using AI to match a photo ID with facial biometrics for global onboarding.",
  },
  // Cambridge
  {
    name: "ARM",
    sector: "Semiconductors",
    founder: "Hermann Hauser",
    uni: "cambridge",
    founded: 1990,
    hq: "Cambridge, UK",
    stage: "Public (Nasdaq)",
    employees: "6000+",
    description:
      "Chip architecture company whose energy-efficient designs power virtually every smartphone on the planet.",
  },
  {
    name: "Darktrace",
    sector: "Cybersecurity",
    founder: "Poppy Gustafsson",
    uni: "cambridge",
    founded: 2013,
    hq: "Cambridge, UK",
    stage: "Public (LSE)",
    employees: "2000+",
    description:
      "Cyber defence platform applying self-learning AI to detect and respond to threats inside enterprise networks.",
  },
  {
    name: "Raspberry Pi",
    sector: "Hardware",
    founder: "Eben Upton",
    uni: "cambridge",
    founded: 2012,
    hq: "Cambridge, UK",
    stage: "Public (LSE)",
    employees: "100+",
    description:
      "Maker of the world's most popular single-board computer, born to teach programming and now embedded everywhere.",
  },
  // LSE
  {
    name: "WorldRemit",
    sector: "Fintech",
    founder: "Ismail Ahmed",
    uni: "lse",
    founded: 2010,
    hq: "London, UK",
    stage: "Series E",
    employees: "1000+",
    description:
      "Digital remittances platform making international money transfers faster and cheaper for migrant communities.",
  },
  {
    name: "Trouva",
    sector: "E-commerce",
    founder: "Mandeep Singh",
    uni: "lse",
    founded: 2015,
    hq: "London, UK",
    stage: "Acquired",
    employees: "100+",
    description:
      "Curated marketplace bringing independent boutiques online and shipping their products worldwide.",
  },
  // ETH
  {
    name: "Climeworks",
    sector: "Clean Tech",
    founder: "Christoph Gebald",
    uni: "eth",
    portfolio: true,
    founded: 2009,
    hq: "Zurich, Switzerland",
    stage: "Growth",
    employees: "300+",
    description:
      "Direct air capture pioneer removing CO₂ from the atmosphere with modular plants powered by renewable energy.",
  },
  {
    name: "GetYourGuide",
    sector: "Travel",
    founder: "Johannes Reck",
    uni: "eth",
    founded: 2009,
    hq: "Berlin, Germany",
    stage: "Series F",
    employees: "700+",
    description:
      "Booking platform for travel experiences, tours and attractions operating in over 150 countries.",
  },
  {
    name: "Scandit",
    sector: "Computer Vision",
    founder: "Samuel Mueller",
    uni: "eth",
    founded: 2009,
    hq: "Zurich, Switzerland",
    stage: "Series D",
    employees: "500+",
    description:
      "Smart data capture platform turning any camera-equipped device into an enterprise-grade barcode scanner.",
  },
  // Harvard
  {
    name: "Meta",
    sector: "Social Media",
    founder: "Mark Zuckerberg",
    uni: "harvard",
    founded: 2004,
    hq: "Menlo Park, USA",
    stage: "Public (Nasdaq)",
    employees: "65000+",
    description:
      "Started in a Harvard dorm as a student network, now the company behind Facebook, Instagram and WhatsApp.",
  },
  {
    name: "Microsoft",
    sector: "Software",
    founder: "Bill Gates",
    uni: "harvard",
    founded: 1975,
    hq: "Redmond, USA",
    stage: "Public (Nasdaq)",
    employees: "220000+",
    description:
      "Founded by a Harvard dropout, it became the defining software company of the personal computing era and beyond.",
  },
  {
    name: "Stripe",
    sector: "Fintech",
    founder: "John Collison",
    uni: "harvard",
    founded: 2010,
    hq: "San Francisco, USA",
    stage: "Late stage",
    employees: "8000+",
    description:
      "Payments infrastructure for the internet, powering checkout and financial operations for millions of businesses.",
  },
  // Stanford
  {
    name: "Google",
    sector: "Search & AI",
    founder: "Larry Page",
    uni: "stanford",
    founded: 1998,
    hq: "Mountain View, USA",
    stage: "Public (Nasdaq)",
    employees: "180000+",
    description:
      "Born as a Stanford PhD project on ranking web pages, it reshaped how the world finds information.",
  },
  {
    name: "Instagram",
    sector: "Social Media",
    founder: "Kevin Systrom",
    uni: "stanford",
    founded: 2010,
    hq: "San Francisco, USA",
    stage: "Acquired (Meta)",
    employees: "—",
    description:
      "Photo-sharing app that grew to a billion users and was acquired by Facebook for $1B just 18 months after launch.",
  },
  {
    name: "DoorDash",
    sector: "Logistics",
    founder: "Tony Xu",
    uni: "stanford",
    portfolio: true,
    founded: 2013,
    hq: "San Francisco, USA",
    stage: "Public (Nasdaq)",
    employees: "19000+",
    description:
      "Local commerce platform started as a Stanford class project, now the largest food delivery marketplace in the US.",
  },
  // Caltech
  {
    name: "Intel",
    sector: "Semiconductors",
    founder: "Gordon Moore",
    uni: "caltech",
    founded: 1968,
    hq: "Santa Clara, USA",
    stage: "Public (Nasdaq)",
    employees: "120000+",
    description:
      "Co-founded by Caltech PhD Gordon Moore — of Moore's Law — and cornerstone of the modern chip industry.",
  },
  {
    name: "Hotmail",
    sector: "Software",
    founder: "Sabeer Bhatia",
    uni: "caltech",
    founded: 1996,
    hq: "Sunnyvale, USA",
    stage: "Acquired (Microsoft)",
    employees: "—",
    description:
      "One of the first free web-based email services, acquired by Microsoft and the seed of Outlook.com.",
  },
  {
    name: "Quora",
    sector: "Consumer Internet",
    founder: "Adam D'Angelo",
    uni: "caltech",
    founded: 2009,
    hq: "Mountain View, USA",
    stage: "Series D",
    employees: "300+",
    description:
      "Question-and-answer platform founded by Caltech alumnus and former Facebook CTO Adam D'Angelo.",
  },
  // NYU
  {
    name: "Foursquare",
    sector: "Location Tech",
    founder: "Dennis Crowley",
    uni: "nyu",
    founded: 2009,
    hq: "New York, USA",
    stage: "Late stage",
    employees: "300+",
    description:
      "Location intelligence company born from an NYU ITP thesis project on social check-ins.",
  },
  {
    name: "SeatGeek",
    sector: "Marketplace",
    founder: "Jack Groetzinger",
    uni: "nyu",
    portfolio: true,
    founded: 2009,
    hq: "New York, USA",
    stage: "Series E",
    employees: "900+",
    description:
      "Mobile-first ticketing marketplace using data to help fans find the best value seats for live events.",
  },
];

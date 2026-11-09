export interface BusinessRecord {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  about: string;
  logo: string;
  coverImage: string;
  brandPrimaryColor: string;
  brandSecondaryColor: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  status: "PUBLISHED" | "DRAFT" | "UPCOMING" | "ARCHIVED";
  isFeatured: boolean;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  strengths: string[];
  targetAudience: string[];
  products: {
    id: string;
    name: string;
    description: string;
    image: string;
    category?: string;
  }[];
  gallery: {
    url: string;
    alt: string;
  }[];
}

export interface NewsRecord {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  publishedAt: string;
  status: "PUBLISHED" | "DRAFT";
  seoTitle: string;
  seoDescription: string;
}

export interface CareerRecord {
  id: string;
  title: string;
  slug: string;
  businessName: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  status: "PUBLISHED" | "DRAFT";
  closingDate?: string;
}

export interface MilestoneRecord {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Food & Wellness", slug: "food-and-wellness", description: "Wholesome nutritional products and culinary excellence." },
  { id: "cat-2", name: "Agriculture & Farming", slug: "agriculture-and-farming", description: "Sustainable cultivation, farm produce, and agri-ventures." },
  { id: "cat-3", name: "Enterprise & Wholesale", slug: "enterprise-and-wholesale", description: "Commercial supply networks and enterprise procurement." },
  { id: "cat-4", name: "Trading & Distribution", slug: "trading-and-distribution", description: "Strategic sourcing, distribution channels, and market reach." },
  { id: "cat-5", name: "Packaging Solutions", slug: "packaging-solutions", description: "Advanced eco-friendly and food-grade packaging innovations." },
  { id: "cat-6", name: "Technology & Ventures", slug: "technology-and-ventures", description: "Future digital platforms and tech-enabled business ecosystems." },
];

export const INITIAL_BUSINESSES: BusinessRecord[] = [
  {
    id: "biz-1",
    name: "Annamrit Foods",
    slug: "annamrit-foods",
    tagline: "Fresh Organic Sprouts, Wholesome Parathas & Healthy Daily Foods",
    category: "Food & Wellness",
    categorySlug: "food-and-wellness",
    shortDescription: "A flagship healthy food brand providing fresh protein-rich organic sprouts, wholesome multigrain parathas, nutritious noodles (Maggi style), and pure food essentials.",
    about: "Annamrit Foods was established with a singular conviction: good nutrition and vitality begin with pure, unadulterated everyday food. Grounded in uncompromising hygiene, farm-fresh ingredients, and modern culinary standards, Annamrit Foods crafts delicious and healthy daily meal solutions. Our signature lineup features enzymatically active fresh organic sprouts, nourishing homestyle stuffed multigrain parathas, guilt-free nutrient-rich noodles (Maggi style crafted with whole grains and zero harmful preservatives), alongside cold-pressed wellness oils and pure sweeteners. Every offering is prepared with zero artificial food colors or toxic additives to give conscious families and working professionals authentic homestyle nutrition.",
    logo: "/logos/annamrit-foods.svg",
    coverImage: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#142735",
    brandSecondaryColor: "#C6A66B",
    email: "enquiry@annamritfoods.com",
    phone: "+91 75077 00936",
    address: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03",
    website: "https://www.annamritfoods.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
      instagram: "https://instagram.com/sangalesgroup",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 1,
    seoTitle: "Annamrit Foods | Fresh Organic Sprouts, Healthy Parathas & Nutritious Meals | Sangales Group",
    seoDescription: "Discover Annamrit Foods — fresh protein sprouts, wholesome stuffed parathas, healthy Maggi-style noodles, and certified healthy food solutions.",
    strengths: [
      "Fresh daily hygienic preparation of protein-rich organic sprouts",
      "Homestyle nutritious parathas made with ancient grains & cold-pressed oils",
      "Healthy quick-cook noodles (Maggi style) with zero maida and zero artificial preservatives",
      "Uncompromising clean-room food safety and certified quality standards",
    ],
    targetAudience: [
      "Health-conscious households, fitness enthusiasts, and students",
      "Corporate offices, institutional cafeterias, and wellness kitchens",
      "Modern grocery stores, retail food chains, and supermarkets",
      "HORECA partners seeking hygienic, healthy food bases",
    ],
    products: [
      {
        id: "af-1",
        name: "Fresh Organic Sprouts & Protein Mixes",
        category: "Fresh Nutrition",
        description: "Enzymatically active, protein-rich sprouted mung, chickpeas, and mixed pulses. Freshly cultivated under certified clean-room conditions for daily vitality.",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "af-2",
        name: "Wholesome Stuffed & Multigrain Parathas",
        category: "Healthy Quick Meals",
        description: "Homestyle whole wheat and multigrain parathas (Methi, Paneer, Mixed Veg) crafted using pure cold-pressed oils without hydrogenated fats.",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "af-3",
        name: "Nutri-Noodles (Healthy Maggi Alternative)",
        category: "Healthy Instant Comfort",
        description: "Guilt-free instant noodles prepared with ragi, whole wheat, and foxtail millets with natural aromatic spices. Zero maida, zero palm oil, 100% MSG-free.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "af-4",
        name: "Stone-Ground Heritage Flours",
        category: "Staples",
        description: "Nutrient-dense ancient whole wheat, millet, and multi-grain flours milled slowly without heat degradation.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "af-5",
        name: "Artisanal Cold-Pressed Virgin Oils",
        category: "Wellness Oils",
        description: "Wood-pressed raw sesame, groundnut, and mustard oils rich in antioxidants and natural plant nutrients.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
      },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1200", alt: "Fresh organic protein sprouts" },
      { url: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=1200", alt: "Golden wholesome multigrain parathas" },
      { url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1200", alt: "Healthy vegetable noodles bowl" },
      { url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200", alt: "Hygienic wholesome food preparation" },
    ],
  },
  {
    id: "biz-2",
    name: "Sangales Farms",
    slug: "sangales-farms",
    tagline: "Cultivating Sustainability from Soil to Harvest",
    category: "Agriculture & Farming",
    categorySlug: "agriculture-and-farming",
    shortDescription: "An agriculture-focused enterprise representing progressive farming practices, seasonal produce, and agri-partnerships.",
    about: "Sangales Farms embodies the group's deep commitment to rural prosperity, regenerative agriculture, and modern agricultural stewardship. Working across high-yield arable land, Sangales Farms combines traditional agronomy wisdom with drip-irrigation, natural soil enrichment, and organized post-harvest handling to deliver exceptional farm produce.",
    logo: "/logos/sangales-farms.svg",
    coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#1e3a2f",
    brandSecondaryColor: "#C6A66B",
    email: "farms@sangales.com",
    phone: "+91 75077 00936",
    address: "Agro-Division, Sangales Rural Hub, Maharashtra, India",
    website: "https://farms.sangales.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 2,
    seoTitle: "Sangales Farms | Sustainable Agriculture & Farm Produce",
    seoDescription: "Explore Sangales Farms - sustainable agriculture, organic orchards, seasonal harvest, and institutional farm partnerships.",
    strengths: [
      "Precision drip irrigation and water-conservation infrastructure",
      "Zero synthetic hormone usage across orchard crops",
      "Direct farm-to-aggregation center cold-chain linkages",
      "Collaborative farmer community enablement and training",
    ],
    targetAudience: [
      "Food processing units and agro-manufacturers",
      "Fresh produce wholesale aggregators and mandis",
      "Supermarket chains seeking contract farming supply",
      "Bulk institutional buyers",
    ],
    products: [
      {
        id: "sf-1",
        name: "Seasonal Orchard Fruits",
        description: "Naturally matured pomegranates, citrus, and seasonal fruit crops grown with strict IPM practices.",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
        category: "Fresh Produce",
      },
      {
        id: "sf-2",
        name: "Bulk Grain & Pulses Harvest",
        description: "Sorted, moisture-controlled pulses and whole wheat ready for commercial packaging and processing.",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800",
        category: "Bulk Crops",
      },
      {
        id: "sf-3",
        name: "Bio-Enriched Soil Amendments",
        description: "Organic vermicompost and microbial soil inoculants developed from farm residue.",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d69106095?auto=format&fit=crop&q=80&w=800",
        category: "Agri Inputs",
      },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200", alt: "Sunset across Sangales agricultural fields" },
      { url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1200", alt: "Freshly harvested pomegranates" },
      { url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=1200", alt: "Ripening golden wheat fields" },
    ],
  },
  {
    id: "biz-3",
    name: "Sangales Enterprises",
    slug: "sangales-enterprises",
    tagline: "Reliable Institutional Supplies & Commercial Operations",
    category: "Enterprise & Wholesale",
    categorySlug: "enterprise-and-wholesale",
    shortDescription: "A specialized entity dedicated to commercial wholesale supplies, institutional procurement, and enterprise support.",
    about: "Sangales Enterprises operates as the commercial backbone for institutional clients requiring steady, high-volume procurement and dependable trade logistics. By aggregating demand and establishing rigorous quality inspection checkpoints, we supply enterprises with essential consumables, raw inputs, and commercial operational items with transparent SLA commitments.",
    logo: "/logos/sangales-enterprises.svg",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#1c2a38",
    brandSecondaryColor: "#C6A66B",
    email: "enterprises@sangales.com",
    phone: "+91 75077 00936",
    address: "Commercial Center, Sangales Group, India",
    website: "https://enterprises.sangales.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 3,
    seoTitle: "Sangales Enterprises | Commercial Supplies & Institutional Solutions",
    seoDescription: "Explore Sangales Enterprises - B2B commercial supplies, institutional fulfillment, and procurement contracts.",
    strengths: [
      "Customized vendor management and structured procurement contracts",
      "Comprehensive quality audits before consignment dispatch",
      "Flexible multi-tier credit and delivery schedules",
      "Single-window account manager for enterprise accounts",
    ],
    targetAudience: [
      "Commercial enterprises and manufacturing plants",
      "Hotels, caterers, and corporate facilities",
      "Regional retail store networks",
      "Government and institutional tenders",
    ],
    products: [
      {
        id: "se-1",
        name: "Institutional Bulk Supplies",
        description: "Scheduled high-volume delivery of commercial supplies tailored for corporate facilities and institutions.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        category: "Institutional",
      },
      {
        id: "se-2",
        name: "Enterprise Consumables & Hygiene Solutions",
        description: "Industrial sanitization, hygiene consumables, and commercial facility upkeep provisions.",
        image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=800",
        category: "Facility Supplies",
      },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200", alt: "Enterprise warehouse logistics" },
      { url: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=1200", alt: "Facility logistics inventory" },
    ],
  },
  {
    id: "biz-4",
    name: "Sangales Trading",
    slug: "sangales-trading",
    tagline: "Connecting Producers with Dynamic Markets",
    category: "Trading & Distribution",
    categorySlug: "trading-and-distribution",
    shortDescription: "A dynamic trading and distribution wing bridging source manufacturers with regional distribution pipelines.",
    about: "Sangales Trading specializes in domestic sourcing, merchant trading, and structured channel distribution. With deep market intelligence and relationships across wholesale trade hubs, we assist manufacturers in securing rapid regional distribution while ensuring buyers receive competitive pricing, authentic goods, and reliable transit schedules.",
    logo: "/logos/sangales-trading.svg",
    coverImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#142735",
    brandSecondaryColor: "#C6A66B",
    email: "trading@sangales.com",
    phone: "+91 75077 00936",
    address: "Logistics Hub, Sangales Group, India",
    website: "https://trading.sangales.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 4,
    seoTitle: "Sangales Trading | Sourcing & Distribution Network",
    seoDescription: "Sangales Trading connects manufacturers and distributors across major commercial markets with trusted sourcing and logistics.",
    strengths: [
      "Extensive regional dealer and wholesale distribution network",
      "Strategic pricing transparency and fair margin structures",
      "Dynamic inventory staging across commercial transit nodes",
      "Rigorous adherence to compliance and commercial taxation norms",
    ],
    targetAudience: [
      "Product manufacturers looking for regional distribution",
      "Wholesale traders and stockists",
      "Super-stockists and multi-district channel partners",
    ],
    products: [
      {
        id: "st-1",
        name: "Commodity Sourcing & Trade Aggregation",
        description: "Strategic multi-origin sourcing of key commercial commodities with real-time price monitoring.",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
        category: "Commodities",
      },
      {
        id: "st-2",
        name: "Regional Channel Distribution",
        description: "Turnkey last-mile distribution services connecting regional dealers with fast-moving consumer lines.",
        image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&q=80&w=800",
        category: "Distribution",
      },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200", alt: "Logistics fleet and supply network" },
      { url: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&q=80&w=1200", alt: "Regional shipping containers and goods staging" },
    ],
  },
  {
    id: "biz-5",
    name: "Sangales Packaging",
    slug: "sangales-packaging",
    tagline: "Engineered, Sustainable & Food-Grade Packaging",
    category: "Packaging Solutions",
    categorySlug: "packaging-solutions",
    shortDescription: "A specialized solutions provider focusing on food packaging materials, protective containers, and bespoke packaging.",
    about: "Sangales Packaging engineers functional, aesthetic, and sustainable packaging solutions engineered specifically for the food, FMCG, and agricultural sectors. We balance structural integrity, barrier protection, and ecological responsibility, enabling brands to safeguard product freshness while presenting a polished, premium shelf presence.",
    logo: "/logos/sangales-packaging.svg",
    coverImage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#1d2939",
    brandSecondaryColor: "#C6A66B",
    email: "packaging@sangales.com",
    phone: "+91 75077 00936",
    address: "Industrial Packaging Zone, Sangales Group, India",
    website: "https://packaging.sangales.com",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 5,
    seoTitle: "Sangales Packaging | Food-Grade & Sustainable Packaging Solutions",
    seoDescription: "Industrial and food-grade packaging materials, biodegradable containers, and custom printed packaging by Sangales Packaging.",
    strengths: [
      "100% certified food-grade contact materials",
      "Eco-conscious compostable and recyclable formulations",
      "High-definition multi-color custom branding capabilities",
      "Puncture-resistant corrugated transit boxes for heavy shipments",
    ],
    targetAudience: [
      "Food delivery brands, cloud kitchens, and restaurants",
      "FMCG consumer brand manufacturers",
      "Agri-exporters and fruit packing facilities",
      "E-commerce fulfilment operations",
    ],
    products: [
      {
        id: "sp-1",
        name: "Biodegradable Food Containers",
        description: "Bagasse and recyclable food trays, bowls, and meal boxes resistant to moisture and oil.",
        image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800",
        category: "Food Packaging",
      },
      {
        id: "sp-2",
        name: "Heavy-Duty Corrugated Master Cartons",
        description: "Multi-ply corrugated boxes engineered for palletized stacking, moisture resistance, and transit security.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
        category: "Industrial Packaging",
      },
      {
        id: "sp-3",
        name: "Barrier Films & Stand-Up Pouches",
        description: "Multi-layer barrier laminates with zipper seals to preserve fragrance, crispness, and aroma.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
        category: "Flexible Packaging",
      },
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1200", alt: "Eco-friendly food packaging container" },
      { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200", alt: "Industrial corrugated packaging cartons" },
      { url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200", alt: "Flexible barrier pouches on production conveyor" },
    ],
  },
  {
    id: "biz-6",
    name: "Sangales Digital",
    slug: "sangales-digital",
    tagline: "Technology Platforms for Tomorrow's Commerce",
    category: "Technology & Ventures",
    categorySlug: "technology-and-ventures",
    shortDescription: "An upcoming technological initiative incubating digital workflows, cloud services, and connected enterprise solutions.",
    about: "Sangales Digital represents the future-ready innovation lab of the Sangales Group, focusing on software tools, e-commerce infrastructure, and intelligent supply-chain intelligence.",
    logo: "/logos/sangales-digital.svg",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#0f172a",
    brandSecondaryColor: "#C6A66B",
    email: "digital@sangales.com",
    phone: "+91 75077 00936",
    address: "Technology Hub, Sangales Group, India",
    website: "https://digital.sangales.com",
    socialLinks: {},
    status: "UPCOMING",
    isFeatured: false,
    displayOrder: 6,
    seoTitle: "Sangales Digital | Technology & Innovation Labs",
    seoDescription: "Upcoming technological initiative incubating cloud and enterprise applications under Sangales Group.",
    strengths: ["Cloud-first architecture", "Data-driven operations"],
    targetAudience: ["Modern enterprises", "Group operating companies"],
    products: [],
    gallery: [],
  },
  {
    id: "biz-7",
    name: "Sangales Logistics",
    slug: "sangales-logistics",
    tagline: "Smart Freight & Warehousing Infrastructure",
    category: "Trading & Distribution",
    categorySlug: "trading-and-distribution",
    shortDescription: "An upcoming logistics arm architecting multi-nodal cold storage and regional warehousing corridors.",
    about: "Sangales Logistics is being developed to consolidate group and third-party freight, temperature-controlled storage, and rural-to-urban transit efficiency.",
    logo: "/logos/sangales-logistics.svg",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
    brandPrimaryColor: "#142735",
    brandSecondaryColor: "#C6A66B",
    email: "logistics@sangales.com",
    phone: "+91 75077 00936",
    address: "Logistics Corridor, Sangales Group, India",
    website: "https://logistics.sangales.com",
    socialLinks: {},
    status: "UPCOMING",
    isFeatured: false,
    displayOrder: 7,
    seoTitle: "Sangales Logistics | Freight & Warehousing",
    seoDescription: "Upcoming logistics and cold-chain infrastructure project under Sangales Group.",
    strengths: ["Cold-chain integration", "Strategic highway connectivity"],
    targetAudience: ["Agricultural shippers", "Commercial suppliers"],
    products: [],
    gallery: [],
  },
];

export const INITIAL_NEWS: NewsRecord[] = [
  {
    id: "news-1",
    title: "Sangales Group Announces Comprehensive Digital Infrastructure Launch",
    slug: "sangales-announces-digital-infrastructure-launch",
    excerpt: "The launch of Sangales.com marks a pivotal milestone in creating a unified corporate presence across all operating companies.",
    content: `SANGALES – A GROUP OF COMPANIES has officially inaugurated its consolidated corporate digital portal, establishing a single authoritative touchpoint for clients, institutional partners, and suppliers worldwide.\n\nUnder this unified architecture, each operating business—including Annamrit Foods, Sangales Farms, Sangales Enterprises, Sangales Trading, and Sangales Packaging—maintains distinct operational profiles while benefiting from the group's collective governance, financial resilience, and brand stature.\n\nSpeaking on the launch, the leadership emphasized: "Our vision is to build sustainable, deeply rooted Indian enterprises that generate real economic value, create local employment, and foster long-term partnerships. This platform represents our transparent, progressive identity as we look ahead to future expansions in modern technology and distribution."`,
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    category: "Corporate",
    publishedAt: "2026-10-15T09:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Sangales Group Announces Digital Platform Launch | Corporate Press",
    seoDescription: "Official announcement regarding the consolidated corporate digital ecosystem for Sangales – A Group of Companies.",
  },
  {
    id: "news-2",
    title: "Annamrit Foods Introduces Daily Healthy Foods Range: Fresh Sprouts, Multigrain Parathas & Nutri-Noodles",
    slug: "annamrit-foods-expands-healthy-foods-range",
    excerpt: "New ready-to-eat and wholesome cooking division brings enzymatically active fresh organic sprouts, multigrain stuffed parathas, and chemical-free millet noodles to health-conscious consumers.",
    content: `Responding to the rapidly expanding demand for honest, chemical-free everyday nutrition, Annamrit Foods has expanded its portfolio with a dedicated Healthy Foods division.\n\nThe new collection includes fresh, vacuum-sealed organic sprouted pulses, homestyle multigrain stuffed parathas prepared with cold-pressed oils, and guilt-free Nutri-Noodles (a wholesome Maggi-style comfort food crafted from ragi, whole wheat, and foxtail millets with zero palm oil, zero maida, and zero MSG).\n\n"Our everyday meals should build health, not compromise it," said the brand leadership. "By bringing together live organic sprouts, nourishing parathas, and nutritious noodles, Annamrit Foods ensures that fast, everyday eating remains deeply nourishing and 100% wholesome for every family."`,
    featuredImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1200",
    category: "Expansion",
    publishedAt: "2026-09-28T10:30:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Annamrit Foods Launches Fresh Sprouts, Parathas & Nutri-Noodles | Sangales News",
    seoDescription: "Annamrit Foods unveils wholesome daily nutrition range including organic fresh sprouts, multigrain parathas, and chemical-free noodles.",
  },
  {
    id: "news-3",
    title: "Sangales Packaging Introduces Certified Compostable Food Containers",
    slug: "sangales-packaging-introduces-compostable-containers",
    excerpt: "The packaging division deepens its sustainable product portfolio with 100% plant-fiber food delivery containers.",
    content: `Addressing the imperative need for sustainable alternatives to single-use plastics in the food service sector, Sangales Packaging has introduced an eco-engineered lineup of molded bagasse and unbleached kraft paper meal containers.\n\nThe new containers are certified 100% compostable, grease-resistant up to 120°C, and fully microwave-safe, providing restaurants, cloud kitchens, and institutional caterers with an ecologically sound yet structurally robust packaging choice.`,
    featuredImage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1200",
    category: "Sustainability",
    publishedAt: "2026-08-14T11:00:00.000Z",
    status: "PUBLISHED",
    seoTitle: "Sangales Packaging Unveils Compostable Containers | Sangales Group",
    seoDescription: "Sangales Packaging launches certified biodegradable, plant-fiber food containers for hospitality and delivery partners.",
  },
];

export const INITIAL_CAREERS: CareerRecord[] = [
  {
    id: "car-1",
    title: "Regional Sales Manager – Food & Institutional Supplies",
    slug: "regional-sales-manager-food",
    businessName: "Annamrit Foods / Sangales Enterprises",
    department: "Sales & Commercial Distribution",
    location: "Pune / Mumbai / Western Maharashtra, India",
    employmentType: "Full-time",
    description: "Lead institutional sales and distributor acquisition for Annamrit Foods staples and commercial consumable lines. You will build relationships with supermarket chains, HORECA accounts, and regional stockists.",
    requirements: [
      "3-6 years of proven B2B or FMCG sales experience in food or institutional products",
      "Demonstrated track record of expanding distributor networks",
      "Strong commercial negotiation and relationship-management skills",
      "Fluency in Hindi, Marathi, and English",
    ],
    status: "PUBLISHED",
    closingDate: "2026-12-31",
  },
  {
    id: "car-2",
    title: "Operations & Procurement Specialist",
    slug: "operations-procurement-specialist",
    businessName: "Sangales Trading & Enterprises",
    department: "Supply Chain & Procurement",
    location: "Corporate Office, Maharashtra, India",
    employmentType: "Full-time",
    description: "Coordinate vendor contracting, freight tracking, and quality inspection workflows across agricultural and wholesale industrial merchandise.",
    requirements: [
      "Degree in Logistics, Agribusiness, Commerce, or related domain",
      "2+ years experience in vendor management and bulk procurement",
      "Sound knowledge of inventory software, GST compliance, and freight coordination",
      "High attention to detail and analytical acumen",
    ],
    status: "PUBLISHED",
    closingDate: "2026-12-15",
  },
  {
    id: "car-3",
    title: "Agricultural Field Agronomist",
    slug: "agricultural-field-agronomist",
    businessName: "Sangales Farms",
    department: "Agronomy & Field Operations",
    location: "Sangales Agricultural Division, India",
    employmentType: "Full-time",
    description: "Guide sustainable crop health, IPM protocols, soil testing, and precision drip-fertigation schedules across commercial fruit orchards and farm acreage.",
    requirements: [
      "B.Sc / M.Sc in Agriculture or Horticulture",
      "Field familiarity with drip systems, bio-fertilizers, and seasonal horticulture",
      "Ability to mentor and collaborate with farming crew and rural partners",
    ],
    status: "PUBLISHED",
    closingDate: "2026-11-30",
  },
];

export const INITIAL_MILESTONES: MilestoneRecord[] = [
  {
    year: "Inception",
    title: "Founding Vision & Commercial Inception",
    description: "Sangales was established around a foundational principle: building robust Indian enterprises focused on essential commodities, reliability, and long-term partner trust.",
    tag: "Group Foundation",
  },
  {
    year: "Expansion",
    title: "Agricultural & Supply Chain Integration",
    description: "Initiated structured agricultural operations and commercial wholesale supply channels to connect rural produce with urban demand centres.",
    tag: "Farming & Wholesale",
  },
  {
    year: "Brand Genesis",
    title: "Establishment of Annamrit Foods",
    description: "Launched Annamrit Foods to bring pure, unadulterated, stone-ground flours and cold-pressed wellness oils directly to conscious consumers.",
    tag: "Food & Wellness",
  },
  {
    year: "Diversification",
    title: "Packaging & Sustainable Materials Division",
    description: "Inaugurated Sangales Packaging to supply food-grade, eco-conscious, and heavy-duty industrial packaging to regional businesses.",
    tag: "Manufacturing & Packaging",
  },
  {
    year: "Present & Future",
    title: "Unified Digital Ecosystem & Scalable Horizons",
    description: "Rollout of the centralized digital architecture to accelerate partnerships, institutional distribution, and incubation of future tech and logistics ventures.",
    tag: "Corporate Platform",
  },
];


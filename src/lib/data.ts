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
    price?: string;
    directBuyUrl?: string;
  }[];
  gallery: {
    url: string;
    alt: string;
  }[];
  isAssociate?: boolean;
  associationType?: string;
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
    tagline: "Homestyle • Healthy • Fresh • Comfort Food",
    category: "Food & Wellness",
    categorySlug: "food-and-wellness",
    shortDescription: "A food brand based in Nashik, Maharashtra, built around the belief that good food is the foundation of a healthier and happier life. Serving delicious, hygienic, and nutritious food options including healthy chaat, fresh sprouts, breakfast favourites, and wholesome meals.",
    about: "Annamrit Foods is a food brand based in Nashik, Maharashtra, built around a simple belief: good food is the foundation of a healthier and happier life.\n\nWe are passionate about serving delicious, hygienic and nutritious food options that bring together taste, freshness and quality.\n\nOur menu features a variety of food choices, including healthy chaat, sprouts, breakfast favourites and wholesome meal options.\n\nAt Annamrit Foods, we focus on preparing food with care, maintaining quality and making better food choices accessible to everyday customers.\n\nOur goal is to make healthy eating a natural part of everyone's lifestyle.",
    logo: "/logos/annamrit-foods-logo.png",
    coverImage: "/images/annamrit-foods/annamrit-salad-meal-box.jpg",
    brandPrimaryColor: "#1e3a2f",
    brandSecondaryColor: "#C6A66B",
    email: "contact.sangales@gmail.com",
    phone: "+91 75077 00936",
    address: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India",
    website: "https://www.sangales.com/businesses/annamrit-foods",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
      instagram: "https://instagram.com/sangalesgroup",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 1,
    seoTitle: "Annamrit Foods | Healthy Chaat, Fresh Sprouts & Wholesome Meals | Nashik",
    seoDescription: "Annamrit Foods (Nashik, Maharashtra) - Delicious, hygienic, and nutritious food options including healthy chaat, fresh sprouts, breakfast favourites, and wholesome comfort food.",
    strengths: [
      "FSSAI Certified Brand (Registration No. 21525072001070)",
      "Daily Hygienic & Fresh Preparation based in Nashik, Maharashtra",
      "Diverse Menu: Healthy Chaat, Fresh Sprouts, Breakfast & Meals",
      "Delicious Comfort Food Prepared with Care, Quality & Freshness",
      "Making Healthier Food Choices Accessible to Everyday Customers",
    ],
    targetAudience: [
      "Health-conscious individuals, fitness enthusiasts & students",
      "Families seeking fresh, hygienic, and homestyle everyday nutrition",
      "Corporate offices, institutions, and workplace meal providers",
      "Breakfast lovers and evening healthy chaat seekers",
    ],
    products: [
      {
        id: "af-1",
        name: "Healthy Sprout Chaat & Savory Bowls",
        category: "Healthy Chaat",
        description: "Freshly tossed sprouted beans with diced tomatoes, crunchy cucumber, coriander herbs, and zesty spices for a delicious, guilt-free snack.",
        image: "/images/annamrit-foods/annamrit-sprout-chaat.jpg",
      },
      {
        id: "af-2",
        name: "Fresh Organic Sprouts & Protein Mixes",
        category: "Fresh Sprouts",
        description: "Enzymatically active steamed and seasoned sprouted moong and mixed lentils rich in live bioavailable plant protein and vitality.",
        image: "/images/annamrit-foods/annamrit-fresh-sprouts.jpg",
      },
      {
        id: "af-3",
        name: "Layered Sprout & Veggie Salad Meal Box",
        category: "Meal Options",
        description: "Nutrient-dense meal box featuring sprouted moong, diced carrots, fresh cucumber, tomatoes, greens, and fresh lemon wedge for daily energy.",
        image: "/images/annamrit-foods/annamrit-salad-meal-box.jpg",
      },
      {
        id: "af-4",
        name: "Vitality Fresh Vegetable Salad Platter",
        category: "Breakfast & Salads",
        description: "Crisp garden-fresh slices of ripe tomatoes, sweet carrots, nutritious beetroot, and cool cucumbers prepared with pristine hygiene.",
        image: "/images/annamrit-foods/annamrit-vitality-salad.jpg",
      },
      {
        id: "af-5",
        name: "Traditional Kala Chana & Sundal Chaat",
        category: "Healthy Chaat",
        description: "Slow-tempered black chickpeas (Kala Chana) garnished with tangy raw mango slices, fresh grated coconut, and aromatic curry leaves.",
        image: "/images/annamrit-foods/annamrit-kala-chana-chaat.jpg",
      },
    ],
    gallery: [
      { url: "/images/annamrit-foods/annamrit-salad-meal-box.jpg", alt: "Layered Sprout & Veggie Salad Meal Box" },
      { url: "/images/annamrit-foods/annamrit-sprout-chaat.jpg", alt: "Fresh Sprouted Bean Chaat Bowl" },
      { url: "/images/annamrit-foods/annamrit-fresh-sprouts.jpg", alt: "Steamed Protein Moong Sprouts" },
      { url: "/images/annamrit-foods/annamrit-vitality-salad.jpg", alt: "Fresh Beetroot, Carrot & Cucumber Vitality Salad" },
      { url: "/images/annamrit-foods/annamrit-kala-chana-chaat.jpg", alt: "Kala Chana Sundal Chaat with Raw Mango" },
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
    email: "contact.sangales@gmail.com",
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
    email: "contact.sangales@gmail.com",
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
    email: "contact.sangales@gmail.com",
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
    email: "contact.sangales@gmail.com",
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
    email: "contact.sangales@gmail.com",
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
    email: "contact.sangales@gmail.com",
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
  {
    id: "biz-8",
    name: "Anvayi Farms",
    slug: "anvayi-farms",
    tagline: "Pure Desi Cow A2 Bilona Ghee & Traditional Farm Nutrition",
    category: "Agriculture & Farming",
    categorySlug: "agriculture-and-farming",
    isAssociate: true,
    associationType: "Strategic Associate Company",
    shortDescription: "An esteemed associate company of Sangales Group delivering pure, laboratory-certified Desi Cow A2 Bilona Ghee handcrafted through the ancient wooden bilona method and ethical Ahinsak Dohan.",
    about: "Anvayi Farms was founded on the sacred principles of purity, cow care, and generational Indian nutrition. Operating in close strategic association with Sangales Group, Anvayi Farms maintains its own indigenous Desi cows raised naturally on nutritious vegetarian farm feed without synthetic hormones or factory confinement. True to the timeless Vedic principle of 'Ahinsak Dohan', the calf is always fed first before any milk is collected. Milk is gently boiled, set into whole curd overnight, and churned clockwise and anti-clockwise with traditional wooden bilona to yield rich cultured makkhan (butter), which is then slow-simmered into pure, golden, danedar (grainy) Desi Cow Ghee. Independently laboratory-tested and confirmed 100% free from preservatives, artificial colors, and adulteration, Anvayi Farms brings heritage health directly to conscious homes across India.",
    logo: "/logos/anvayi-farms-logo.png",
    coverImage: "/images/anvayi-farms/anvayi-bilona-method.png",
    brandPrimaryColor: "#2D5A27",
    brandSecondaryColor: "#C6A66B",
    email: "contact.sangales@gmail.com",
    phone: "+91 86989 90710",
    address: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India",
    website: "https://www.anvayifarms.com",
    socialLinks: {
      facebook: "https://facebook.com/anvayifarms",
      instagram: "https://instagram.com/anvayifarms",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 2,
    seoTitle: "Anvayi Farms | Pure Desi Cow A2 Bilona Ghee | Associate Company",
    seoDescription: "Anvayi Farms (Associated with Sangales Group) - Pure Desi Cow A2 Bilona Ghee, ethical Ahinsak Dohan, lab-tested purity, and traditional farm wellness products.",
    strengths: [
      "100% Pure Desi Cow Milk (From our own cows, zero outsourced milk)",
      "Vedic Ahinsak Dohan (Calf feeds first with utmost ethical care)",
      "Traditional Wooden Bilona Method (Curd churned both ways)",
      "Certified Lab-Tested (Free from preservatives, colors & adulteration)",
      "Danedar (Grainy) Texture & Rich In Natural Beta-Carotene",
      "FSSAI Certified Brand (Lic. No. 11526999000448)",
    ],
    targetAudience: [
      "Health-conscious families seeking authentic Vedic nutrition",
      "Ayurvedic and holistic wellness practitioners",
      "Conscious parents focused on children's brain development & immunity",
      "Gourmet culinary kitchens and traditional sweet makers",
      "Organic food retailers and health food stores",
    ],
    products: [
      {
        id: "af-ghee-1l",
        name: "Premium Desi Cow A2 Bilona Ghee (1 Litre)",
        category: "A2 Bilona Ghee",
        price: "₹ 3,000.00",
        description: "Pure, aromatic, danedar (grainy) A2 Desi Cow Ghee lovingly handcrafted from whole curd using the traditional wooden bilona churning process. Packed with natural vitamins, healthy fats, and beta-carotene.",
        image: "/images/anvayi-farms/anvayi-ghee-1litre.jpg",
        directBuyUrl: "https://www.anvayifarms.com/shop",
      },
      {
        id: "af-ghee-500ml",
        name: "Premium Desi Cow A2 Bilona Ghee (500ml)",
        category: "A2 Bilona Ghee",
        price: "₹ 1,500.00",
        description: "Small-batch authentic Desi Cow Bilona Ghee in a premium glass jar. Produced under Ahinsak Dohan with zero preservatives, chemicals, or additives for daily family nourishment.",
        image: "/images/anvayi-farms/anvayi-ghee-500ml.jpg",
        directBuyUrl: "https://www.anvayifarms.com/shop",
      },
      {
        id: "af-makkhan",
        name: "Traditional Cultured Makkhan (Cultured Butter)",
        category: "Cultured Dairy",
        description: "Slow-churned artisanal white butter extracted directly from whole cultured curd using the traditional bilona method, preserving active probiotic enzymes and homestyle flavor.",
        image: "/images/anvayi-farms/anvayi-bilona-method.png",
        directBuyUrl: "https://www.anvayifarms.com/shop",
      },
      {
        id: "af-farm-dairy",
        name: "Ethical Desi Cow Farm Produce",
        category: "Farm Heritage",
        description: "Fresh, unadulterated farm staples sourced from naturally grazed indigenous cows fed a pure vegetarian diet under compassionate care.",
        image: "/images/anvayi-farms/anvayi-desi-cows.png",
        directBuyUrl: "https://www.anvayifarms.com",
      },
    ],
    gallery: [
      { url: "/images/anvayi-farms/anvayi-ghee-1litre.jpg", alt: "Anvayi Farms Desi Cow A2 Bilona Ghee" },
      { url: "/images/anvayi-farms/anvayi-bilona-method.png", alt: "Traditional Bilona Churning Method" },
      { url: "/images/anvayi-farms/anvayi-desi-cows.png", alt: "Desi Cows Raised Naturally on Vegetarian Diet" },
      { url: "/images/anvayi-farms/anvayi-ghee-500ml.jpg", alt: "Anvayi Farms 500ml Danedar Ghee Jar" },
    ],
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


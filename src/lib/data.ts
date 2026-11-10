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
  { id: "cat-3", name: "Lighting & LED Solutions", slug: "lighting-and-led-solutions", description: "Advanced commercial, industrial, and architectural LED lighting infrastructure." },
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
    tagline: "Farm-Fresh Organic Vegetables, Wholesome Grains & Ancient Millets",
    category: "Agriculture & Farming",
    categorySlug: "agriculture-and-farming",
    shortDescription: "An agriculture and organic farming enterprise providing fresh farm-harvested vegetables, wholesome wheat, bajra (pearl millet), jowar (sorghum), and traditional nutrition-rich millets direct from sustainable Maharashtra farmlands.",
    about: "Sangales Farms represents the group's deep commitment to rural agricultural prosperity, soil health, and pure organic nourishment. Cultivating across fertile agricultural lands in Maharashtra, we produce farm-fresh organic vegetables, pure wholesome grains, and heritage superfoods with zero harmful synthetic pesticides.\n\nOur produce portfolio includes daily farm-fresh organic vegetables (vine tomatoes, leafy spinach, cucumbers, gourds, and seasonal greens), premium wholesome wheat, pearl millet (bajra), white sorghum (jowar), and nutrient-dense ancient millets (ragi, foxtail, little millet). By combining generational agronomy wisdom with natural soil enrichment, solar drying, and precision grading, Sangales Farms provides households, food businesses, and regional markets with genuine, unadulterated farm produce packed with vitality.",
    logo: "/logos/sangales-farms.svg",
    coverImage: "/images/farms/organic-farm-vegetables.jpg",
    brandPrimaryColor: "#1e3a2f",
    brandSecondaryColor: "#C6A66B",
    email: "contact.sangales@gmail.com",
    phone: "+91 75077 00936",
    address: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India",
    website: "https://www.sangales.com/businesses/sangales-farms",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 2,
    seoTitle: "Sangales Farms | Farm-Fresh Organic Vegetables, Wheat, Bajra, Jowar & Millets | Nashik",
    seoDescription: "Sangales Farms — 100% farm-fresh organic vegetables, wholesome wheat, bajra (pearl millet), jowar (sorghum), and nutrient-dense ancient millets harvested sustainably in Maharashtra.",
    strengths: [
      "100% Farm-Fresh Organic Vegetables: Daily Harvest of Tomatoes, Greens & Seasonal Veggies",
      "Wholesome Traditional Grains: Pure Wheat, Bajra & Shalu Jowar",
      "Zero Chemical Polishing, Synthetic Pesticides, or Harmful Storage Preservatives",
      "Direct Farm-to-Consumer, Kitchen, and Wholesale Mandi Supply",
      "Ancient Indian Superfood Millets: Ragi, Foxtail & Little Millets",
    ],
    targetAudience: [
      "Health-conscious households seeking pure organic vegetables and unpolished grains",
      "Atta chakkis, flour mills & regional grain retailers",
      "Restaurants, cloud kitchens, caterers & fresh food providers",
      "Wholesale vegetable & grain merchants, APMC mandis & bulk aggregators",
    ],
    products: [
      {
        id: "sf-1",
        name: "Farm-Fresh Organic Vegetables & Greens",
        category: "Organic Vegetables",
        description: "Naturally grown, chemical-free daily vegetables harvested fresh from Maharashtra farmlands — including fresh farm tomatoes, cucumbers, spinach, fenugreek, brinjals, gourds, and coriander herbs for wholesome daily meals.",
        image: "/images/farms/organic-farm-vegetables.jpg",
      },
      {
        id: "sf-2",
        name: "Wholesome Natural Wheat",
        category: "Wholesome Grains",
        description: "Golden, sun-ripened whole wheat grains with high bran and natural gluten integrity. Cleaned, sorted, and free from synthetic polish — ideal for soft rotis, chapatis, and stone-ground flour.",
        image: "/images/farms/wholesome-wheat-grains.jpg",
      },
      {
        id: "sf-3",
        name: "Pure Farm-Fresh Bajra & Pearl Millet",
        category: "Millets & Superfoods",
        description: "Authentic, nutrient-dense Pearl Millet (Bajra) grains packed with iron, zinc, dietary fiber, and complex carbohydrates for wholesome daily winter bhakris and nutritious rotlas.",
        image: "/images/farms/pure-bajra-pearl-millet.jpg",
      },
      {
        id: "sf-4",
        name: "Authentic Shalu Jowar & Sorghum",
        category: "Wholesome Grains",
        description: "Naturally gluten-free, premium white Shalu Jowar cultivated with organic soil enrichment. Rich in antioxidants, magnesium, and digestive fiber, producing soft, sweet traditional bhakris.",
        image: "/images/farms/authentic-shalu-jowar.jpg",
      },
      {
        id: "sf-5",
        name: "Ancient Indian Millets & Superfood Mix",
        category: "Millets & Superfoods",
        description: "A curated range of unprocessed, mineral-packed ancient Indian millets including Finger Millet (Ragi), Foxtail Millet, and Little Millet for diabetic-friendly, high-calcium nutrition.",
        image: "/images/farms/ancient-indian-millets-ragi.jpg",
      },
      {
        id: "sf-6",
        name: "Farm-Fresh Vine Tomatoes & Salad Veggies",
        category: "Organic Vegetables",
        description: "Naturally ripened, farm-fresh juicy red vine tomatoes and crisp salad vegetables grown with organic compost and zero synthetic ripening chemicals.",
        image: "/images/farms/farm-fresh-tomatoes.jpg",
      },
      {
        id: "sf-7",
        name: "Farm Harvest Pulses & Legumes",
        category: "Farm Harvest",
        description: "Naturally matured, unpolished whole pulses including whole green moong, desi chana, and tur grown through sustainable crop-rotation to naturally enrich the soil and provide pure protein.",
        image: "/images/farms/farm-harvest-pulses-legumes.jpg",
      },
    ],
    gallery: [
      { url: "/images/farms/organic-farm-vegetables.jpg", alt: "Farm-fresh organic vegetables harvest in Maharashtra" },
      { url: "/images/farms/wholesome-wheat-grains.jpg", alt: "Golden sun-ripened wholesome wheat grain harvest" },
      { url: "/images/farms/pure-bajra-pearl-millet.jpg", alt: "Pure pearl millet bajra grain harvest" },
      { url: "/images/farms/authentic-shalu-jowar.jpg", alt: "Authentic white Shalu Jowar grain harvest" },
      { url: "/images/farms/farm-fresh-tomatoes.jpg", alt: "Fresh vine-ripened organic red tomatoes" },
      { url: "/images/farms/ancient-indian-millets-ragi.jpg", alt: "Ancient Indian millets and Ragi superfoods" },
      { url: "/images/farms/colourful-vegetables-market.jpg", alt: "Vibrant fresh market vegetables in Maharashtra" },
      { url: "/images/farms/farm-harvest-pulses-legumes.jpg", alt: "Farm-harvested unpolished green moong and pulses" },
    ],
  },
  {
    id: "biz-3",
    name: "Sangales Enterprises",
    slug: "sangales-enterprises",
    tagline: "Commercial, Industrial & Architectural LED Lighting Solutions",
    category: "Lighting & LED Solutions",
    categorySlug: "lighting-and-led-solutions",
    shortDescription: "A specialized illumination enterprise delivering high-efficiency commercial LED lighting, industrial high bays, architectural track luminaires, and smart outdoor street lighting solutions.",
    about: "Sangales Enterprises is a premier illumination and lighting infrastructure provider delivering cutting-edge LED solutions for commercial, industrial, and architectural applications.\n\nWe design, engineer, and supply high-performance, energy-efficient lighting fixtures engineered to deliver optimal lumens-per-watt, superior thermal heat dissipation, and long-lasting optical performance. Our comprehensive lighting catalog includes commercial 2x2 LED panel lights, glare-free downlights, heavy-duty industrial high bay fixtures, weatherproof outdoor floodlights, architectural magnetic track systems, and smart street lighting.\n\nPartnering with architects, interior consultants, electrical contractors, and institutional developers, Sangales Enterprises illuminates corporate headquarters, manufacturing facilities, retail showrooms, luxury hotels, and modern urban infrastructure with sustainable, smart LED technology.",
    logo: "/logos/sangales-enterprises.svg",
    coverImage: "/images/enterprises/sangales-enterprises-cover.jpg",
    brandPrimaryColor: "#1c2a38",
    brandSecondaryColor: "#C6A66B",
    email: "contact.sangales@gmail.com",
    phone: "+91 75077 00936",
    address: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India",
    website: "https://www.sangales.com/businesses/sangales-enterprises",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 3,
    seoTitle: "Sangales Enterprises | Commercial & Industrial LED Lighting Solutions | Nashik",
    seoDescription: "Sangales Enterprises — High-efficiency commercial LED panels, industrial high bays, architectural track lighting, streetlights, and smart lighting solutions.",
    strengths: [
      "Comprehensive LED Range: Commercial Panels, Industrial High Bays, Floodlights & Streetlights",
      "High Lumen-per-Watt Efficiency & Advanced Aluminum Heat Sink Management",
      "Custom Architectural & Interior Lighting Layout Consultancy",
      "IP66 & Heavy-Duty Weatherproof Certification for Industrial and Outdoor Luminaires",
      "Direct Bulk Wholesale Supply for Contractors, Builders, Showrooms & Institutions",
    ],
    targetAudience: [
      "Architects, lighting designers, interior contractors & MEP consultants",
      "Industrial manufacturing plants, warehouses & logistics hubs",
      "Commercial office complexes, banks, IT parks & retail showrooms",
      "Hotels, banquet halls, restaurants & institutional campuses",
    ],
    products: [
      {
        id: "se-1",
        name: "Commercial Office LED Panels & Recessed Downlights",
        category: "Commercial Lighting",
        description: "Ultra-slim, glare-free 2x2 ft and 1x4 ft backlit & edgelit LED ceiling panels and recessed COB downlights engineered for uniform illumination in corporate offices, banks, and conference suites.",
        image: "/images/enterprises/commercial-led-panel-lights.jpg",
      },
      {
        id: "se-2",
        name: "Architectural Magnetic Track & Spotlight Systems",
        category: "Architectural Lighting",
        description: "Versatile low-voltage magnetic track lighting systems, adjustable spotlight luminaires, and linear profile fixtures providing dramatic accent illumination for retail showrooms, galleries, and luxury spaces.",
        image: "/images/enterprises/architectural-track-lighting.jpg",
      },
      {
        id: "se-3",
        name: "Heavy-Duty Industrial LED High Bays & Floodlights",
        category: "Industrial Lighting",
        description: "High-power IP66 dust-and-waterproof industrial LED high bay fixtures and floodlights with robust die-cast aluminum heat sinks for factories, production floors, and logistics warehouses.",
        image: "/images/enterprises/industrial-led-floodlights.jpg",
      },
      {
        id: "se-4",
        name: "Outdoor LED Streetlights & Area Luminaires",
        category: "Outdoor Infrastructure",
        description: "High-efficiency roadway LED streetlights with dusk-to-dawn sensor compatibility, surge protection, and wide beam angle lenses for municipal roads, private townships, and commercial campuses.",
        image: "/images/enterprises/outdoor-led-street-lighting.jpg",
      },
      {
        id: "se-5",
        name: "Linear Profile & Ambient Ceiling Lights",
        category: "Architectural Lighting",
        description: "Continuous seamless aluminum profile linear luminaires and suspended architectural lighting grids offering sleek minimalist aesthetics and soft, uniform diffused lighting.",
        image: "/images/enterprises/architectural-linear-ceiling-lights.jpg",
      },
      {
        id: "se-6",
        name: "Decorative Ambient Sconces & Accent Lighting",
        category: "Decorative & Ambient",
        description: "Modern architectural wall sconces, modern pendant fixtures, and dynamic CCT-tunable ambient illumination designed to elevate hospitality, reception, and upscale dining environments.",
        image: "/images/enterprises/decorative-ambient-lighting.jpg",
      },
    ],
    gallery: [
      { url: "/images/enterprises/commercial-led-panel-lights.jpg", alt: "Commercial office LED panel and downlight illumination" },
      { url: "/images/enterprises/architectural-track-lighting.jpg", alt: "Architectural magnetic track lighting and spotlight luminaires" },
      { url: "/images/enterprises/industrial-led-floodlights.jpg", alt: "Heavy-duty industrial IP66 LED floodlights" },
      { url: "/images/enterprises/outdoor-led-street-lighting.jpg", alt: "High-efficiency outdoor roadway LED streetlights" },
      { url: "/images/enterprises/architectural-linear-ceiling-lights.jpg", alt: "Modern architectural linear ceiling lighting system" },
      { url: "/images/enterprises/decorative-ambient-lighting.jpg", alt: "Modern ambient wall sconce and interior decorative lighting" },
      { url: "/images/enterprises/sangales-enterprises-cover.jpg", alt: "Precision LED luminaire engineering and testing" },
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
    tagline: "Food Packaging Disposables, 4CP Meal Boxes, Aluminium Containers & Paper Bags",
    category: "Packaging Solutions",
    categorySlug: "packaging-solutions",
    shortDescription: "A premier manufacturer and wholesale supplier of food packaging disposables, including heavy-duty 4CP meal boxes, leak-proof aluminium foil containers, eco-friendly paper bags in all standard sizes, paper plates, disposable glasses, and cutlery.",
    about: "Sangales Packaging is a trusted packaging and disposable solutions provider serving restaurants, cloud kitchens, caterers, bakeries, supermarkets, and corporate facilities.\n\nWe specialize in high-demand, food-grade disposable materials engineered for safe transit, heat retention, and hygienic food delivery. Our comprehensive catalog includes heavy-duty 4CP meal boxes, leak-proof aluminium foil containers, durable grocery and takeaway paper bags in multiple standard sizes (10x14, 6x14, 6x11, 4x10, 4x8), disposable drinking glasses, paper plates, and sanitary dining cutlery.\n\nWhether you run a fast-paced food delivery brand or need bulk wholesale packaging supply, Sangales Packaging delivers consistent quality, competitive bulk pricing, and prompt pan-India fulfillment.",
    logo: "/logos/sangales-packaging.svg",
    coverImage: "/images/packaging/disposable-meal-packaging-kit.jpg",
    brandPrimaryColor: "#1d2939",
    brandSecondaryColor: "#C6A66B",
    email: "contact.sangales@gmail.com",
    phone: "+91 75077 00936",
    address: "Samruddhi Park, Kapaleshwar nagar, Panchwati, Nashik -03, Maharashtra, India",
    website: "https://www.sangales.com/businesses/sangales-packaging",
    socialLinks: {
      linkedin: "https://linkedin.com/company/sangales",
    },
    status: "PUBLISHED",
    isFeatured: true,
    displayOrder: 5,
    seoTitle: "Sangales Packaging | 4CP Meal Boxes, Aluminium Containers & Paper Bags | Nashik",
    seoDescription: "Sangales Packaging — Food packaging disposables, 4CP compartment meal boxes, aluminium foil containers, paper bags (10x14, 6x14, 6x11, 4x10, 4x8), paper plates, disposable glasses & spoons.",
    strengths: [
      "Complete Food Packaging Disposables: 4CP Boxes, Foil Containers, Glasses & Spoons",
      "Standard Paper Bag Sizes: 10x14, 6x14, 6x11, 4x10, 4x8 for Takeaway & Grocery",
      "100% Certified Food-Grade, Leak-Proof & Heat-Retaining Materials",
      "Wholesale Carton Pricing & Rapid Pan-India Commercial Supply",
      "Custom Branding & Bulk Supply for Cloud Kitchens & Retailers",
    ],
    targetAudience: [
      "Cloud kitchens, food delivery portals (Zomato/Swiggy partners) & restaurants",
      "Caterers, event organizers, wedding planners & institutional canteens",
      "Bakeries, sweet shops, snack centers & street food vendors",
      "Wholesale packaging distributors, supermarkets & retail stores",
    ],
    products: [
      {
        id: "sp-1",
        name: "4CP Compartment Meal Boxes (with Anti-Leak Lids)",
        category: "Meal Boxes & Trays",
        description: "Heavy-duty food-grade 4-compartment meal box (separate sections for Dal, Rice, 2 Sabzis/Roti) with tight-fitting anti-leak clear lids. Ideal for cloud kitchens, corporate thali lunch delivery, and caterers.",
        image: "/images/packaging/4cp-meal-box.jpg",
      },
      {
        id: "sp-2",
        name: "Aluminium Foil Food Containers (All Sizes)",
        category: "Foil Containers",
        description: "Heavy-duty, heat-retaining aluminium foil containers with matching foil/poly lids. Available in small square (250ml dip/chutney), medium rectangular (450ml/500ml), and large (650ml/750ml/1000ml) biryani & gravy meal containers.",
        image: "/images/packaging/aluminium-foil-containers.jpg",
      },
      {
        id: "sp-3",
        name: "Eco-Friendly Paper Bags (Sizes: 10×14, 6×14, 6×11, 4×10, 4×8)",
        category: "Paper Bags & Pouches",
        description: "Durable food-grade kraft and white paper bags available in standard dimensions: 10\"×14\" (parcel/bakery), 6\"×14\" (long snacks/rolls), 6\"×11\" (standard takeaway), 4\"×10\" (cutlery/snacks), and 4\"×8\" (small pouches).",
        image: "/images/packaging/paper-bags-sizes.jpg",
      },
      {
        id: "sp-4",
        name: "Clear Disposable Glasses & Beverage Cups",
        category: "Tableware & Glassware",
        description: "Hygienic, crack-resistant transparent disposable glasses for water, juices, lassi, shakes, and cold beverages in 150ml, 200ml, 250ml, and 300ml capacities.",
        image: "/images/packaging/disposable-glass-cup.jpg",
      },
      {
        id: "sp-5",
        name: "Food-Grade Disposable Spoons & Cutlery",
        category: "Disposable Cutlery",
        description: "Sturdy, food-grade transparent and white disposable spoons, forks, and individually wrapped cutlery kits for clean and hygienic food delivery.",
        image: "/images/packaging/4cp-meal-box.jpg",
      },
      {
        id: "sp-6",
        name: "Heavy-Duty Paper Plates & Platters",
        category: "Paper Tableware",
        description: "Oil-resistant, microwave-safe biodegradable paper plates in 6-inch, 8-inch, 10-inch, and 12-inch buffet sizes for catering, parties, and street food.",
        image: "/images/packaging/disposable-meal-packaging-kit.jpg",
      },
    ],
    gallery: [
      { url: "/images/packaging/paper-bags-sizes.jpg", alt: "Eco-Friendly Paper Bags in Sizes 10x14, 6x14, 6x11, 4x10, 4x8" },
      { url: "/images/packaging/disposable-meal-packaging-kit.jpg", alt: "Complete Food Packaging Disposables Kit - 4CP, Foil Containers, Spoons, Glasses" },
      { url: "/images/packaging/4cp-meal-box.jpg", alt: "4-Compartment Bento Meal Box with Spoon" },
      { url: "/images/packaging/aluminium-foil-containers.jpg", alt: "Aluminium Foil Food Containers in Various Capacities" },
      { url: "/images/packaging/disposable-glass-cup.jpg", alt: "Hygienic Transparent Disposable Beverage Glass" },
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


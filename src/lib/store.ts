import fs from "fs";
import path from "path";
import {
  INITIAL_BUSINESSES,
  INITIAL_CATEGORIES,
  INITIAL_NEWS,
  INITIAL_CAREERS,
  BusinessRecord,
  NewsRecord,
  CareerRecord,
} from "./data";

export interface EnquiryRecord {
  id: string;
  businessId?: string;
  businessName?: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  enquiryType: string;
  subject?: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "CONTACTED" | "CONVERTED" | "CLOSED";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationRecord {
  id: string;
  careerId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt: string;
}

export interface MediaRecord {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface StoreState {
  businesses: BusinessRecord[];
  categories: { id: string; name: string; slug: string; description?: string }[];
  news: NewsRecord[];
  careers: CareerRecord[];
  enquiries: EnquiryRecord[];
  applications: ApplicationRecord[];
  media: MediaRecord[];
  settings: Record<string, string>;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function getDefaultState(): StoreState {
  return {
    businesses: INITIAL_BUSINESSES,
    categories: INITIAL_CATEGORIES,
    news: INITIAL_NEWS,
    careers: INITIAL_CAREERS,
    enquiries: [
      {
        id: "enq-1",
        businessId: "biz-1",
        businessName: "Annamrit Foods",
        fullName: "Rajesh Sharma",
        email: "rajesh.sharma@example.com",
        phone: "+91 98231 11223",
        companyName: "Vedic Retailers Ltd",
        enquiryType: "Distribution",
        subject: "Exclusive State Distribution for Cold-Pressed Oils",
        message: "We operate a retail network of 45 grocery outlets across Mumbai and Pune and would like to explore distribution rights for Annamrit Foods stone-ground flours and cold-pressed oils.",
        status: "NEW",
        adminNotes: "Promising distributor network. Initial call scheduled.",
        createdAt: "2026-10-24T14:20:00.000Z",
        updatedAt: "2026-10-24T14:20:00.000Z",
      },
      {
        id: "enq-2",
        businessId: "biz-5",
        businessName: "Sangales Packaging",
        fullName: "Ananya Deshmukh",
        email: "ananya@freshbitekitchens.in",
        phone: "+91 98450 77889",
        companyName: "FreshBite Cloud Kitchens",
        enquiryType: "Wholesale",
        subject: "Bulk Bagasse Meal Trays & Spill-Proof Containers",
        message: "We need 20,000 monthly units of 3-compartment biodegradable meal boxes for our quick service delivery locations in Western India.",
        status: "IN_PROGRESS",
        adminNotes: "Sample pack dispatched on Oct 26.",
        createdAt: "2026-10-20T10:15:00.000Z",
        updatedAt: "2026-10-26T09:30:00.000Z",
      },
      {
        id: "enq-3",
        businessId: "biz-2",
        businessName: "Sangales Farms",
        fullName: "Virendra Patil",
        email: "vpatil@krishisupply.co.in",
        phone: "+91 97654 33210",
        companyName: "Krishi Supply Agro Mandi",
        enquiryType: "Partnership",
        subject: "Contract Farming & Seasonal Fruit Offtake",
        message: "Interested in establishing forward contract purchase agreement for next season pomegranate and citrus harvest.",
        status: "CONTACTED",
        adminNotes: "Meeting at corporate office completed.",
        createdAt: "2026-10-18T16:45:00.000Z",
        updatedAt: "2026-10-22T11:00:00.000Z",
      },
    ],
    applications: [
      {
        id: "app-1",
        careerId: "car-1",
        jobTitle: "Regional Sales Manager – Food & Institutional Supplies",
        fullName: "Amitabh Joshi",
        email: "amitabh.j@example.com",
        phone: "+91 98112 44332",
        resumeUrl: "https://example.com/resumes/amitabh_joshi.pdf",
        coverLetter: "I have 5 years of experience leading HORECA food distribution across western Maharashtra and managed accounts generating 3Cr annual turnover.",
        status: "Reviewed",
        createdAt: "2026-10-22T11:30:00.000Z",
      },
    ],
    media: [
      {
        id: "med-1",
        name: "hero-cinematic.jpg",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
        size: "1.2 MB",
        type: "image/jpeg",
        uploadedAt: "2026-10-01",
      },
      {
        id: "med-2",
        name: "annamrit-produce.jpg",
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600",
        size: "950 KB",
        type: "image/jpeg",
        uploadedAt: "2026-10-02",
      },
      {
        id: "med-3",
        name: "sangales-farms-harvest.jpg",
        url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1600",
        size: "1.4 MB",
        type: "image/jpeg",
        uploadedAt: "2026-10-03",
      },
      {
        id: "med-4",
        name: "packaging-solutions.jpg",
        url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=1600",
        size: "820 KB",
        type: "image/jpeg",
        uploadedAt: "2026-10-04",
      },
    ],
    settings: {
      siteName: "SANGALES",
      descriptor: "A GROUP OF COMPANIES",
      tagline: "Building Businesses. Creating Opportunities.",
      contactEmail: "contact@sangales.com",
      contactPhone: "+91 98220 00000",
      corporateAddress: "Sangales Corporate House, India",
      primaryNavy: "#142735",
      accentGold: "#C6A66B",
    },
  };
}

export function getStore(): StoreState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const defaultState = getDefaultState();
      fs.writeFileSync(STORE_FILE, JSON.stringify(defaultState, null, 2), "utf-8");
      return defaultState;
    }
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Store read error, using default state:", err);
    return getDefaultState();
  }
}

export function saveStore(state: StoreState): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Store write error:", err);
  }
}


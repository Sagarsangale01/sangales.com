# SANGALES – A GROUP OF COMPANIES
### Official Corporate Digital Platform & Admin CMS

**Website:** [https://www.sangales.com](https://www.sangales.com)  
**Primary Brand Tagline:** *Building Businesses. Creating Opportunities.*  
**Alternative Brand Statement:** *One Vision. Multiple Businesses.*  
**Aesthetic Style:** Premium Editorial Corporate (Deep Navy `#142735`, Warm Gold `#C6A66B`, Off-white `#F7F6F2`, Charcoal `#242B30`)

---

## 1. Overview

Sangales.com serves as the centralized digital presence for **SANGALES – A GROUP OF COMPANIES**, representing a diversified Indian corporate group with operating divisions in:
1. **Annamrit Foods** (`/businesses/annamrit-foods`) – Wholesome, stone-ground flours, cold-pressed oils, and natural nutrition.
2. **Sangales Farms** (`/businesses/sangales-farms`) – Sustainable agriculture, precision orchards, and bulk produce aggregation.
3. **Sangales Enterprises** (`/businesses/sangales-enterprises`) – Institutional supplies, facility procurement, and commercial contracts.
4. **Sangales Trading** (`/businesses/sangales-trading`) – Sourcing networks and wholesale commodity distribution.
5. **Sangales Packaging** (`/businesses/sangales-packaging`) – Food-grade biodegradable packaging, barrier films, and corrugated master cartons.

*Future Incubation Pipeline:* Sangales Digital, Sangales Logistics, Sangales Ventures.

---

## 2. Technology Stack

- **Framework:** Next.js (App Router, Server Components & Route Handlers)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom editorial tokens & Manrope / Inter typography
- **Database & ORM:** PostgreSQL + Prisma ORM
- **Icons & Animation:** Lucide React, Framer Motion
- **Security:** JWT session authentication, BCrypt password hashing, Zod schema validation
- **SEO & Structured Data:** OpenGraph, Twitter Cards, dynamic `sitemap.xml`, `robots.txt`, Schema.org (Organization, LocalBusiness, NewsArticle)

---

## 3. Project Structure

```text
sangales/
├── public/
│   ├── logos/               # SVGs for corporate wordmark and operating brand logos
│   └── images/              # Visual assets
├── prisma/
│   ├── schema.prisma        # PostgreSQL Schema (User, Role, Business, Enquiry, News, Career, etc.)
│   └── seed.ts              # Initial verified business data seed script
├── src/
│   ├── app/
│   │   ├── page.tsx         # Homepage (Hero, Philosophy, Portfolio, Vision, Journey, Partnerships, News)
│   │   ├── about/           # About Us & Group Philosophy
│   │   ├── businesses/      # Business Directory with sector filter & search
│   │   │   └── [slug]/      # 13-section dynamic business profile
│   │   ├── our-vision/      # Vision, Mission, and 6 Core Values
│   │   ├── our-journey/     # Verified Milestones Timeline
│   │   ├── news/            # Corporate Press Office & Article Detail
│   │   ├── careers/         # Job Openings & Candidate Application Form
│   │   ├── contact/         # Multi-tier Corporate Enquiry & Partnership Desk
│   │   ├── privacy-policy/  # Statutory Privacy Policy
│   │   ├── terms-and-conditions/ # Terms of Use
│   │   ├── sitemap.ts       # Dynamic XML Sitemap generator
│   │   ├── robots.ts        # Search crawler directives
│   │   ├── admin/
│   │   │   ├── login/       # Secure Admin Authentication
│   │   │   ├── page.tsx     # Operations Dashboard (real stats)
│   │   │   ├── businesses/  # Portfolio Management (CRUD, ordering, status)
│   │   │   ├── enquiries/   # Lead Management (filtering, status updates, notes, CSV export)
│   │   │   ├── categories/  # Business Categories CRUD
│   │   │   ├── news/        # Press Release Editor & Publisher
│   │   │   ├── careers/     # Job Listings & Candidate Resumes
│   │   │   ├── media/       # Asset Library
│   │   │   ├── users/       # Role-Based User Governance
│   │   │   └── settings/    # Global Branding & Contact Configuration
│   │   └── api/             # REST Endpoints for Auth, Leads, Applications, CRUD
│   ├── components/          # Reusable UI & Section Components
│   ├── services/            # Database & Business Domain Services
│   └── lib/                 # Auth, DB, utilities, verified seed store
```

---

## 4. Getting Started

### 4.1 Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4.2 Admin CMS Access

- **Route:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email:** `admin@sangales.com`
- **Default Password:** `SangalesAdmin2026!`

*(Credentials are configurable in `.env`)*

---

## 5. PostgreSQL & Prisma Configuration

The project is configured for PostgreSQL. To synchronize with a live PostgreSQL instance:

1. Update `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sangales_db?schema=public"
   ```
2. Push database schema:
   ```bash
   npx prisma db push
   ```

*Note: The platform features an intelligent resilience layer (`src/lib/store.ts`) that guarantees complete functionality and full persistence even prior to local database provisioning!*


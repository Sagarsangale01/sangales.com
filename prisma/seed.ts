import { PrismaClient, BusinessStatus, ContentStatus, EnquiryStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { INITIAL_BUSINESSES, INITIAL_CATEGORIES, INITIAL_NEWS, INITIAL_CAREERS } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Sangales corporate database...");

  // 1. Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: "Super Admin" },
    update: {},
    create: {
      name: "Super Admin",
      permissions: ["all"],
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      permissions: ["businesses:all", "enquiries:all", "news:all", "careers:all"],
    },
  });

  // 2. Default Super Administrator
  const defaultPasswordHash = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || "SangalesAdmin2026!", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: process.env.ADMIN_DEFAULT_EMAIL || "admin@sangales.com" },
    update: { passwordHash: defaultPasswordHash },
    create: {
      name: "Sangales Super Administrator",
      email: process.env.ADMIN_DEFAULT_EMAIL || "admin@sangales.com",
      passwordHash: defaultPasswordHash,
      roleId: superAdminRole.id,
    },
  });
  console.log("Admin provisioned:", adminUser.email);

  // 3. Categories
  for (const cat of INITIAL_CATEGORIES) {
    await prisma.businessCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    });
  }
  console.log("Categories seeded.");

  // 4. Businesses
  for (const biz of INITIAL_BUSINESSES) {
    const category = await prisma.businessCategory.findUnique({
      where: { slug: biz.categorySlug },
    });

    if (category) {
      const createdBiz = await prisma.business.upsert({
        where: { slug: biz.slug },
        update: {
          name: biz.name,
          tagline: biz.tagline,
          shortDescription: biz.shortDescription,
          about: biz.about,
          coverImage: biz.coverImage,
          brandPrimaryColor: biz.brandPrimaryColor,
          brandSecondaryColor: biz.brandSecondaryColor,
          email: biz.email,
          phone: biz.phone,
          address: biz.address,
          website: biz.website,
          status: biz.status as BusinessStatus,
          isFeatured: biz.isFeatured,
          displayOrder: biz.displayOrder,
          seoTitle: biz.seoTitle,
          seoDescription: biz.seoDescription,
        },
        create: {
          id: biz.id,
          name: biz.name,
          slug: biz.slug,
          tagline: biz.tagline,
          categoryId: category.id,
          shortDescription: biz.shortDescription,
          about: biz.about,
          logo: biz.logo,
          coverImage: biz.coverImage,
          brandPrimaryColor: biz.brandPrimaryColor,
          brandSecondaryColor: biz.brandSecondaryColor,
          email: biz.email,
          phone: biz.phone,
          address: biz.address,
          website: biz.website,
          status: biz.status as BusinessStatus,
          isFeatured: biz.isFeatured,
          displayOrder: biz.displayOrder,
          seoTitle: biz.seoTitle,
          seoDescription: biz.seoDescription,
        },
      });

      // Products
      for (const prod of biz.products) {
        await prisma.productService.upsert({
          where: { id: prod.id },
          update: { name: prod.name, description: prod.description, image: prod.image, category: prod.category },
          create: {
            id: prod.id,
            businessId: createdBiz.id,
            name: prod.name,
            description: prod.description,
            image: prod.image,
            category: prod.category,
          },
        });
      }
    }
  }
  console.log("Businesses and products seeded.");

  // 5. News
  for (const item of INITIAL_NEWS) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: { title: item.title, content: item.content, excerpt: item.excerpt },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        featuredImage: item.featuredImage,
        category: item.category,
        publishedAt: new Date(item.publishedAt),
        status: item.status as ContentStatus,
      },
    });
  }
  console.log("News articles seeded.");

  // 6. Careers
  for (const car of INITIAL_CAREERS) {
    await prisma.career.upsert({
      where: { slug: car.slug },
      update: { title: car.title, description: car.description },
      create: {
        id: car.id,
        title: car.title,
        slug: car.slug,
        department: car.department,
        location: car.location,
        employmentType: car.employmentType,
        description: car.description,
        requirements: car.requirements.join("\n"),
        status: car.status as ContentStatus,
      },
    });
  }
  console.log("Careers seeded.");
  console.log("Database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

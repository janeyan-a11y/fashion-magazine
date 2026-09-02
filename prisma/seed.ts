// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { MAGAZINES } from "../src/lib/constants";

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? "file:./dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding magazines...");

  for (const mag of MAGAZINES) {
    await prisma.magazine.upsert({
      where: { slug: mag.slug },
      update: {
        name: mag.name,
        nameZh: mag.nameZh,
        websiteUrl: mag.websiteUrl,
        scrapeUrl: mag.scrapeUrl,
        language: mag.language,
        country: mag.country,
        sortOrder: mag.sortOrder,
      },
      create: {
        name: mag.name,
        nameZh: mag.nameZh,
        slug: mag.slug,
        websiteUrl: mag.websiteUrl,
        scrapeUrl: mag.scrapeUrl,
        language: mag.language,
        country: mag.country,
        sortOrder: mag.sortOrder,
      },
    });
  }

  console.log(`Seeded ${MAGAZINES.length} magazines.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
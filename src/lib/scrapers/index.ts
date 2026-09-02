import type { BaseScraper } from "./base";
import { VogueChinaScraper } from "./vogue-cn";
import { VogueUSScraper } from "./vogue-us";
import { VogueUKScraper } from "./vogue-uk";
import { ElleChinaScraper } from "./elle-cn";
import { ElleUSScraper } from "./elle-us";
import { BazaarChinaScraper } from "./bazaar-cn";
import { BazaarUSScraper } from "./bazaar-us";
import { MarieClaireChinaScraper } from "./marie-claire-cn";
import { CosmoChinaScraper } from "./cosmo-cn";
import { GQChinaScraper } from "./gq-cn";
import { GQUSScraper } from "./gq-us";
import { EsquireChinaScraper } from "./esquire-cn";
import { ViViScraper } from "./vivi-jp";
import { RayScraper } from "./ray-jp";
import { CanCamScraper } from "./cancam-jp";
import { WMagazineScraper } from "./w-magazine";
import { IDMagazineScraper } from "./i-d";
import { DazedKoreaScraper } from "./dazed-kr";
import { DazedScraper } from "./dazed";
import { prisma } from "@/lib/prisma";

const scraperRegistry = new Map<string, BaseScraper>([
  ["vogue-china", new VogueChinaScraper()],
  ["vogue-us", new VogueUSScraper()],
  ["vogue-uk", new VogueUKScraper()],
  ["elle-china", new ElleChinaScraper()],
  ["elle-us", new ElleUSScraper()],
  ["bazaar-china", new BazaarChinaScraper()],
  ["bazaar-us", new BazaarUSScraper()],
  ["marie-claire-china", new MarieClaireChinaScraper()],
  ["cosmo-china", new CosmoChinaScraper()],
  ["gq-china", new GQChinaScraper()],
  ["gq-us", new GQUSScraper()],
  ["esquire-china", new EsquireChinaScraper()],
  ["vivi", new ViViScraper()],
  ["ray", new RayScraper()],
  ["cancam", new CanCamScraper()],
  ["w-magazine", new WMagazineScraper()],
  ["i-d", new IDMagazineScraper()],
  ["dazed-korea", new DazedKoreaScraper()],
  ["dazed", new DazedScraper()],
]);

export async function scrapeAllMagazines(): Promise<{
  total: number;
  success: number;
  failed: number;
  newIssues: number;
}> {
  const magazines = await prisma.magazine.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  let success = 0;
  let failed = 0;
  let newIssues = 0;

  for (const mag of magazines) {
    const scraper = scraperRegistry.get(mag.slug);
    const startedAt = Date.now();

    if (!scraper) {
      console.warn(`No scraper registered for ${mag.slug}, skipping.`);
      await prisma.scrapeLog.create({
        data: {
          magazineId: mag.id,
          targetType: "magazine",
          status: "failed",
          errorMessage: "No scraper registered",
          startedAt: new Date(startedAt),
          finishedAt: new Date(),
          durationMs: Date.now() - startedAt,
        },
      });
      failed++;
      continue;
    }

    try {
      console.log(`Scraping ${mag.name}...`);
      const result = await scraper.scrape();
      const isNew = await upsertIssue(mag.id, result);

      if (isNew) newIssues++;

      const durationMs = Date.now() - startedAt;
      await prisma.scrapeLog.create({
        data: {
          magazineId: mag.id,
          targetType: "magazine",
          status: "success",
          itemsScraped: result.articles.length + 1,
          itemsNew: isNew ? 1 : 0,
          startedAt: new Date(startedAt),
          finishedAt: new Date(),
          durationMs,
        },
      });

      console.log(`  ✓ ${mag.name}: ${result.articles.length} articles (${isNew ? "new issue" : "updated"}) [${durationMs}ms]`);
      success++;
    } catch (err) {
      const durationMs = Date.now() - startedAt;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(`  ✗ ${mag.name}: ${message}`);

      await prisma.scrapeLog.create({
        data: {
          magazineId: mag.id,
          targetType: "magazine",
          status: "failed",
          errorMessage: message,
          startedAt: new Date(startedAt),
          finishedAt: new Date(),
          durationMs,
        },
      });
      failed++;
    }

    // Rate-limit: wait 3-5 seconds between magazines
    await new Promise((r) => setTimeout(r, 3000 + Math.random() * 2000));
  }

  return { total: magazines.length, success, failed, newIssues };
}

async function upsertIssue(
  magazineId: string,
  result: { issueDate: string; coverUrl: string; coverAlt?: string; title?: string; description?: string; articles: { title: string; author?: string; summary?: string; contentHtml?: string; imageUrls: string[]; sourceUrl: string }[] }
): Promise<boolean> {
  // Check if issue already exists
  const existing = await prisma.issue.findUnique({
    where: { magazineId_issueDate: { magazineId, issueDate: result.issueDate } },
  });

  const isNew = !existing;

  const issue = await prisma.issue.upsert({
    where: { magazineId_issueDate: { magazineId, issueDate: result.issueDate } },
    update: {
      coverUrl: result.coverUrl,
      coverAlt: result.coverAlt,
      title: result.title,
      description: result.description,
    },
    create: {
      magazineId,
      issueDate: result.issueDate,
      coverUrl: result.coverUrl,
      coverAlt: result.coverAlt,
      title: result.title,
      description: result.description,
      isNew: true,
    },
  });

  // Upsert articles if new issue
  if (isNew && result.articles.length > 0) {
    for (const article of result.articles) {
      await prisma.article.create({
        data: {
          magazineId,
          issueId: issue.id,
          title: article.title,
          author: article.author,
          summary: article.summary,
          contentHtml: article.contentHtml,
          imageUrls: JSON.stringify(article.imageUrls),
          sourceUrl: article.sourceUrl,
        },
      });
    }
  }

  return isNew;
}

export { scraperRegistry };
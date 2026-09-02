import { BaseScraper } from "./base";
import type { ScrapedArticle } from "../types";

export class DazedScraper extends BaseScraper {
  name = "Dazed";
  scrapeUrl = "https://www.dazeddigital.com/fashion/";

  parseCover(html: string) {
    const $ = this.$(html);
    const img = $('meta[property="og:image"]').attr("content") ?? "";
    const title = $('meta[property="og:title"]').attr("content") ?? undefined;
    return { coverUrl: img, title };
  }

  parseIssueDate(html: string): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  parseArticles(html: string): ScrapedArticle[] {
    const $ = this.$(html);
    const articles: ScrapedArticle[] = [];
    $("article, .feature, .story-card").each((_, el) => {
      const $el = $(el);
      const title = $el.find("h2, h3, .title").first().text().trim();
      const link = $el.find("a").first().attr("href") ?? "";
      const img = $el.find("img").first().attr("src") ?? "";
      if (title && title.length > 2) {
        articles.push({
          title,
          imageUrls: img ? [img] : [],
          sourceUrl: link.startsWith("http") ? link : `https://www.dazeddigital.com${link}`,
        });
      }
    });
    return articles.slice(0, 20);
  }
}
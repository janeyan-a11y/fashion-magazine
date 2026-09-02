import { BaseScraper } from "./base";
import type { ScrapedArticle } from "../types";

export class RayScraper extends BaseScraper {
  name = "Ray";
  scrapeUrl = "https://ray-web.jp/";

  parseCover(html: string) {
    const $ = this.$(html);
    const img = $('meta[property="og:image"]').attr("content") ?? "";
    const title = $("h1").first().text().trim() || undefined;
    return { coverUrl: img, title };
  }

  parseIssueDate(html: string): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  parseArticles(html: string): ScrapedArticle[] {
    const $ = this.$(html);
    const articles: ScrapedArticle[] = [];
    $("article, .post-item, .entry-item").each((_, el) => {
      const $el = $(el);
      const title = $el.find("h2, h3, .entry-title").first().text().trim();
      const link = $el.find("a").first().attr("href") ?? "";
      const img = $el.find("img").first().attr("src") ?? "";
      if (title && title.length > 2) {
        articles.push({
          title,
          imageUrls: img ? [img] : [],
          sourceUrl: link.startsWith("http") ? link : `https://ray-web.jp${link}`,
        });
      }
    });
    return articles.slice(0, 20);
  }
}
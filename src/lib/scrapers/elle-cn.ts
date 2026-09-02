import { BaseScraper } from "./base";
import type { ScrapedArticle } from "../types";

export class ElleChinaScraper extends BaseScraper {
  name = "ELLE China";
  scrapeUrl = "https://www.ellechina.com/magazine/";

  parseCover(html: string) {
    const $ = this.$(html);
    const img = $('meta[property="og:image"]').attr("content") ?? $(".magazine-cover img").first().attr("src") ?? "";
    const title = $("h1, .magazine-title").first().text().trim() || undefined;
    return { coverUrl: img, title };
  }

  parseIssueDate(html: string): string {
    const $ = this.$(html);
    const text = $(".magazine-date, .issue-date, time").first().text().trim();
    const match = text.match(/(\d{4})[年\s/-]*(\d{1,2})/);
    if (match) return `${match[1]}-${match[2].padStart(2, "0")}`;
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  parseArticles(html: string): ScrapedArticle[] {
    const $ = this.$(html);
    const articles: ScrapedArticle[] = [];
    $(".article-item, .post-item, .magazine-content a").each((_, el) => {
      const $el = $(el);
      const $link = $el.find("a").first().length ? $el.find("a").first() : $el;
      const title = $el.find(".title, h3").first().text().trim() || $link.text().trim();
      const link = $link.attr("href") ?? "";
      const img = $el.find("img").first().attr("src") ?? "";
      if (title && title.length > 2) {
        articles.push({
          title,
          imageUrls: img ? [img] : [],
          sourceUrl: link.startsWith("http") ? link : `https://www.ellechina.com${link}`,
        });
      }
    });
    return articles.slice(0, 20);
  }
}
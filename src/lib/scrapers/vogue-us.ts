import { BaseScraper } from "./base";
import type { ScrapedArticle } from "../types";

export class VogueUSScraper extends BaseScraper {
  name = "Vogue US";
  scrapeUrl = "https://www.vogue.com/fashion";

  parseCover(html: string) {
    const $ = this.$(html);
    const img = $('meta[property="og:image"]').attr("content") ?? $(".SummaryItemImage-image").first().attr("src") ?? "";
    const title = $('meta[property="og:title"]').attr("content") ?? undefined;
    return { coverUrl: img, title };
  }

  parseIssueDate(html: string): string {
    const $ = this.$(html);
    const text = $("time").first().text().trim() || $(".SummaryItemHedDate").first().text().trim();
    const date = new Date(text);
    if (!isNaN(date.getTime())) return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  parseArticles(html: string): ScrapedArticle[] {
    const $ = this.$(html);
    const articles: ScrapedArticle[] = [];
    $(".SummaryItemWrapper, .SummaryItem").each((_, el) => {
      const $el = $(el);
      const title = $el.find(".SummaryItemHed").text().trim() || $el.find("h3").text().trim();
      const link = $el.find("a").first().attr("href") ?? "";
      const img = $el.find("img").first().attr("src") ?? "";
      const summary = $el.find(".SummaryItemDek").text().trim() || undefined;
      if (title && title.length > 2) {
        articles.push({
          title,
          summary,
          imageUrls: img ? [img] : [],
          sourceUrl: link.startsWith("http") ? link : `https://www.vogue.com${link}`,
        });
      }
    });
    return articles.slice(0, 20);
  }
}
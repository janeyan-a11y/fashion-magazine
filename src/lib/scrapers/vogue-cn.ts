import { BaseScraper } from "./base";
import type { ScrapedArticle } from "../types";

export class VogueChinaScraper extends BaseScraper {
  name = "Vogue China";
  scrapeUrl = "https://www.vogue.com.cn/magazine/";

  parseCover(html: string) {
    const $ = this.$(html);
    const img = $(".magazine-cover img, .cover-img img, .magazine-item img").first();
    const coverUrl = img.attr("src") ?? "";
    const coverAlt = img.attr("alt") ?? undefined;
    const title = $(".magazine-title, .issue-title, h1").first().text().trim() || undefined;
    return { coverUrl: coverUrl.startsWith("//") ? `https:${coverUrl}` : coverUrl, coverAlt, title };
  }

  parseIssueDate(html: string): string {
    const $ = this.$(html);
    const text = $(".magazine-date, .issue-date, .magazine-item .date").first().text().trim();
    const match = text.match(/(\d{4})[年\s/-]*(\d{1,2})/);
    if (match) return `${match[1]}-${match[2].padStart(2, "0")}`;
    // Fallback to current month
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  parseArticles(html: string): ScrapedArticle[] {
    const $ = this.$(html);
    const articles: ScrapedArticle[] = [];
    $(".article-item, .magazine-article, .content-item a, .article-list li").each((_, el) => {
      const $el = $(el);
      const $link = $el.find("a").first() || $el;
      const title = $el.find(".title, h3, h4").first().text().trim() || $link.text().trim();
      const link = $link.attr("href") ?? "";
      const img = $el.find("img").first().attr("src") ?? "";
      if (title && title.length > 2) {
        articles.push({
          title,
          imageUrls: img ? [img.startsWith("//") ? `https:${img}` : img] : [],
          sourceUrl: link.startsWith("http") ? link : `https://www.vogue.com.cn${link}`,
        });
      }
    });
    return articles.slice(0, 20);
  }
}
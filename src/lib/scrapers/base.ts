import * as cheerio from "cheerio";
import type { ScrapeResult, ScrapedArticle } from "../types";

export abstract class BaseScraper {
  abstract name: string;
  abstract scrapeUrl: string;

  async fetchPage(url: string): Promise<string> {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,ko;q=0.6",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }

    return res.text();
  }

  protected $(html: string): cheerio.CheerioAPI {
    return cheerio.load(html);
  }

  abstract parseCover(html: string): {
    coverUrl: string;
    coverAlt?: string;
    title?: string;
  };

  abstract parseIssueDate(html: string): string;

  abstract parseArticles(html: string): ScrapedArticle[];

  async scrape(): Promise<ScrapeResult> {
    const html = await this.fetchPage(this.scrapeUrl);
    const cover = this.parseCover(html);
    const issueDate = this.parseIssueDate(html);
    const articles = this.parseArticles(html);

    return {
      issueDate,
      coverUrl: cover.coverUrl,
      coverAlt: cover.coverAlt,
      title: cover.title,
      articles,
    };
  }
}
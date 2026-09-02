export interface ScrapeResult {
  issueDate: string;
  coverUrl: string;
  coverAlt?: string;
  title?: string;
  description?: string;
  articles: ScrapedArticle[];
}

export interface ScrapedArticle {
  title: string;
  author?: string;
  summary?: string;
  contentHtml?: string;
  imageUrls: string[];
  sourceUrl: string;
}

export interface MagazineWithIssues {
  id: string;
  name: string;
  nameZh: string | null;
  slug: string;
  country: string;
  category: string;
  websiteUrl: string;
  issues: {
    id: string;
    issueDate: string;
    coverUrl: string;
    title: string | null;
    isNew: boolean;
    createdAt: Date;
  }[];
}

export interface IssueWithArticles {
  id: string;
  issueDate: string;
  coverUrl: string;
  coverAlt: string | null;
  title: string | null;
  description: string | null;
  sourceUrl: string | null;
  magazine: {
    id: string;
    name: string;
    nameZh: string | null;
    slug: string;
    country: string;
  };
  articles: {
    id: string;
    title: string;
    author: string | null;
    summary: string | null;
    imageUrls: string;
    sourceUrl: string | null;
  }[];
}
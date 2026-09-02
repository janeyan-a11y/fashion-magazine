export const MAGAZINES = [
  // === China ===
  { name: "Vogue China", nameZh: "服饰与美容", slug: "vogue-china", websiteUrl: "https://www.vogue.com.cn", scrapeUrl: "https://www.vogue.com.cn/magazine/", language: "zh", country: "CN", category: "women", sortOrder: 1 },
  { name: "ELLE China", nameZh: "世界时装之苑", slug: "elle-china", websiteUrl: "https://www.ellechina.com", scrapeUrl: "https://www.ellechina.com/magazine/", language: "zh", country: "CN", category: "women", sortOrder: 2 },
  { name: "Harper's BAZAAR China", nameZh: "时尚芭莎", slug: "bazaar-china", websiteUrl: "https://www.bazaar.com.cn", scrapeUrl: "https://www.bazaar.com.cn/", language: "zh", country: "CN", category: "women", sortOrder: 3 },
  { name: "Marie Claire China", nameZh: "嘉人", slug: "marie-claire-china", websiteUrl: "https://www.marieclaire.com.cn", scrapeUrl: "https://www.marieclaire.com.cn/", language: "zh", country: "CN", category: "women", sortOrder: 4 },
  { name: "Cosmopolitan China", nameZh: "时尚COSMO", slug: "cosmo-china", websiteUrl: "https://www.cosmopolitan.com.cn", scrapeUrl: "https://www.cosmopolitan.com.cn/", language: "zh", country: "CN", category: "women", sortOrder: 5 },
  { name: "GQ China", nameZh: "智族", slug: "gq-china", websiteUrl: "https://www.gq.com.cn", scrapeUrl: "https://www.gq.com.cn/", language: "zh", country: "CN", category: "men", sortOrder: 6 },
  { name: "Esquire China", nameZh: "时尚先生", slug: "esquire-china", websiteUrl: "https://www.esquire.com.cn", scrapeUrl: "https://www.esquire.com.cn/", language: "zh", country: "CN", category: "men", sortOrder: 7 },

  // === US ===
  { name: "Vogue US", nameZh: null, slug: "vogue-us", websiteUrl: "https://www.vogue.com", scrapeUrl: "https://www.vogue.com/fashion", language: "en", country: "US", category: "women", sortOrder: 8 },
  { name: "ELLE US", nameZh: null, slug: "elle-us", websiteUrl: "https://www.elle.com", scrapeUrl: "https://www.elle.com/fashion/", language: "en", country: "US", category: "women", sortOrder: 9 },
  { name: "Harper's BAZAAR US", nameZh: null, slug: "bazaar-us", websiteUrl: "https://www.harpersbazaar.com", scrapeUrl: "https://www.harpersbazaar.com/fashion/", language: "en", country: "US", category: "women", sortOrder: 10 },
  { name: "GQ US", nameZh: null, slug: "gq-us", websiteUrl: "https://www.gq.com", scrapeUrl: "https://www.gq.com/fashion/", language: "en", country: "US", category: "men", sortOrder: 11 },
  { name: "W Magazine", nameZh: null, slug: "w-magazine", websiteUrl: "https://www.wmagazine.com", scrapeUrl: "https://www.wmagazine.com/fashion/", language: "en", country: "US", category: "women", sortOrder: 12 },

  // === UK ===
  { name: "Vogue UK", nameZh: null, slug: "vogue-uk", websiteUrl: "https://www.vogue.co.uk", scrapeUrl: "https://www.vogue.co.uk/fashion", language: "en", country: "UK", category: "women", sortOrder: 13 },
  { name: "i-D Magazine", nameZh: null, slug: "i-d", websiteUrl: "https://i-d.co", scrapeUrl: "https://i-d.co/fashion/", language: "en", country: "UK", category: "women", sortOrder: 14 },

  // === Japan ===
  { name: "ViVi", nameZh: null, slug: "vivi", websiteUrl: "https://www.vivi.tv", scrapeUrl: "https://www.vivi.tv/magazine/", language: "ja", country: "JP", category: "women", sortOrder: 15 },
  { name: "Ray", nameZh: null, slug: "ray", websiteUrl: "https://ray-web.jp", scrapeUrl: "https://ray-web.jp/", language: "ja", country: "JP", category: "women", sortOrder: 16 },
  { name: "CanCam", nameZh: null, slug: "cancam", websiteUrl: "https://cancam.jp", scrapeUrl: "https://cancam.jp/magazine/", language: "ja", country: "JP", category: "women", sortOrder: 17 },

  // === Korea ===
  { name: "Dazed Korea", nameZh: null, slug: "dazed-korea", websiteUrl: "https://www.dazedkorea.com", scrapeUrl: "https://www.dazedkorea.com/", language: "ko", country: "KR", category: "women", sortOrder: 18 },

  // === EU ===
  { name: "Dazed", nameZh: null, slug: "dazed", websiteUrl: "https://www.dazeddigital.com", scrapeUrl: "https://www.dazeddigital.com/fashion/", language: "en", country: "EU", category: "women", sortOrder: 19 },
];

export const COUNTRY_LABELS: Record<string, string> = {
  CN: "中国",
  US: "美国",
  UK: "英国",
  JP: "日本",
  KR: "韩国",
  EU: "欧洲",
};

export const CATEGORY_LABELS: Record<string, string> = {
  women: "女装",
  men: "男装",
  lifestyle: "生活",
};

export const XHS_SEARCH_KEYWORDS = [
  "时尚杂志封面",
  "Vogue封面",
  "ELLE封面",
  "时尚芭莎封面",
  "嘉人封面",
  "COSMO封面",
  "GQ封面",
  "时尚杂志内页",
  "杂志大片",
  "ViVi杂志",
  "W杂志封面",
  "Dazed封面",
  "时尚杂志穿搭",
  "杂志封面大片",
  "时尚杂志最新刊",
];
import { prisma } from "@/lib/prisma";
import { XHS_SEARCH_KEYWORDS } from "@/lib/constants";

export async function scrapeXiaohongshu(): Promise<{
  total: number;
  new: number;
}> {
  // Dynamic import of playwright to avoid bundling in Next.js
  const { chromium } = await import("playwright");

  console.log("Launching browser for XHS scraping...");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    viewport: { width: 1440, height: 900 },
    locale: "zh-CN",
  });

  let total = 0;
  let newPosts = 0;

  for (const keyword of XHS_SEARCH_KEYWORDS) {
    const startedAt = Date.now();
    try {
      console.log(`  Searching XHS: "${keyword}"...`);
      const page = await context.newPage();
      await page.goto(
        `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(keyword)}&source=web_search_result_notes`,
        { waitUntil: "networkidle", timeout: 30000 }
      );

      // Wait for results
      await page.waitForTimeout(3000);

      // Extract posts
      const posts = await page.evaluate(() => {
        const items = document.querySelectorAll(".note-item, .feeds-page .note-item");
        return Array.from(items)
          .slice(0, 20)
          .map((item) => {
            const link = item.querySelector("a")?.getAttribute("href") ?? "";
            const cover = item.querySelector("img")?.getAttribute("src") ?? "";
            const title = item.querySelector(".title, .note-title")?.textContent?.trim() ?? "";
            const authorEl = item.querySelector(".author .name, .author-name");
            const authorName = authorEl?.textContent?.trim() ?? "";
            const likeEl = item.querySelector(".like-wrapper .count, .like-count");
            const likeCount = likeEl?.textContent?.trim() ?? "0";
            return {
              externalId: link.split("/").filter(Boolean).pop() ?? "",
              cover,
              title,
              authorName,
              likeCount: parseLikeCount(likeCount),
              sourceUrl: link.startsWith("http") ? link : `https://www.xiaohongshu.com${link}`,
            };
          });
      });

      await page.close();

      for (const post of posts) {
        if (!post.externalId) continue;
        total++;

        try {
          const existing = await prisma.socialPost.findUnique({
            where: { platform_externalId: { platform: "xiaohongshu", externalId: post.externalId } },
          });

          if (existing) {
            // Update like count
            await prisma.socialPost.update({
              where: { platform_externalId: { platform: "xiaohongshu", externalId: post.externalId } },
              data: { likeCount: post.likeCount },
            });
          } else {
            await prisma.socialPost.create({
              data: {
                platform: "xiaohongshu",
                externalId: post.externalId,
                authorName: post.authorName || "未知用户",
                title: post.title || "无标题",
                images: JSON.stringify([post.cover]),
                likeCount: post.likeCount,
                sourceUrl: post.sourceUrl,
                searchKeyword: keyword,
              },
            });
            newPosts++;
          }
        } catch {
          // Skip individual post errors
        }
      }

      const durationMs = Date.now() - startedAt;
      console.log(`    ✓ "${keyword}": ${posts.length} posts, ${newPosts} new [${durationMs}ms]`);
    } catch (err) {
      const durationMs = Date.now() - startedAt;
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(`    ✗ "${keyword}": ${message} [${durationMs}ms]`);
    }

    // Rate-limit: wait 5-10s between searches
    await new Promise((r) => setTimeout(r, 5000 + Math.random() * 5000));
  }

  await browser.close();

  await prisma.scrapeLog.create({
    data: {
      targetType: "social",
      status: "success",
      itemsScraped: total,
      itemsNew: newPosts,
      startedAt: new Date(),
      finishedAt: new Date(),
    },
  });

  return { total, new: newPosts };
}

function parseLikeCount(text: string): number {
  const cleaned = text.replace(/[^0-9.]/g, "");
  if (cleaned.includes(".")) {
    // "1.2万" => 12000
    const num = parseFloat(cleaned);
    return text.includes("万") ? Math.round(num * 10000) : Math.round(num);
  }
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? 0 : num;
}
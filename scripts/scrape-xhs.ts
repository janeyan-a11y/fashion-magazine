import { scrapeXiaohongshu } from "../src/lib/scrapers/xiaohongshu";

async function main() {
  console.log("=== Xiaohongshu Scraper ===\n");
  const startedAt = Date.now();

  try {
    const result = await scrapeXiaohongshu();
    const duration = ((Date.now() - startedAt) / 1000).toFixed(1);

    console.log(`\n=== Done in ${duration}s ===`);
    console.log(`Total posts: ${result.total}, New: ${result.new}`);
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
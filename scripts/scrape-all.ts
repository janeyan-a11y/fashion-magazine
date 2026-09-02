import { scrapeAllMagazines } from "../src/lib/scrapers";

async function main() {
  console.log("=== Fashion Magazine Scraper ===\n");
  const startedAt = Date.now();

  try {
    const result = await scrapeAllMagazines();
    const duration = ((Date.now() - startedAt) / 1000).toFixed(1);

    console.log(`\n=== Done in ${duration}s ===`);
    console.log(`Total: ${result.total}, Success: ${result.success}, Failed: ${result.failed}, New Issues: ${result.newIssues}`);
  } catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
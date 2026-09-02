import { prisma } from "@/lib/prisma";
import { HomeClient } from "./HomeClient";

export default async function HomePage() {
  const issues = await prisma.issue.findMany({
    include: {
      magazine: {
        select: { name: true, slug: true, country: true, category: true, sortOrder: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 40,
  });

  const heroIssues = issues.slice(0, 5).map((i) => ({
    id: i.id,
    coverUrl: i.coverUrl,
    title: i.title,
    issueDate: i.issueDate,
    magazine: { name: i.magazine.name, nameZh: null as string | null },
  }));

  const socialPosts = await prisma.socialPost.findMany({
    select: {
      id: true,
      title: true,
      authorName: true,
      images: true,
      likeCount: true,
      sourceUrl: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const serializedIssues = issues.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
    scrapedAt: i.scrapedAt.toISOString(),
  }));

  return <HomeClient issues={serializedIssues} heroIssues={heroIssues} socialPosts={socialPosts} />;
}
import { prisma } from "@/lib/prisma";
import { IssueDetail } from "@/components/issue/IssueDetail";
import { notFound } from "next/navigation";

export default async function IssuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id },
    include: {
      magazine: { select: { id: true, name: true, nameZh: true, slug: true, country: true } },
      articles: { orderBy: { order: "asc" }, take: 50 },
    },
  });

  if (!issue) notFound();

  // Get previous issues of this magazine
  const prevIssues = await prisma.issue.findMany({
    where: { magazineId: issue.magazineId, id: { not: issue.id } },
    select: { id: true, issueDate: true, coverUrl: true, title: true },
    orderBy: { issueDate: "desc" },
    take: 12,
  });

  const serialized = {
    ...issue,
    createdAt: issue.createdAt.toISOString(),
    scrapedAt: issue.scrapedAt.toISOString(),
    articles: issue.articles.map((a: any) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      scrapedAt: a.scrapedAt.toISOString(),
    })),
  };

  return <IssueDetail issue={serialized} prevIssues={prevIssues} />;
}
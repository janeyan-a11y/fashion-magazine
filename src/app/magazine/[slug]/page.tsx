import { prisma } from "@/lib/prisma";
import { Timeline } from "@/components/magazine/Timeline";
import { notFound } from "next/navigation";

export default async function MagazinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const magazine = await prisma.magazine.findUnique({
    where: { slug },
    include: {
      issues: {
        orderBy: { issueDate: "desc" },
        select: { id: true, issueDate: true, coverUrl: true, title: true, isNew: true },
      },
    },
  });

  if (!magazine) notFound();

  const serialized = {
    ...magazine,
    createdAt: magazine.createdAt.toISOString(),
    updatedAt: magazine.updatedAt.toISOString(),
    issues: magazine.issues.map((i) => ({
      ...i,
    })),
  };

  return <Timeline magazine={serialized} />;
}
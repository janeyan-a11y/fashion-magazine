import { prisma } from "@/lib/prisma";
import { SocialClient } from "./SocialClient";

export default async function SocialPage() {
  const posts = await prisma.socialPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  const serialized = posts.map((p) => ({
    ...p,
    scrapedAt: p.scrapedAt.toISOString(),
    createdAt: p.createdAt.toISOString(),
  }));

  return <SocialClient posts={serialized} />;
}
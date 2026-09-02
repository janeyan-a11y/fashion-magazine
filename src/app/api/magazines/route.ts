import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const magazines = await prisma.magazine.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      nameZh: true,
      slug: true,
      country: true,
      language: true,
      websiteUrl: true,
    },
  });
  return NextResponse.json(magazines);
}
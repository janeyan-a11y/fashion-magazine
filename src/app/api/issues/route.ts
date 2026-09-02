import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const magazine = searchParams.get("magazine");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "30"), 50);

  const where = magazine ? { magazine: { slug: magazine } } : {};

  const [issues, total] = await Promise.all([
    prisma.issue.findMany({
      where,
      include: {
        magazine: { select: { name: true, slug: true, country: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.issue.count({ where }),
  ]);

  return NextResponse.json({ issues, total, page, totalPages: Math.ceil(total / limit) });
}
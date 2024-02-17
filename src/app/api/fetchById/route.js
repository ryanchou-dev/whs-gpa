import { db } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === "POST") {
    const { id } = await req.json();

    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    const classes = await db.class.findMany({
      where: {
        authorId: user.id,
      },
    });

    return NextResponse.json({ classes, userEmail: user.email });
  }
}

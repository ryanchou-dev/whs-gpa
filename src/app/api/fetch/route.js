import { getServerSession } from "next-auth";
import { authOptions } from "@/app/db/authOptions";
import { db } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET(req) {
	if (req.method === "GET") {
		const session = await getServerSession(authOptions);

		if (session) {
			const user = await db.user.findUnique({
				where: {
					email: session.user?.email || "",
				},
			});

			const classes = await db.class.findMany({
				where: {
					authorId: user.id,
				},
			});

			return NextResponse.json(classes);
		} else {
			return new Response(null, { status: 401, statusText: "unauthorized" });
		}
	}
}

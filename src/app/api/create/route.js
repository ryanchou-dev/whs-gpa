import { getServerSession } from "next-auth";
import { authOptions } from "@/app/db/authOptions";
import { db } from "@/app/db/db";

export async function POST(req) {
	if (req.method === "POST") {
		const { name, grade, credits, courseType, year } = await req.json();
		const session = await getServerSession(authOptions);

		if (!name || !grade || !credits || !courseType || !year) {
			return new Response(null, {
				status: 400,
				statusText: "bad-request",
			});
		}
		if (session) {
			const user = await db.user.findFirst({
				where: {
					email: session.user.email,
				},
			});

			if (user) {
				const result = await db.class.create({
					data: {
						name,
						grade,
						credits,
						courseType,
						year,
						authorId: user.id,
					},
				});

				if (!result) {
					return new Response(null, {
						status: 500,
						statusText: "internal-server-error",
					});
				}

				return new Response(JSON.stringify(result), {
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
		}
	}
}

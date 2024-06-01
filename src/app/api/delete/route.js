import { getServerSession } from "next-auth";
import { authOptions } from "@/app/db/authOptions";
import { db } from "@/app/db/db";

export async function POST(req) {
	if (req.method === "POST") {
		const { id } = await req.json();
		const session = await getServerSession(authOptions);

		if (!id) {
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
				const result = await db.class.delete({
					where: {
						id: id,
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

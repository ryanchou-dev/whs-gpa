import { getServerSession } from "next-auth";
import { authOptions } from "@/app/db/authOptions";
import { db } from "@/app/db/db";

export async function POST(req) {
	if (req.method === "POST") {
		const { id } = await req.json();
		const session = await getServerSession(authOptions);

		// ID was not provided from user, invalid request
		if (!id) {
			return new Response(null, {
				status: 400,
				statusText: "bad-request",
			});
		}
		// Verify that user is logged in
		if (session) {
			// Pull the user which made the request
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

				// Class is not found with given ID
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

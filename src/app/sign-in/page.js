"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const { data: session, status } = useSession();
	const router = useRouter();

	// redirect if user is signed in
	useEffect(() => {
		if (status == "authenticated") {
			router.push("/gpa");
		}
	}, []);

	return (
		<>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-200">
				<div class="mb-8 flex justify-center">
					<div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						<Link
							href="/"
							passHref
							class="font-semibold text-green-600"
						>
							&larr; Back

						</Link>
					</div>
				</div>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Link href={'/'} className="font-bold text-6xl  flex items-center justify-center bg-gradient-radial from-[#4ea877] to-[#224e36]  text-transparent bg-clip-text">
						W
					</Link>
					<h2 className="mt-6 6 6 6 6 6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={(e) => {
							e.preventDefault();
							signIn("email", { email });
						}}
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Continue
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

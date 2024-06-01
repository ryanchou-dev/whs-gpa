"use client";
import React, { useEffect, useState } from "react";
// for redirects & jwt reading
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// sign in hook for user
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);
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
			{/* Back button for user - style for all screen sizes */}
			<div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-200 min-h-screen">


				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="font-bold text-5xl  bg-clip-text text-transparent flex items-center justify-center bg-gradient-radial from-[#4ea877] to-[#224e36]  ">
						🐏
					</div>
					<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
						{success ? "Check your email" : "Register/Log In to Westmoor GPA"}
					</h2>
					<p className=" text-center text-sm font-medium leading-8 text-gray-600">

						{success ? <div>We've sent a temporary login link. <br /> Please check your inbox at <b>{email}</b></div> : "A temporary login link will be sent to your email."}
					</p>
				</div>

				{!success && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{/* prevent form refresh */}
					<form
						className="space-y-6"
						onSubmit={async (e) => {
							e.preventDefault();
							const ret = await signIn("email", { redirect: false, email });
							if (ret.ok) setSuccess(true);
						}}
					>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							{/* input validation */}
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
								className="flex w-full justify-center rounded-md bg-green-800/80 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Continue
							</button>
						</div>
					</form>
				</div>}
				{success && <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-center"><button
					onClick={() => setSuccess(false)}
					className="flex items-center justify-center rounded-md px-3 py-1.5 text-sm underline underline-offset-2 font-semibold leading-6 text-gray-600   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Back to Login
				</button></div>}
			</div>
		</>
	);
}

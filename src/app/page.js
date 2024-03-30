"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [client, setClient] = useState(null);
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status == "authenticated") {
			router.push("/gpa");
		}
	}, [status]);

	return (
		<main className="bg-gray-200 min-h-screen">
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4b7a63] to-[#c2db9a] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							<span className="bg-gradient-radial from-[#4ea877] to-[#224e36] inline-block text-transparent bg-clip-text">
								Westmoor
							</span>{" "}
							GPA Calculator
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							A GPA calculator for Westmoor High School students!
							<br />
							Calculate your GPA, share your stats with friends/family, get mentorship from fine-tuned models, and
							more!
						</p>
						<div className="mt-10  flex items-center justify-center flex-col gap-x-6">
							<a
								href="/sign-in"
								className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Get Started
							</a>
						</div>
					</div>
				</div>
				<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#27552d] to-[#b5ffe0] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
			</div>
			<div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
					<div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
						<div className="lg:pr-4">
							<div className="lg:max-w-lg">
								<p className="text-base font-semibold leading-7 text-green-600">Calculate accurately & efficiently </p>
								<h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Westmoor&apos;s distributable, precise GPA calculator</h1>
								<p className="mt-6 text-xl leading-8 text-gray-700">
									Tailored towards Westmoor High School students, this user-friendly app allows for the effortless input of grades and an accurate calculator
									that represents the true GPA on your high school report card.
								</p>
							</div>
						</div>
					</div>
					<div className="-ml-12 select-none -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
						<img
							className=" w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
							src='/demo.png'
							alt="Demo of Westmoor GPA"
						/>
					</div>
					<div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
						<div className="lg:pr-4">
							<div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
								<p>
									Gone are the days of manual calculations and guesswork –
									our intuitive interface makes monitoring your academic progress a breeze.
									<br /><br />
									You can also easily share your schedules and GPA with classmates and family members. Staying connected and keeping people updated about your
									academic progress has never been easier.
								</p>
								<ul role="list" className="mt-8 space-y-8 text-gray-600">
									<li className="flex gap-x-3">
										<span>
											<strong className="font-semibold text-gray-900">Secure</strong><br />
											Authentication has industry-standard encryption and your information is never shared with any third-parties.
										</span>
									</li>
									<li className="flex gap-x-3">
										<span>
											<strong className="font-semibold text-gray-900">Intelligent</strong><br />
											Our OpenAI powered AI model, Rammy, can help you around the site and give your guidance throughout your high school journey.
										</span>
									</li>

									<li className="flex gap-x-3">
										<span>
											<strong className="font-semibold text-gray-900">Intuitive</strong> <br />Our responsive UI ensures that you&apos;ll be able to access
											your information from any device.
										</span>
									</li>
								</ul>

							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MainNav } from '@/components/Navbar'
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BentoShowcase } from "@/components/ui/bento-grid";
import ShimmerButton from "@/components/ui/shimmer-button";
import Link from "next/link";

export default function Home() {
	const [client, setClient] = useState(null);
	const { data: session, status } = useSession();
	const router = useRouter();

	return (
		<main className="bg-gray-200 min-h-screen">
			<div
				className="absolute inset-x-0 top-10 z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
			<div className="sm:-mt-12 ">

				<ContainerScroll
					titleComponent={
						<>
							<h1 className="text-4xl px-8 mb-12 font-semibold text-black dark:text-white">
								meet
								<br />
								<span className="text-5xl md:text-[5rem] font-bold mt-1 leading-none">
									<span className="bg-gradient-radial from-[#4ea877] to-[#224e36] inline-block text-transparent bg-clip-text">
										Westmoor
									</span>{" "}
									GPA Calculator
								</span>
								<br />
								<p className="mt-6 text-base font-medium leading-8 text-gray-600">
									A shareable GPA calculator integrated with AI.
								</p>
								<br />
								<div className=" flex items-center justify-center">

									<Link href={status == "authenticated" ? "/gpa" : "/sign-in"}>

										<ShimmerButton className="shadow-2xl" >
											<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
												{status == "authenticated" ? <p>View your courses &rarr;</p> : <p>Get Started &rarr;</p>}
											</span>
										</ShimmerButton>
									</Link>
								</div>
							</h1>
						</>
					}

				>
					<img
						src={`/demo.png`}
						alt="hero"
						height={720}
						width={1400}
						className="mx-auto rounded-2xl object-cover h-full object-center"
						draggable={false}
					/>
				</ContainerScroll>
			</div>

			<div className="relative isolate px-6 pt-14 lg:px-8 z-10">
				<div className="mx-auto max-w-2xl mb-12 ">
					<div className="text-center">
						<h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
							<span className="text-[#2a86d4]">Designed</span> for Westmoor students.
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Engineered for Westmoor students. With custom AI models and an accessible interface, Westmoor GPA provides a performant and feature-rich GPA calculator.
						</p>
					</div>
				</div>
				<BentoShowcase />


				<div className="rounded-lg text-center flex items-center mt-24 justify-center">
					<div className="mx-auto w-full lg:mx-0 lg:flex-auto py-4 text-center">
						<div className="mx-auto max-w-3xl mb-12 ">
							<div className="text-center">
								<h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
									<span className="text-[#2a86d4]">How</span> do I use this?
								</h1>
								<div className="mt-8 text-lg text-gray-900 text-center">
									<div className="text-left">
										<p className="mb-2">
											Our GPA calculator helps you estimate your Grade Point
											Average based on your current grades. Here&apos;s how it
											works:
										</p>
										<ol className="space-y-4 list-decimal pl-4 mb-4">
											<li>
												Enter a class you&apos;ve took, the year you took it, and if it was an AP class.
											</li>
											<li>
												Enter your grades for each class using the standard letter
												grading system (A, B, C, D, F).
											</li>
											<li>
												Enter the number of credits for each class (5 for
												semester, 10 for year).
											</li>
											<li>
												Click the add button to add the course to your record. The calculator
												will convert your letter grades into numerical values,
												multiply them by the number of credits (if provided), sum
												them up, and divide by the total number of credits to get
												your GPA.
											</li>
											<li>
												Tada! Your unweighted and weighted GPA are shown beneath your course schedule.
											</li>
										</ol>
									</div>
									<div className="font-medium p-6 bg-green-800/20 rounded-2xl">
										<div className=" text-black text-2xl font-bold">Correlation</div>
										<div className="text-gray-900">

											This method of calculating GPA correlates to the official topic - calculating a user&apos;s weighted and unweighted GPA.
											<br />
											<br />
											Coupled with additional features, this website fully addresses this year&apos;s prompt.
										</div>
									</div>
								</div>



							</div>
						</div>

					</div>

				</div>




				<div className="rounded-lg text-center flex items-center mt-8 justify-center">
					<div className="mx-auto w-full lg:mx-0 lg:flex-auto lg:py-32 text-center">
						<div className="mx-auto max-w-2xl mb-12 ">
							<div className="text-center">
								<h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
									Want to <span className="text-[#2a86d4]">unlock</span> your academic potential?
								</h1>
								<p className="mt-6 text-lg leading-8 text-gray-600">
									Westmoor GPA is a free and accessible tool to all students at Westmoor. <br />Start using <span className="font-semibold bg-gradient-radial from-[#4ea877] to-[#224e36] inline-block text-transparent bg-clip-text">
										Westmoor GPA
									</span>{" "}today!
								</p>
							</div>
						</div>

						<div className="my-10 flex items-center justify-center gap-x-6 ">
							<Link href={status == "authenticated" ? "/gpa" : "/sign-in"}>
								<ShimmerButton className="shadow-2xl" >
									<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
										{status == "authenticated" ? <p>View your courses &rarr;</p> : <p>Get started in 60 seconds &rarr;</p>}
									</span>
								</ShimmerButton>
							</Link>

						</div>
					</div>

				</div>
			</div>
		</main >
	);
}

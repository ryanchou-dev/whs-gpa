"use client";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';





export function MainNav() {
	const { data: session, status } = useSession();
	const currentPage = usePathname();
	const navigation = [
		{ name: 'Home', href: '/', current: currentPage == "/" },
		{ name: 'Courses', href: '/gpa', current: currentPage == "/gpa" },
	]

	return (

		<div className="fixed top-0 z-50 w-full border-b border-gray-500/40 bg-background/95 backdrop-blur bg-background/60">
			<Disclosure >
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
											</svg>


										) : (
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
											</svg>
										)}
									</DisclosureButton>
								</div>
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
									<Link href="/" className="flex flex-shrink-0 items-center text-2xl">
										<div className="font-bold text-3xl  bg-clip-text text-transparent flex items-center justify-center bg-gradient-radial from-[#4ea877] to-[#224e36]  ">
											🐏
										</div>
										{" "}
									</Link>
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-4">
											{navigation.map((item) => {
												if (item.name == "Home" || status == "authenticated") {
													return (
														<Link
															key={item.name}
															href={item.href}
															className={
																(item.current ? 'bg-green-800/60 text-white' : 'text-gray-600 hover:bg-gray-700/60 hover:text-white') +
																' rounded-md px-3 py-2 text-sm font-medium'
															}
															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</Link>
													)
												}
											})}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{/* Profile dropdown */}
									<div>
										<div className="relative flex rounded-full  text-sm ">
											<span className="sr-only">Open user menu</span>
											{status == "authenticated" ?
												<button onClick={() => signOut()}>

													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
													</svg>
												</button>

												: <Link href={"/sign-in"}

													className={
														'bg-green-800/60 text-white' +
														' rounded-md px-3 py-2 text-sm font-medium'
													}
												>
													<div>
														Register/Login

														{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
															<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
														</svg> */}
													</div>

												</Link>
											}
										</div>
									</div>
								</div>
							</div>
						</div>

						<DisclosurePanel className="sm:hidden">
							<div className="space-y-1 px-2 pb-3 pt-2">
								{navigation.map((item) => {

									if (item.name == "Home" || status == "authenticated") {
										return (
											<DisclosureButton
												key={item.name}
												as="a"
												href={item.href}
												className={
													(item.current ? 'bg-green-800/60 text-white' : 'text-gray-600 hover:bg-gray-700/60 hover:text-white') +
													' block rounded-md px-3 py-2 text-base font-medium'
												}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</DisclosureButton>
										)
									}
								})}
							</div>
						</DisclosurePanel>
					</>
				)}
			</Disclosure>
		</div>
	)
}

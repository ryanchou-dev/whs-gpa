"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Home() {
	const [freshman, setFreshman] = useState([]);
	const [sophomore, setSophomore] = useState([]);
	const [junior, setJunior] = useState([]);
	const [senior, setSenior] = useState([]);

	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const [analysisTarget, setAnalysisTarget] = useState(4);

	const [aClass, setAClass] = useState();
	const [aGrade, setAGrade] = useState();
	const [cName, setCName] = useState("");
	const [grade, setGrade] = useState("A");
	const [credits, setCredits] = useState("5");
	const [type, setType] = useState("Regular");
	const [year, setYear] = useState("Freshman");
	const [copy, setCopy] = useState("Share it!");
	const { data: session, status } = useSession();
	const router = useRouter();

	const [totCredits, setTotCredits] = useState(0);
	const [uTotGrade, setUTotGrade] = useState(0);
	const [totGrade, setTotGrade] = useState(0);
	const generateAnswer = async (e) => {
		e.preventDefault();
		setAnswer("Thinking...");

		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: question,
			}),
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		let answer = await response.json();
		setAnswer(answer.choices[0].message.content);
	};

	const changeCopy = () => {
		setCopy("Link copied!");

		navigator.clipboard.writeText(
			window.location.origin + "/share/" + session.user.id
		);

		// delay after copy
		setTimeout(() => {
			setCopy("Share it!");
		}, 1500);
	};

	useEffect(() => {
		if (status != "authenticated") {
			router.push("/sign-in");
			return
		}
		async function fetchData() {
			const res = await fetch("/api/fetch", {
				cache: "no-cache",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			data.forEach((course) => {
				setTotCredits((totCredits) => totCredits + Number(course.credits));

				if (course.grade == "A") {
					setTotGrade(
						(totGrade) =>
							totGrade +
							(4 + (course.courseType == "AP")) * Number(course.credits)
					);
					setUTotGrade((uTotGrade) => uTotGrade + 4 * Number(course.credits));
				}
				if (course.grade == "B") {
					setTotGrade(
						(totGrade) =>
							totGrade +
							(3 + (course.courseType == "AP")) * Number(course.credits)
					);
					setUTotGrade((uTotGrade) => uTotGrade + 3 * Number(course.credits));
				}
				if (course.grade == "C") {
					setTotGrade(
						(totGrade) =>
							totGrade +
							(2 + (course.courseType == "AP")) * Number(course.credits)
					);
					setUTotGrade((uTotGrade) => uTotGrade + 2 * Number(course.credits));
				}
				if (course.grade == "D") {
					setTotGrade(
						(totGrade) =>
							totGrade +
							(1 + (course.courseType == "AP")) * Number(course.credits)
					);
					setUTotGrade((uTotGrade) => uTotGrade + 1 * Number(course.credits));
				}

				if (course.year == "Freshman") {
					setFreshman((freshman) => [
						...freshman,
						{
							courseName: course.name,
							grade: course.grade,
							credits: course.credits,
							type: course.courseType,
							idx: course.id,
						},
					]);
				}
				if (course.year == "Sophomore") {
					setSophomore((sophomore) => [
						...sophomore,
						{
							courseName: course.name,
							grade: course.grade,
							credits: course.credits,
							type: course.courseType,
							idx: course.id,
						},
					]);
				}
				if (course.year == "Junior") {
					setJunior((junior) => [
						...junior,
						{
							courseName: course.name,
							grade: course.grade,
							credits: course.credits,
							type: course.courseType,
							idx: course.id,
						},
					]);
				}
				if (course.year == "Senior") {
					setSenior((senior) => [
						...senior,
						{
							courseName: course.name,
							grade: course.grade,
							credits: course.credits,
							type: course.courseType,
							idx: course.id,
						},
					]);
				}
			});
		}

		fetchData();
	}, [status]);


	const removeID = async (year, idx, cCredits, cGrade, cType) => {
		setTotCredits((totCredits) => totCredits - Number(cCredits));

		if (cGrade == "A") {
			setTotGrade(
				(totGrade) => totGrade - (4 + (cType == "AP")) * Number(cCredits)
			);
			setUTotGrade((uTotGrade) => uTotGrade - 4 * Number(cCredits));
		}
		if (cGrade == "B") {
			setTotGrade(
				(totGrade) => totGrade - (3 + (cType == "AP")) * Number(cCredits)
			);
			setUTotGrade((uTotGrade) => uTotGrade - 3 * Number(cCredits));
		}
		if (cGrade == "C") {
			setTotGrade(
				(totGrade) => totGrade - (2 + (cType == "AP")) * Number(cCredits)
			);
			setUTotGrade((uTotGrade) => uTotGrade - 2 * Number(cCredits));
		}
		if (cGrade == "D") {
			setTotGrade(
				(totGrade) => totGrade - (1 + (cType == "AP")) * Number(cCredits)
			);
			setUTotGrade((uTotGrade) => uTotGrade - Number(cCredits));
		}

		if (year == "freshman") {
			setFreshman((freshman) =>
				freshman.filter((course) => course.idx !== idx)
			);
		}
		if (year == "sophomore") {
			setSophomore((sophomore) =>
				sophomore.filter((course) => course.idx !== idx)
			);
		}
		if (year == "junior") {
			setJunior((junior) => junior.filter((course) => course.idx !== idx));
		}
		if (year == "senior") {
			setSenior((senior) => senior.filter((course) => course.idx !== idx));
		}

		const res = await fetch("/api/delete", {
			cache: "no-cache",
			method: "POST",
			body: JSON.stringify({
				id: idx,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<main className="bg-gray-200 min-h-screen">
			<div className="relative isolate px-6 pt-4 lg:px-8">
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
				<div className="mx-auto mt-8 max-w-7xl py-16 sm:py-24 lg:py-32">
					<div className="text-center">
						<h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							<span className="bg-gradient-radial from-[#4ea877] to-[#224e36] inline-block text-transparent bg-clip-text">
								Westmoor
							</span>{" "}GPA Calculator
						</h1>
						<p className="mt-4 text-lg leading-8 text-gray-600">
							Signed in as {session?.user?.email}
						</p>
						<div className="mt-10  flex items-center justify-center flex-col gap-x-6">
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									let exists = false;
									if (year == "Freshman" && freshman.some(e => e.courseName == cName)) {
										exists = true;
									} else if (year == "Sophomore" && sophomore.some(e => e.courseName == cName)) {
										exists = true;
									} else if (year == "Junior" && junior.some(e => e.courseName == cName)) {
										exists = true;
									} else if (year == "Senior" && senior.some(e => e.courseName == cName)) {
										exists = true;
									}
									if (exists) {
										toast.error("You've added this course already.")
										return;
									}
									setTotCredits((totCredits) => totCredits + Number(credits));

									if (grade == "A") {
										setTotGrade(
											totGrade + (4 + (type == "AP")) * Number(credits)
										);
										setUTotGrade(uTotGrade + 4 * Number(credits));
									}
									if (grade == "B") {
										setTotGrade(
											totGrade + (3 + (type == "AP")) * Number(credits)
										);
										setUTotGrade(uTotGrade + 3 * Number(credits));
									}
									if (grade == "C") {
										setTotGrade(
											totGrade + (2 + (type == "AP")) * Number(credits)
										);
										setUTotGrade(uTotGrade + 2 * Number(credits));
									}
									if (grade == "D") {
										setTotGrade(
											totGrade + (1 + (type == "AP")) * Number(credits)
										);
										setUTotGrade(uTotGrade + Number(credits));
									}

									const res = await fetch("/api/create", {
										cache: "no-cache",
										method: "POST",
										body: JSON.stringify({
											name: cName,
											grade: grade,
											credits: credits,
											courseType: type,
											year: year,
										}),
										headers: {
											"Content-Type": "application/json",
										},
									});
									const data = await res.json();

									if (year == "Freshman") {
										setFreshman((freshman) => [
											...freshman,
											{
												courseName: cName,
												grade: grade,
												credits: credits,
												type: type,
												idx: data.id,
											},
										]);
									}
									if (year == "Sophomore") {
										setSophomore((sophomore) => [
											...sophomore,
											{
												courseName: cName,
												grade: grade,
												credits: credits,
												type: type,
												idx: data.id,
											},
										]);
									}
									if (year == "Junior") {
										setJunior((junior) => [
											...junior,
											{
												courseName: cName,
												grade: grade,
												credits: credits,
												type: type,
												idx: data.id,
											},
										]);
									}
									if (year == "Senior") {
										setSenior((senior) => [
											...senior,
											{
												courseName: cName,
												grade: grade,
												credits: credits,
												type: type,
												idx: data.id,
											},
										]);
									}
								}}
								className="w-full flex justify-evenly gap-4 flex-wrap"
							>
								<div className="flex-col flex ">
									<label className="text-left text-black block">
										Course Name
									</label>

									<input
										type="text"
										onChange={(e) => setCName(e.target.value)}
										placeholder="Course Name"
										required
										className="block rounded-md bg-gray-300 px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 "
									/>
								</div>
								<div className="flex-col flex ">
									<label className="text-left text-black block">Grade</label>

									<select
										onChange={(e) => setGrade(e.target.value)}
										className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 "
									>
										<option value="A">A</option>
										<option value="B">B</option>
										<option value="C">C</option>
										<option value="D">D</option>
										<option value="F">F</option>
									</select>
								</div>
								<div className="flex-col flex ">
									<label className="text-left text-black block">Credits</label>
									<select
										onChange={(e) => setCredits(e.target.value)}
										className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 "
									>
										<option value="5">5</option>
										<option value="10">10</option>
									</select>
								</div>
								<div className="flex-col flex ">
									<label className="text-left text-black block">
										Course Type
									</label>
									<select
										onChange={(e) => setType(e.target.value)}
										className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 "
									>
										<option value="Regular">Regular</option>
										<option value="AP">AP</option>
									</select>
								</div>
								<div className="flex-col flex ">
									<label className="text-left text-black block">Year</label>
									<select
										onChange={(e) => setYear(e.target.value)}
										className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-gray-200 "
									>
										<option value="Freshman">Freshman</option>
										<option value="Sophomore">Sophomore</option>
										<option value="Junior">Junior</option>
										<option value="Senior">Senior</option>
									</select>
								</div>

								<button
									type="submit"
									className="mt-5 rounded-md bg-green-700 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-green-600 "
								>
									Add
								</button>
							</form>

							<div className="h-1.5 w-full bg-gray-300 my-5"></div>

							<div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								Courses:
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-center items-center mt-12  flex-wrap gap-16">
						<div className="relative overflow-x-auto">
							<div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
								Freshman Year
							</div>
							<div></div>
							<table className="text-sm text-left rtl:text-right text-gray-500 ">
								<thead className="text-xs uppercase bg-gray-50 text-gray-500">
									<tr>
										<th scope="col" className="px-6 py-3">
											Course Name
										</th>
										<th scope="col" className="px-6 py-3">
											Grade
										</th>
										<th scope="col" className="px-6 py-3">
											Credits
										</th>
										<th scope="col" className="px-6 py-3">
											Type
										</th>
										<th scope="col" className="px-6 py-3">
											Remove
										</th>
									</tr>
								</thead>
								<tbody>
									{freshman.map((course) => (
										<tr className="bg-green-500/10 border-b " key={course.idx}>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
											>
												{course.courseName}
											</th>
											<td className="px-6 py-4 text-gray-900">
												{course.grade}
											</td>
											<td className="px-6 py-4 text-gray-900">
												{course.credits}
											</td>
											<td className="px-6 py-4 text-gray-900">{course.type}</td>
											<td
												className="px-6 py-4 text-center"
												onClick={(e) =>
													removeID(
														"freshman",
														course.idx,
														course.credits,
														course.grade,
														course.type
													)
												}
											>
												<button className="text-gray-600 hover:text-gray-900">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
														/>
													</svg>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="relative overflow-x-auto">
							<div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
								Sophomore Year
							</div>
							<table className=" text-sm text-left rtl:text-right text-gray-500 ">
								<thead className="text-xs uppercase bg-gray-50 text-gray-500">
									<tr>
										<th scope="col" className="px-6 py-3">
											Course Name
										</th>
										<th scope="col" className="px-6 py-3">
											Grade
										</th>
										<th scope="col" className="px-6 py-3">
											Credits
										</th>
										<th scope="col" className="px-6 py-3">
											Type
										</th>
										<th scope="col" className="px-6 py-3">
											Remove
										</th>
									</tr>
								</thead>
								<tbody>
									{sophomore.map((course) => (
										<tr className="bg-green-500/10 border-b " key={course.idx}>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
											>
												{course.courseName}
											</th>
											<td className="px-6 py-4 text-gray-900">
												{course.grade}
											</td>
											<td className="px-6 py-4 text-gray-900">
												{course.credits}
											</td>
											<td className="px-6 py-4 text-gray-900">{course.type}</td>
											<td
												className="px-6 py-4 text-center"
												onClick={(e) =>
													removeID(
														"sophomore",
														course.idx,
														course.credits,
														course.grade,
														course.type
													)
												}
											>
												<button className="text-gray-600 hover:text-gray-900">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
														/>
													</svg>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="relative overflow-x-auto ">
							<div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
								Junior Year
							</div>
							<table className="text-sm text-left rtl:text-right text-gray-500 ">
								<thead className="text-xs uppercase bg-gray-50 text-gray-500">
									<tr>
										<th scope="col" className="px-6 py-3">
											Course Name
										</th>
										<th scope="col" className="px-6 py-3">
											Grade
										</th>
										<th scope="col" className="px-6 py-3">
											Credits
										</th>
										<th scope="col" className="px-6 py-3">
											Type
										</th>
										<th scope="col" className="px-6 py-3">
											Remove
										</th>
									</tr>
								</thead>
								<tbody>
									{junior.map((course) => (
										<tr className="bg-green-500/10 border-b " key={course.idx}>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
											>
												{course.courseName}
											</th>
											<td className="px-6 py-4 text-gray-900">
												{course.grade}
											</td>
											<td className="px-6 py-4 text-gray-900">
												{course.credits}
											</td>
											<td className="px-6 py-4 text-gray-900">{course.type}</td>
											<td
												className="px-6 py-4 text-center"
												onClick={(e) =>
													removeID(
														"junior",
														course.idx,
														course.credits,
														course.grade,
														course.type
													)
												}
											>
												<button className="text-gray-600 hover:text-gray-900">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
														/>
													</svg>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="relative overflow-x-auto">
							<div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
								Senior Year
							</div>
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
								<thead className="text-xs uppercase bg-gray-50 text-gray-500">
									<tr>
										<th scope="col" className="px-6 py-3">
											Course Name
										</th>
										<th scope="col" className="px-6 py-3">
											Grade
										</th>
										<th scope="col" className="px-6 py-3">
											Credits
										</th>
										<th scope="col" className="px-6 py-3">
											Type
										</th>
										<th scope="col" className="px-6 py-3">
											Remove
										</th>
									</tr>
								</thead>
								<tbody>
									{senior.map((course) => (
										<tr className="bg-green-500/10 border-b " key={course.idx}>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
											>
												{course.courseName}
											</th>
											<td className="px-6 py-4 text-gray-900">
												{course.grade}
											</td>
											<td className="px-6 py-4 text-gray-900">
												{course.credits}
											</td>
											<td className="px-6 py-4 text-gray-900">{course.type}</td>
											<td
												className="px-6 py-4 text-center"
												onClick={(e) =>
													removeID(
														"senior",
														course.idx,
														course.credits,
														course.grade,
														course.type
													)
												}
											>
												<button className="text-gray-600 hover:text-gray-900">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
														/>
													</svg>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="flex flex-row justify-center items-center mt-12  flex-wrap gap-16">
							<div className="text-4xl font-medium mt-10 text-black text-center">
								Weighted GPA
								<br />
								<span className="text-center font-bold bg-gradient-radial from-[#4ea877] to-[#224e36]  text-transparent bg-clip-text">
									{totCredits > 0 ? (totGrade / totCredits).toFixed(2) : "N/A"}
								</span>{" "}
							</div>
							<div className="text-4xl font-medium mt-10 text-black text-center">
								Unweighted GPA
								<br />
								<span className="text-center font-bold bg-gradient-radial from-[#4ea877] to-[#224e36]  text-transparent bg-clip-text">
									{totCredits > 0 ? (uTotGrade / totCredits).toFixed(2) : "N/A"}
								</span>{" "}
							</div>
						</div>
						<a
							onClick={changeCopy}
							className={`mt-12 hover:scale-105 cursor-pointer duration-300 inline-block rounded-lg  bg-[#178f4b] p-3 text-white`}
						>
							{copy}
						</a>
					</div>


					<div className="flex flex-col mt-12 md:px-10 md:flex-row items-center justify-center gap-6">
						<div className="max-w-4xl">
							<div className="px-8 pt-10 pb-14 bg-gray-100 rounded-b-lg">
								<div className="text-black space-y-4">
									<div>

										<h3 className="text-xl font-bold lead-xl bold">Analysis: Grade Increase</h3>
										<div className="text-sm font-light -mt-0.5">Type your target GPA to see how many letter grades you need to increase to get it.</div>
									</div>
									<div className="text-lg font-light leading-8">To increase my unweighted GPA to
										<input
											type="text"
											onChange={(e) => setAnalysisTarget(e.target.value)}
											value={analysisTarget}
											required
											className="w-24  mx-1 inline-block rounded-md  px-3.5 py-1 text-sm text-black shadow-sm bg-gray-100 hover:bg-gray-50 "
										/>,

										I need to {((analysisTarget * totCredits) - uTotGrade).toFixed(0) > 0 ? "increase" : "decrease"} my total credits by {Math.abs(((analysisTarget * totCredits) - uTotGrade).toFixed(0))}.


										This is about {(Math.abs(((analysisTarget * totCredits) - uTotGrade).toFixed(0))) / 5} grade letters in a semester.
									</div>
								</div>
							</div>
						</div>
						<div className="max-w-4xl">
							<div className="px-8 pt-10 pb-14 bg-gray-100 rounded-b-lg">
								<div className="text-black space-y-4">
									<div>

										<h3 className="text-xl font-bold lead-xl bold">Analysis: Class Goals</h3>
										<div className="text-sm font-light -mt-0.5">Predict changes in your class to see how your GPA will be affected.</div>
									</div>
									<div className="text-lg font-light leading-8">If my grade in
										<select onChange={(e) => {
											let x = JSON.parse(e.target.value)
											if (x.grade == "A") x.grade = 4
											else if (x.grade == "B") x.grade = 3
											else if (x.grade == "C") x.grade = 2
											else if (x.grade == "D") x.grade = 1
											else if (x.grade == "F") x.grade = 0
											setAClass(x)
										}

										} className="mx-1 inline-block rounded-md  px-3.5 py-1 text-sm text-black shadow-sm bg-gray-100 hover:bg-gray-50">
											<option value="" selected disabled hidden>Select a Class</option>

											{freshman.map(cclass => {
												return <option value={JSON.stringify(cclass)}>
													Freshman: {cclass.courseName} ({cclass.grade})</option>;
											})}
											{sophomore.map(cclass => {
												return <option value={JSON.stringify(cclass)}>
													Sophomore: {cclass.courseName} ({cclass.grade})</option>;
											})}
											{junior.map(cclass => {
												return <option value={JSON.stringify(cclass)}>
													Junior: {cclass.courseName} ({cclass.grade})</option>;
											})}
											{senior.map(cclass => {
												return <option value={JSON.stringify(cclass)}>
													Senior: {cclass.courseName} ({cclass.grade})</option>;
											})}
										</select> changes to a
										<select onChange={(e) => setAGrade(e.target.value)} className="w-16 mx-1 inline-block rounded-md  px-3.5 py-1 text-sm text-black shadow-sm bg-gray-100 hover:bg-gray-50">
											<option value="" selected disabled hidden>Select your predicted grade</option>

											<option value={4}>A</option>
											<option value={3}>B</option>
											<option value={2}>C</option>
											<option value={1}>D</option>
											<option value={0}>F</option>
										</select>, my unweighted GPA will become <b>{aClass && aGrade ? ((uTotGrade - (aClass.credits * aClass.grade)) / totCredits).toFixed(2) : "N/A"}</b>

									</div>
								</div>
							</div>
						</div>
					</div>


					<div className="relative flex py-5 items-center mt-16">
						<div className="flex-grow border-t border-gray-400"></div>
						<span className="flex-shrink mx-4 text-gray-400">Help</span>
						<div className="flex-grow border-t border-gray-400"></div>
					</div>

					<div className="mt-16 max-w-4xl mx-auto p-4 bg-gray-100 text-gray-700 rounded-lg shadow-md">
						<h2 className="text-xl sm:text-2xl font-semibold mb-2 cursor-pointer">
							What&apos;s This?
						</h2>
						<div className="text-sm sm:text-md text-center">
							<div className="text-left">
								<p className="mb-2">
									Our GPA calculator helps you estimate your Grade Point
									Average based on your current grades. Here&apos;s how it
									works:
								</p>
								<ol className="list-decimal pl-4 mb-4">
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
								<h2 className="text-medium sm:text-lg font-semibold mb-2 cursor-pointer">
									Additional Features
								</h2>
								<ul className="list-disc pl-4 mb-4">
									<li>
										You can also share your course schedule and GPA with family, teachers, and friends with the button next to your GPA.
									</li>
									<li>
										Ask Rammy for any other questions about this site and advice on studying right below this section!
									</li>
								</ul>
								<p className="mb-2">
									Check out the{" "}
									<a
										href="https://docs.google.com/document/d/1tK36lBNMcLr42drhdaN6rvJ2ZedD-YmGwzefkOHX6TI/edit"
										target="_blank"
										rel="noreferrer"
										className="text-inline text-green-600 font-semibold underline"
									>
										Course Catalog
									</a>{" "}
									for more information on the classes you can take at Westmoor
									High School. This also includes details on
									graduation/college requirements!
								</p>
							</div>
							<h3 className="font-semibold text-xl sm:text-2xl  text-left  mt-6 mb-2">
								Q&A
							</h3>
							<div className="text-left">
								<p className="mb-1 font-semibold">Q: What&apos;s a GPA?</p>
								<p className="mb-2">
									A: It&apos;s a number that represents a student&apos;s
									progress in school. Colleges and employers often use it to
									evaluate your academic performance.
								</p>
								<p className="mb-1 font-semibold">
									Q: Does the share link automatically update?
								</p>
								<p className="mb-2">
									A: Yes! Whenever you make a change on your personal GPA,
									everything will be instantly updated on the share link.
								</p>
								<p className="mb-1 font-semibold">
									Q: I&apos;m not done with high school yet.
								</p>
								<p className="mb-2">
									A: No worries, just add what you have so far.{" "}
								</p>
								<p className="mb-1 font-semibold">
									Q: What if I have an A+ or A-?
								</p>
								<p className="mb-2">
									A: At Westmoor High School, all letter grades are
									weighted the same regardless of +s or -s.
								</p>
								<p className="mb-1 font-semibold">
									Q: How can I get my GPA up?
								</p>
								<p className="mb-2">
									A: Try to do well in your classes! If you&apos;re
									struggling, talk to your teacher or{" "}
									<a
										href="https://docs.google.com/forms/d/e/1FAIpQLSeUvj1Bj4x4Sg-QEdEpxMgfR7ER5zIKqI3qWipH8hLzbhVmdA/viewform"
										target="_blank"
										rel="noreferrer"
										className="mt-12 cursor-pointer inline underline duration-300 rounded-lg hover:text-black   text-gray-700"
									>
										counselor
									</a>{" "}
									for help.
								</p>
							</div>
							<h3 className="font-semibold text-xl sm:text-2xl  text-center  mt-6 mb-2">
								Important Links
							</h3>

							<div
								className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
							>
								<a
									href="https://docs.google.com/forms/d/e/1FAIpQLSeUvj1Bj4x4Sg-QEdEpxMgfR7ER5zIKqI3qWipH8hLzbhVmdA/viewform"
									target="_blank"
									rel="noreferrer"
									className="h-full w-1/3 hover:border hover:border-green-600/60 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
									</svg>

									<p className="sm:text-sm text-xs text-center font-semibold mt-4">
										Schedule an appointment with your counselor!
									</p>
								</a>
								<a
									href="https://docs.google.com/document/d/1tK36lBNMcLr42drhdaN6rvJ2ZedD-YmGwzefkOHX6TI/edit"
									target="_blank"
									rel="noreferrer"
									className="h-full w-1/3 hover:border hover:border-green-600/60 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
									</svg>


									<p className="sm:text-sm text-xs text-center font-semibold mt-4">
										Course Catalog + Graduation Requirements
									</p>
								</a>
								<a
									href="https://paper.co"
									target="_blank"
									rel="noreferrer"
									className="h-full w-1/3 hover:border hover:border-green-600/60 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
									</svg>



									<p className="sm:text-sm text-xs text-center font-semibold mt-4">
										Paper.co <br /> Free Tutoring | Login with your email
									</p>
								</a>


							</div>

						</div>
					</div>
					<div className="w-full mt-24 sm:px-12">

						<h3 className="font-semibold text-black text-3xl sm:text-4xl  text-left  mt-6 mb-2">
							Mentorship from Rammy!
						</h3>
						<p className="mb-1 text-black">Rammy is Westmoor&apos;s mascot! Powered with ChatGPT 3.5, and fine-tuned to work the best for you! Rammy has information on
							how to navigate the website and can mentor you throughout your high school journey!</p>
						<textarea
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							rows={4}
							className="w-full p-6 text-black rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
							placeholder={
								"Could you give me advice on how to improve my grades in English class?"
							}
						/>
						<button
							className="bg-black rounded-xl text-white font-medium px-4 py-2 mt-4 hover:bg-black/80 w-full"
							onClick={(e) => generateAnswer(e)}
						>
							Ask Rammy &rarr;
						</button>

						{answer &&
							<div>
								<h3 className="font-semibold text-black text-xl sm:text-2xl  text-left  mt-6 mb-2">
									Rammy says:
								</h3>

								<div
									className="text-black bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
								>
									<p>{answer}</p>
								</div>
							</div>
						}
					</div>

				</div >
			</div >
		</main >
	);
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home({ params }) {
  const [freshman, setFreshman] = useState([]);
  const [sophmore, setSophmore] = useState([]);
  const [junior, setJunior] = useState([]);
  const [senior, setSenior] = useState([]);
  const [email, setEmail] = useState("");

  const [totCredits, setTotCredits] = useState(0);
  const [totGrade, setTotGrade] = useState(0);
  const [uTotGrade, setUTotGrade] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/fetchById", {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({ id: params.slug }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setEmail(data.statusText);

      data.classes.forEach((course) => {
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
          setUTotGrade((uTotGrade) => uTotGrade + 4 * Number(course.credits));
        }
        if (course.grade == "C") {
          setTotGrade(
            (totGrade) =>
              totGrade +
              (2 + (course.courseType == "AP")) * Number(course.credits)
          );
          setUTotGrade((uTotGrade) => uTotGrade + 4 * Number(course.credits));
        }
        if (course.grade == "D") {
          setTotGrade(
            (totGrade) =>
              totGrade +
              (1 + (course.courseType == "AP")) * Number(course.credits)
          );
          setUTotGrade((uTotGrade) => uTotGrade + 4 * Number(course.credits));
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
        if (course.year == "Sophmore") {
          setSophmore((sophmore) => [
            ...sophmore,
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
  }, []);

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
        <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
              <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Calculate your GPA with ease!
                <Link
                  href="/"
                  passHref
                  class="font-semibold ml-2 text-green-600"
                >
                  <span class="absolute inset-0" aria-hidden="true"></span>Get
                  started! <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="bg-gradient-radial from-[#4ea877] to-[#224e36] inline-block text-transparent bg-clip-text">
                Westmoor
              </span>{" "}
              GPA Calculator
            </h1>

            <div className="sm:text-2xl text-xl text-gray-700 mt-4">
              Report for {email}.
            </div>

            <div className="h-1.5 w-full bg-gray-300 my-5"></div>

            <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Courses:
            </div>

            <div className="flex flex-row justify-center items-center mt-12  flex-wrap gap-16">
              <div className="relative overflow-x-auto">
                <div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
                  Freshman Year
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
                    </tr>
                  </thead>
                  <tbody>
                    {freshman.map((course) => (
                      <tr
                        className="bg-green-500/10 border-b "
                        key={course.idx}
                      >
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
                        <td className="px-6 py-4 text-gray-900">
                          {course.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="relative overflow-x-auto">
                <div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
                  Sophmore Year
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
                    </tr>
                  </thead>
                  <tbody>
                    {sophmore.map((course) => (
                      <tr
                        className="bg-green-500/10 border-b "
                        key={course.idx}
                      >
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
                        <td className="px-6 py-4 text-gray-900">
                          {course.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="relative overflow-x-auto">
                <div className="text-gray-700 sm:text-2xl font-bold text-xl mb-4">
                  Junior Year
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
                    </tr>
                  </thead>
                  <tbody>
                    {junior.map((course) => (
                      <tr
                        className="bg-green-500/10 border-b "
                        key={course.idx}
                      >
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
                        <td className="px-6 py-4 text-gray-900">
                          {course.type}
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
                    </tr>
                  </thead>
                  <tbody>
                    {senior.map((course) => (
                      <tr
                        className="bg-green-500/10 border-b "
                        key={course.idx}
                      >
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
                        <td className="px-6 py-4 text-gray-900">
                          {course.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
    </main>
  );
}

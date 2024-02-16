"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [freshman, setFreshman] = useState([]);
  const [sophmore, setSophmore] = useState([]);
  const [junior, setJunior] = useState([]);
  const [senior, setSenior] = useState([]);

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

  useEffect(() => {
    if (status != "authenticated") {
      router.push("/sign-in");
    }
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
    if (year == "sophmore") {
      setSophmore((sophmore) =>
        sophmore.filter((course) => course.idx !== idx)
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
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="bg-gradient-radial from-[#4ea877] to-[#224e36] inline-block text-transparent bg-clip-text">
                Westmoor
              </span>{" "}
              GPA Calculator
            </h1>
            <p className="-mt-4 text-lg leading-8 text-gray-600">
              Signed in as {session?.user?.email} |{" "}
              <span>
                <button
                  onClick={signOut}
                  className="mt-12 rounded-md underline text-sm text-gray-700 shadow-sm hover:bg-gray-300 p-1 duration-300 "
                >
                  Sign Out
                </button>
              </span>
              <br />
            </p>
            <div className="mt-10  flex items-center justify-center flex-col gap-x-6">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
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
                  if (year == "Sophmore") {
                    setSophmore((sophmore) => [
                      ...sophmore,
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
                    <option value="Sophmore">Sophmore</option>
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
                        <th scope="col" className="px-6 py-3">
                          Remove
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
                        <th scope="col" className="px-6 py-3">
                          Remove
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
                          <td
                            className="px-6 py-4 text-center"
                            onClick={(e) =>
                              removeID(
                                "sophmore",
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
                        <th scope="col" className="px-6 py-3">
                          Remove
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
            <a
              onClick={changeCopy}
              className={`mt-12 hover:scale-105 cursor-pointer duration-300 inline-block rounded-lg  bg-[#178f4b] p-3 text-white`}
            >
              {copy}
            </a>

            <div className="mt-16 max-w-4xl mx-auto p-4 bg-gray-100 text-gray-700 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 cursor-pointer">
                What's This?
              </h2>
              <div className="text-sm sm:text-md text-center">
                <div className="text-left">
                  <p className="mb-2">
                    Our GPA calculator helps you estimate your Grade Point
                    Average based on your current grades. Here's how it works:
                  </p>
                  <ol className="list-decimal pl-4 mb-4">
                    <li>
                      Enter your grades for each class using the standard letter
                      grading system (A, B, C, D, F).
                    </li>
                    <li>
                      Enter the number of credits for each class (5 for
                      semester, 10 for year).
                    </li>
                    <li>
                      Click the calculate button to see your GPA. The calculator
                      will convert your letter grades into numerical values,
                      multiply them by the number of credits (if provided), sum
                      them up, and divide by the total number of credits to get
                      your GPA.
                    </li>
                  </ol>
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
                <h3 className="font-semibold text-xl sm:text-2xl  text-center  mt-6 mb-2">
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
                    A: For the purpose of this calculator, an A+ is treated as
                    an A (4.0) and an A- as an A (4.0).
                  </p>
                  <p className="mb-1 font-semibold">
                    Q: How can I get my GPA up?
                  </p>
                  <p className="mb-2">
                    A: Try to do well in your classes! If you're struggling,
                    talk to your teacher or{" "}
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
                <div classname=" text-center w-full">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeUvj1Bj4x4Sg-QEdEpxMgfR7ER5zIKqI3qWipH8hLzbhVmdA/viewform"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-12 w-full cursor-pointer  underline duration-300 rounded-lg hover:text-green-800   font-semibold text-green-600"
                  >
                    Schedule an appointment with your counselor!
                  </a>
                  <br />
                  <a
                    href="https://docs.google.com/document/d/1tK36lBNMcLr42drhdaN6rvJ2ZedD-YmGwzefkOHX6TI/edit"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-12 w-full cursor-pointer  underline duration-300 rounded-lg hover:text-green-800   font-semibold text-green-600"
                  >
                    Course Catalog + Grad Requirements
                  </a>
                  <br />
                  <a
                    href="https://paper.co/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-12 w-full cursor-pointer  underline duration-300 rounded-lg hover:text-green-800   font-semibold text-green-600"
                  >
                    Paper.co (Free Tutoring, sign in with your school email)
                  </a>
                </div>
              </div>
            </div>

            {/* create a "what's this?" section that shows how gpa is calculated*/}
          </div>
        </div>
      </div>
    </main>
  );
}

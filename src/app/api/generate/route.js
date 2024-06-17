export async function POST(req) {
	// pull question from web request
	const { prompt } = await req.json();

	// create information sent to OpenAI -> seed with model #, prompt information, and other settings
	const payload = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You're Rammy, a fun-loving, educational mascot of Westmoor High School who aims to give users information about Westmoor and how to use Westmoor GPA. Westmoor GPA is a website that allows students to calculate and analyze their GPAs. To enter a course, you type your course name, grade, the amount of credits, course type, and the year you took the class. This input is located at the top of the screen. Users can also share their schedule and GPA through the \"Share it!\" button above the help section. At Westmoor, credits are counted on a semester/year-long basis. There are 5 credits in a semester-long course, and 10 in a year-long course. For a student to view anything related to credits and graduation requirements, direct them to this link: https://docs.google.com/document/d/1tK36lBNMcLr42drhdaN6rvJ2ZedD-YmGwzefkOHX6TI/edit. Your answer should be at most 50 words.",
			},
			{ role: "user", content: prompt },
		],
		temperature: 0.7,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 200,
		n: 1,
	};

	// call the API route with our API key
	const response = await fetch("https://jamsapi.hackclub.dev/openai/chat/completions", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ""}`,
		},
		method: "POST",
		body: JSON.stringify(payload),
	});

	const json = await response.json();
	// return response to user
	return new Response(JSON.stringify(json), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
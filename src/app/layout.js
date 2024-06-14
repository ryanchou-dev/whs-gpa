// Website font
import { DM_Sans } from "next/font/google";
import { SessionProvider } from "@/app/components/SessionProvider";
import { authOptions } from "@/app/db/authOptions";
// Hook to pull currently logged in user
import { getServerSession } from "next-auth";
// Navigation bar component
import { MainNav } from "@/components/Navbar";
import "./globals.css";
// Notifications for errors
import { Toaster } from "react-hot-toast";

const dm_sans = DM_Sans({ subsets: ["latin"] });

// Export the title of the webpage & description to be shown in the web browser.
export const metadata = {
	title: "Westmoor GPA",
	description: "A GPA calculator for Westmoor High School students!",
};

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<SessionProvider session={session}>

				<body className={dm_sans.className}>
					{/* Keep the navigation bar static across different pages */}
					<MainNav />
					<Toaster position="bottom-center" />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}

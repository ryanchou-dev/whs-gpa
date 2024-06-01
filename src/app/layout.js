import { DM_Sans } from "next/font/google";
import { SessionProvider } from "@/app/components/SessionProvider";
import { authOptions } from "@/app/db/authOptions";
import { getServerSession } from "next-auth";
import { MainNav } from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const dm_sans = DM_Sans({ subsets: ["latin"] });

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
					<MainNav />
					<Toaster position="bottom-center" />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}

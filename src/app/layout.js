import { DM_Sans } from "next/font/google";
import { SessionProvider } from "@/app/components/SessionProvider";
import { authOptions } from "@/app/db/authOptions";
import { getServerSession } from "next-auth";
import "./globals.css";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Westmoor GPA",
  description: "A GPA calculator for Westmoor High School students!",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={dm_sans.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}

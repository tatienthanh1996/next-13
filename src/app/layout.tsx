import "./globals.css";
import "../assets/loading.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppHeader from "./components/app.header";
import AppFooter from "./components/app.footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AppHeader />
				{children}
				<AppFooter />
			</body>
		</html>
	);
}

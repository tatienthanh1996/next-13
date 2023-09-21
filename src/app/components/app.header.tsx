"use client";
import Link from "next/link";
import AppTopHeader from "./app.topheader";
import AppMidHeader from "./app.midheader";
import AppMenuHeader from "./app.menu";
import useSWR from "swr";

const AppHeader = () => {
	return (
		<header>
			<AppTopHeader></AppTopHeader>

			<AppMidHeader></AppMidHeader>

			<AppMenuHeader></AppMenuHeader>
		</header>
	);
};

export default AppHeader;

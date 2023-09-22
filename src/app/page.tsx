"use client";
import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import TinNoiBat from "./components/group-components-news/tin-noi-bat";
import TinTieuDiem from "./components/group-components-news/tin-tieu-diem";
import TinEmagazine from "./components/group-components-news/tin-emagazine";

export default function Home() {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const {
		data: banner_sidebar_data,
		error,
		isLoading,
	} = useSWR(
		`https://beta.odecompany.com/wp-json/api/v1/banner-sidebar`,
		fetcher,
	);

	if (error) return <div>Data failed</div>;
	if (isLoading)
		return (
			<div className="loading">
				<div className="loader"></div>
			</div>
		);

	console.log(banner_sidebar_data);

	function Banners() {
		// Đảm bảo rằng htmlString là một chuỗi HTML hợp lệ, và bạn đã kiểm tra bảo mật cẩn thận trước khi hiển thị nó.
		const sanitizedHTML = banner_sidebar_data.banners.banner_top;

		return (
			<>
				<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
			</>
		);
	}

	function Sidebar() {
		const sanitizedHTML = banner_sidebar_data.banners.sidebar;
		return (
			<>
				<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
			</>
		);
	}

	return (
		<main className="">
			<div className="banner-top w-[1140px] mx-auto py-[20px] max-[768px]:w-full">
				<Banners />
			</div>

			<div className="row-tin-noi-bat flex flex-wrap justify-between w-[1140px] mx-auto my-[15px] max-[768px]:w-full max-[768px]:p-[15px]">
				<div className="left w-[73%] max-[768px]:w-full">
					<TinNoiBat />
				</div>

				<div className="sidebar w-[25%] max-[768px]:w-[300px] max-[768px]:mx-auto">
					<Sidebar />
				</div>
			</div>

			<div className="banner-middle w-[1140px] mx-auto max-[768px]:w-full">
				<Banners />
			</div>

			<div className="row-tin-2 flex flex-wrap justify-between w-[1140px] mx-auto my-[15px] max-[768px]:w-full max-[768px]:p-[15px]">
				<div className="tieu-diem w-[35%] max-[768px]:w-full">
					<TinTieuDiem />
				</div>

				<div className="magazine w-[35%] max-[768px]:w-full">
					<TinEmagazine />
				</div>

				<div className="sidebar w-[25%] max-[768px]:w-[300px] max-[768px]:mx-auto">
					<Sidebar />
				</div>
			</div>
		</main>
	);
}

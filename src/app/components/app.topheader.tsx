"use client";
import Link from "next/link";
import Image from "next/image";
import PicSearch from "../../../public/search.png";
import useSWR from "swr";

const AppTopHeader = () => {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const {
		data: topheader,
		error,
		isLoading,
	} = useSWR(`https://beta.odecompany.com/wp-json/api/v1/topheader`, fetcher);

	if (error) return <div>Data failed</div>;
	if (isLoading)
		return (
			<div className="loading">
				<div className="loader"></div>
			</div>
		);

	function Search(_value: string): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="top-header bg-[#d5d3d3] flex flex-wrap justify-flex-end px-[5%] py-[5px] items-center max-[768px]:hidden">
			<div className="creatrust-button flex justify-center w-[46%] mr-auto ml-[2%] items-baseline">
				<div className="top-menu w-full">
					<ul id="menu-menu-top" className="nav-menu-top flex">
						{topheader.list_menu_top.map(
							(post: any, ids: number) => {
								let lastPart = post.link_menu;

								if (post.link_menu.startsWith("https://")) {
									const parts = post.link_menu.split("/");
									lastPart = parts[parts.length - 2];
								}

								return (
									<li
										key={ids}
										id={`menu-item`}
										className="menu-item px-[20px] py-[5px] relative h-full"
									>
										<Link
											href={`/category/${lastPart}`}
											className="block text-[14px] text-[#000] before-1 "
										>
											{post.text_menu}
										</Link>
									</li>
								);
							},
						)}
					</ul>
				</div>
			</div>

			<div className="group-search menu-search icon-menu w-[25%]">
				<form
					role="search"
					className="sunshinesearchform w-full relative"
					id="sunshinesearchform"
					action="/"
				>
					<input
						type="search"
						id="header-search"
						className="search-field border-button gold text-[#00843d] outline-none w-full bg-[#fff] rounded-[25px] relative px-[12px] py-[5px]"
						value=""
						name="s"
						placeholder="Search..."
						onChange={(e) => Search(e.target.value)}
					/>
					<button
						className="button-search searchsubmit blogsearchsubmit hidden"
						type="submit"
					></button>
					<div className="search-submit menu-search icon-menu absolute right-[10px] z-[9] w-[20px] h-[20px] translate-y-[-50%] top-[50%]">
						<div className="group-icon">
							<Image
								src={PicSearch}
								alt="search"
								width={15}
								height={15}
								priority
							/>
						</div>
					</div>
					<input type="hidden" name="post_type" value="post" />
				</form>
			</div>
		</div>
	);
};
export default AppTopHeader;

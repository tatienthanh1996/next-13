"use client";
import Link from "next/link";
import Image from "next/image";
import PicSearch from "../../../public/search.png";
import useSWR from "swr";
import { split } from "postcss/lib/list";

const AppMenuHeader = () => {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const fetcher2 = (url: string) => fetch(url).then((r) => r.json());

	const {
		data: dataMenu,
		error: error,
		isLoading: isLoading,
	} = useSWR(`https://beta.odecompany.com/wp-json/api/v1/menu`, fetcher);

	const {
		data: topheader,
		error: error2,
		isLoading: isLoading2,
	} = useSWR(
		`https://beta.odecompany.com/wp-json/api/v1/topheader`,
		fetcher2,
	);

	if (error || error2) return <div>Data failed</div>;
	if (isLoading || isLoading2) return <div>Loading ...</div>;

	const newData = dataMenu.filter(function (menu: {
		cat: any;
		url: any;
		post_parent: string;
	}) {
		if (menu.post_parent == "0") {
			menu.cat = menu.url.split("/");
			return true;
		}
		return false;
	});

	console.log("topheader: ", topheader);
	console.log("data: ", dataMenu);
	console.log("new data: ", newData);

	function Search(_value: string): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="bottom-header header-sticky relative w-full bg-[#A83426]">
			<div className="header-main-menu w-full flex items-center">
				<div className="header-menu-large w-full">
					<div className="header-logo-stiky hidden">
						<Link href={`#`}>
							<Image
								src={topheader.logo_image}
								alt={`Kênh thông tin tổng hợp chuyển động BĐB 24h`}
								width={200}
								height={100}
							/>
						</Link>
					</div>
					<ul className="nav-menu m-0 p-0 flex justify-center h-full items-center">
						{newData.map((menu: any) => {
							return (
								<li
									key={menu.ID}
									className={`${
										menu.classes[0] !== ""
											? menu.classes[0]
											: "hover:bg-[#540202]"
									} menu-item p-[15px] relative h-full`}
								>
									<Link
										href={
											menu.cat[4] !== undefined
												? `/category/${menu.cat[4]}`
												: "/"
										}
										className="text-[#fff] text-[14px] uppercase font-bold"
									>
										{menu.title}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="menu-toggler"></div>
			</div>

			<div className="header-small-menu hidden">
				<div className="header-small-menu-inner">
					<div className="header-small-menu-content">
						<div className="sticky-header-small ld:hidden fixed top-0 left-0 w-full ">
							<div className="flex justify-center items-center w-full px-[20px] py-[10px]">
								<div className="group-search menu-search icon-menu ">
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
											onChange={(e) =>
												Search(e.target.value)
											}
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
										<input
											type="hidden"
											name="post_type"
											value="post"
										/>
									</form>
									<ul
										id="menu-menu-main-1"
										className="nav-menu"
									>
										{newData.map((menu: any) => {
											return (
												<li
													key={menu.ID}
													className="menu-item"
												>
													<Link href={`#`}>
														{menu.title}
													</Link>
												</li>
											);
										})}
									</ul>
								</div>
							</div>

							<div className="overlay"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AppMenuHeader;

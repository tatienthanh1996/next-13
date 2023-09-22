"use client";
import "../../../assets/home-page.css";
import Link from "next/link";
import Image from "next/image";
import PicSearch from "../../../public/search.png";
import useSWR from "swr";
import { split } from "postcss/lib/list";

const TinMoi = () => {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());

	const {
		data: home_data,
		error: error,
		isLoading: isLoading,
	} = useSWR(`https://beta.odecompany.com/wp-json/api/v1/home-page`, fetcher);

	if (error) return <div>Data failed</div>;
	if (isLoading)
		return (
			<div className="loading">
				<div className="loader"></div>
			</div>
		);

	console.log(home_data);

	return (
		<>
			<h2 className="title-news relative pl-[25px] font-bold uppercase text-[20px] text-[#000] overflow-hidden before:content-[''] before:absolute before:left-0 before:top-[50%] before:bg-[url('https://beta.odecompany.com/wp-content/uploads/2023/08/Frame-arr.png')] before:bg-contain before:bg-no-repeat before:w-[15px] before:h-[20px] before:translate-y-[-50%] after:content-[''] after:w-full after:h-[2px] after:bg-[#A83426] after:absolute after:ml-[15px] after:top-[50%]">
				{home_data.tin_moi.title}
			</h2>
			<div className="list-post">
				{home_data.tin_moi.list_post.map(
					(item: any, count: number) => {
						return (
							<div
								key={count}
								className="item my-[15px] pb-[15px] border-b-[1px] border-dotted w-full flex"
							>
								<div className="w-[48%] h-[180px] mr-[2%]">
									<Link href={`/posts/${item.id}`}>
										<Image
											className="w-full h-full object-cover"
											src={`${item.thumbnail}`}
											alt=""
											width={500}
											height={500}
										/>
									</Link>
								</div>
								<div className="content w-[48%] ">
									<h3 className="font-bold text-[16px] mb-[10px]">
										<Link href={`/posts/${item.id}`}>{item.title}</Link>
									</h3>
									<div className="flex flex-wrap">
										<p className="mr-[10px] font-bold">
											<Link href={`/category/${item.cat_slug}`}>{item.cat_name}</Link>
										</p>
										<p className="mb-[5px] font-bold italic text-[#777] max-[768px]:w-full">
											<span className="max-[768px]:hidden"> - </span>
											<span className="">{item.time}</span>
										</p>
									</div>
									<p className="text-[14px] line-clamp-4 max-[768px]:hidden">{item.excerpt}</p>
								</div>

							</div>
						);
					},
				)
				}
			</div>
		</>
	);
};
export default TinMoi;

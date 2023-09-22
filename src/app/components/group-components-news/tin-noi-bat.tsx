"use client";
import "../../../assets/home-page.css";
import Link from "next/link";
import Image from "next/image";
import PicSearch from "../../../public/search.png";
import useSWR from "swr";
import { split } from "postcss/lib/list";

const TinNoiBat = () => {
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
		<div className="">
			<h2 className="title-news relative pl-[25px] font-bold uppercase text-[20px] text-[#000] overflow-hidden before:content-[''] before:absolute before:left-0 before:top-[50%] before:bg-[url('https://beta.odecompany.com/wp-content/uploads/2023/08/Frame-arr.png')] before:bg-contain before:bg-no-repeat before:w-[15px] before:h-[20px] before:translate-y-[-50%] after:content-[''] after:w-full after:h-[2px] after:bg-[#A83426] after:absolute after:ml-[15px] after:top-[50%]">
				{home_data.tin_noi_bat.title}
			</h2>
			<div className="list-post flex flex-wrap justify-between my-[20px]">
				<div className="left w-[60%] flex flex-wrap justify-between max-[768px]:w-full">
					{home_data.tin_noi_bat.list_post.map(
						(item: any, count: number) => {
							if (count == 1) {
								return (
									<div
										key={count}
										className="item w-full my-[5px]"
									>
										<Link href={`/posts/${item.id}`}>
											<Image
												className="w-full h-[250px] object-cover"
												src={`${item.thumbnail}`}
												alt=""
												width={500}
												height={500}
											/>
											<h3 className="font-bold text-[14px] my-[5px]">
												{item.title}
											</h3>
										</Link>
									</div>
								);
							} else if (count > 1 && count < 3) {
								return (
									<div
										key={count}
										className="item w-[48%] my-[5px]"
									>
										<Link href={`/posts/${item.id}`}>
											<Image
												className="w-full h-[100px] object-cover"
												src={`${item.thumbnail}`}
												alt=""
												width={500}
												height={500}
											/>
											<h3 className="font-bold text-[14px] my-[5px]">
												{item.title}
											</h3>
										</Link>
									</div>
								);
							} else if (count == 3) {
								return (
									<div
										key={count}
										className="item w-[48%] my-[5px]"
									>
										<Link href={`/posts/${item.id}`}>
											<Image
												className="w-full h-[100px] object-cover"
												src={`${item.thumbnail}`}
												alt=""
												width={500}
												height={500}
											/>
											<h3 className="font-bold text-[14px] my-[5px]">
												{item.title}
											</h3>
										</Link>
									</div>
								);
							}
						},
					)}
				</div>
				<div className="right w-[38%] max-[768px]:w-full">
					{home_data.tin_noi_bat.list_post.map(
						(item: any, count: number) => {
							if (count == 4) {
								return (
									<div
										key={count}
										className="item w-full mb-[5px] pb-[5px] border-b-[1px] border-[#ddd]"
									>
										<Link href={`/posts/${item.id}`}>
											<Image
												className="w-full h-full object-cover"
												src={`${item.thumbnail}`}
												alt=""
												width={500}
												height={500}
											/>
											<h3 className="font-bold text-[14px] my-[5px]">
												{item.title}
											</h3>
										</Link>
									</div>
								);
							} else if (count > 4) {
								return (
									<div
										key={count}
										className="item w-full mb-[5px] pb-[5px] border-b-[1px] border-[#ddd]"
									>
										<Link href={`/posts/${item.id}`}>
											<h3 className="font-bold text-[14px] my-[5px]">
												{item.title}
											</h3>
										</Link>
									</div>
								);
							}
						},
					)}
				</div>
			</div>
		</div>
	);
};
export default TinNoiBat;

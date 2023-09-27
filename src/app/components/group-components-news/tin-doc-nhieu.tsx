"use client";
import "../../../assets/home-page.css";
import Link from "next/link";
import Image from "next/image";
import PicSearch from "../../../public/search.png";
import useSWR from "swr";

const TinDocNhieu = () => {
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
			<h2 className="title-news my-[15px] relative pl-[25px] font-bold uppercase text-[20px] text-[#000] overflow-hidden before:content-[''] before:absolute before:left-0 before:top-[50%] before:bg-[url('https://beta.odecompany.com/wp-content/uploads/2023/08/Frame-arr.png')] before:bg-contain before:bg-no-repeat before:w-[15px] before:h-[20px] before:translate-y-[-50%] after:content-[''] after:w-full after:h-[2px] after:bg-[#A83426] after:absolute after:ml-[15px] after:top-[50%]">
				{home_data.tin_doc_nhieu.title}
			</h2>
			<div className="list-post">
				{home_data.tin_doc_nhieu.list_post.map((item: any, count: number) => {
					if (count == 1) {
						return (
							<div key={item.id} className="item w-full my-[10px] pb-[10px] border-b-[1px] border-dotted">
								<div className="h-[150px]">
									<Image
										className="w-full h-full object-cover"
										src={`${item.thumbnail}`}
										alt={item.title}
										width={500}
										height={500}
									/>
								</div>
								<div>
									<h3 className="font-bold text-[14px] mt-[10px]">{item.title}</h3>
								</div>
							</div>
						);
					} else {
						return (
							<div
								key={item.id}
								className="item w-full my-[10px] pb-[10px] border-b-[1px] border-dotted"
							>
								<Link href={`/posts/${item.id}`}>
									<div>
										<h3 className="font-bold text-[14px]">{item.title}</h3>
									</div>
								</Link>
							</div>
						);
					}
				})}
			</div>
		</>
	);
};

export default TinDocNhieu;

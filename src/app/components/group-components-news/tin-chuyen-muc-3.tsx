"use client";
import "../../../assets/home-page.css";
import Link from "next/link";
import Image from "next/image";
import PicSearch from "../../../public/search.png";
import useSWR from "swr";

const TinChuyenMuc3 = () => {
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
				<Link href={`/category/${home_data.tin_chuyen_muc_3.slug}`}>
					{home_data.tin_chuyen_muc_3.title}
				</Link>
			</h2>
			<div className="list overflow-hidden">
				{home_data.tin_chuyen_muc_3.list_post.map((post: any, count: number) => {
					if (count == 1) {
						return (
							<div key={post.id} className="item w-[62%] float-left max-[768px]:w-full">
								<Link href={`/post/${post.id}`}>
									<div className="h-[200px]">
										<Image
											className="w-full h-full object-cover"
											src={post.thumbnail}
											alt={post.title}
											width={500}
											height={500}
										/>
									</div>
									<h3 className="font-bold text-[14px] my-[15px]">{post.title}</h3>
								</Link>
							</div>
						);
					} else {
						return (
							<div key={post.id} className="item w-[35%] float-right max-[768px]:w-full">
								<Link href={`/post/${post.id}`}>
									<div className="h-[80px] max-[768px]:h-[200px]">
										<Image
											className="w-full h-full object-cover"
											src={post.thumbnail}
											alt={post.title}
											width={500}
											height={500}
										/>
									</div>
									<h3 className="font-bold text-[14px] my-[15px]">{post.title}</h3>
								</Link>
							</div>
						);
					}
				})}

			</div>
		</>
	);
};
export default TinChuyenMuc3;

"use client";
import useSWR from "swr";

import Link from "next/link";
import Image from "next/image";

const AppMidHeader = () => {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());

	const {
		data: dataNews,
		error: error,
		isLoading: isLoading,
	} = useSWR(
		`https://beta.odecompany.com/wp-json/api/v1/news?limit=${10}`,
		fetcher,
	);

	const {
		data: topheader,
		error: error2,
		isLoading: isLoading2,
	} = useSWR(`https://beta.odecompany.com/wp-json/api/v1/topheader`, fetcher);

	if (error || error2) return <div>Data failed</div>;
	if (isLoading || isLoading2)
		return (
			<div className="loading">
				<div className="loader"></div>
			</div>
		);

	// console.log(topheader);
	return (
		<div className="mid-header max-[768px]:hidden">
			<div className="hot-news-top relative px-[10%] py-[20px] flex justify-between items-center">
				<div className="header-logo w-[20%]">
					<Link href="/">
						<Image
							src={topheader.logo_image}
							alt={"Kênh thông tin tổng hợp chuyển động BĐB 24h"}
							width={200}
							height={100}
							priority
						/>
					</Link>
				</div>

				<div className="w-[50%] pr-[30px]">
					<div className="flex justify-between mb-[10px]">
						<h3 className="text-[#000] text-[14px] font-medium">
							{topheader.hotnews_group.text_hot_news}
						</h3>
					</div>

					<div
						className="h-[150px] static overflow-y-auto pr-[20px]"
						id="style-2"
					>
						{dataNews?.map((post: any) => {
							return (
								<div
									key={post.ID}
									className="item mb-[5px] pb-[5px] border-b-[1px] border-[#bebebe]"
								>
									<Link
										href={`/posts/${post.ID}`}
										className="flex"
									>
										<p className="title-p text-[#000] text-[14px] w-[10%]">
											{post.post_time}
										</p>
										<p className="title-p text-[#000] text-[14px] w-[90%]">
											{post.post_title}
										</p>
									</Link>
								</div>
							);
						})}
					</div>
				</div>

				<div className="w-[30%]">
					<iframe
						id="iframeChart"
						width="335"
						height="190"
						src="https://s.cafef.vn/chartheader.chn?font=Roboto%20Regular&amp;rd=146542382"
						className="border-none"
					></iframe>
				</div>
			</div>
		</div>
	);
};
export default AppMidHeader;

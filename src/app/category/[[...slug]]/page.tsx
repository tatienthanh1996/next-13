// import { useEffect, useState } from "react";

"use client";
import Link from "next/link";
import useSWR from "swr";

function Cats({ params }: { params: { slug: string } }) {
	// const postNews = await getNewsById(params.id);
	const pam = params.slug;
	const param = pam[pam.length - 1];
	// console.log(param);

	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR(
		`https://beta.odecompany.com/wp-json/api/v1/category/${param}`,
		fetcher,
	);

	if (error) return <div>Data failed</div>;
	if (isLoading) return <div>Loading ...</div>;

	console.log(data);
	// data.forEach((item: any) => {
	// 	console.log(item);
	// });

	return (
		<>
			<h1>Param truyền vào: {params.slug}</h1>

			<div className="list-cat-child">
				{
					data.child_category && (
						<h2 className="my-[20px] text-3xl font-bold">
							Danh sách các chuyên mục con
						</h2>
					)
				}

				{data?.child_category?.map((cat: any) => {
					// console.log(post);
					return (
						<div key={cat.term_id} className="">
							<div>
								<Link href={`${params.slug}/${cat.slug}/`}>
									{cat.name}
								</Link>
							</div>
						</div>
					);
				})}
			</div>

			<div className="list-posts">
				<h2 className="my-[20px] text-3xl font-bold">
					Danh sách các bài viết
				</h2>
				{data?.posts?.map((post: any) => {
					// console.log(post);
					return (
						<div key={post.ID} className="">
							<div>
								<Link href={`/posts/${post.ID}`}>
									{post.post_title}
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
export default Cats;

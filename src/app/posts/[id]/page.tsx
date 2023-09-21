// import { useEffect, useState } from "react";

"use client";
import useSWR from "swr";

function PostNews({ params }: { params: { id: any } }) {
	// const postNews = await getNewsById(params.id);

	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR(
		`https://beta.odecompany.com/wp-json/api/v1/news/${params.id}`,
		fetcher,
	);

	if (error) return <div>Data failed</div>;
	if (isLoading) return <div>Loading ...</div>;

	return (
		<>
			<h1>My PostNews by id: {data.ID}</h1>

			<div>
				<p key={data.ID}>title post: {data.post_title}</p>
			</div>
		</>
	);
}
export default PostNews;

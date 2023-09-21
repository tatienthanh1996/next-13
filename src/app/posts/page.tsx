"use client";
import Link from "next/link";
import useSWR from "swr";

export default function About() {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const { data, error, isLoading } = useSWR(
		`https://beta.odecompany.com/wp-json/api/v1/news?limit=${10}`,
		fetcher,
	);

	if (error) return <div>Data failed</div>;
	if (isLoading) return <div>Loading ...</div>;

	console.log(data);

	return (
		<>
			<div>
				<h1 className="text-3xl font-bold">List posts</h1>
				<ul className="listPostsNews">
					{data.map((post: any) => (
						<li key={post.ID}>
							<Link id={post.ID} href={`/posts/${post.ID}`}>
								{post.post_title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

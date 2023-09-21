import type { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// fetch data
	// const res = await fetch(
	// 	`https://beta.odecompany.com/wp-json/api/v1/news/${params.id}`,
	// );
	// const postNews = await res.json();

	return {
		title: "List posts",
		openGraph: {
			title: "List posts",
			images: "",
		},
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}

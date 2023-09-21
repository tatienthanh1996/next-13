export default async function getNews() {
	const response = await fetch(
		`https://beta.odecompany.com/wp-json/api/v1/news`,
	);

	if (!response.ok) {
		throw new Error("failed to fetch news");
	}

	return await response.json();
}

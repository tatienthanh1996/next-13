export default async function getNewsById(id: any) {
	const response = await fetch(
		`https://beta.odecompany.com/wp-json/api/v1/news/${id}`,
	);

	if (!response.ok) {
		throw new Error("failed to fetch news");
	}

	return await response.json();
}

export default function normalizeURL(url) {
	const normalizedURL = new URL(url);

	return (
		normalizedURL.hostname.toLowerCase() + normalizedURL.pathname.toLowerCase()
	);
}

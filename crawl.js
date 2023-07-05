const { JSDOM } = require("jsdom");

function normalizeURL(url) {
	const normalizedURL = new URL(url);
	let pathName = `${normalizedURL.hostname}${normalizedURL.pathname}`;
	if (pathName.length > 0 && pathName.slice(-1) === "/") {
		pathName = pathName.slice(0, -1);
	}

	return pathName;
}

function getURLsFromHTML(html, baseURL) {
	const urls = [];
	const dom = new JSDOM(html);
	const links = dom.window.document.querySelectorAll("a");
	for (let link of links) {
		if (link.href[0] === "/") {
			try {
				urls.push(new URL(link.href, baseURL).href);
			} catch (err) {
				console.log(`${err.message}: ${link.href}`);
			}
		} else {
			try {
				urls.push(new URL(link.href).href);
			} catch (err) {
				console.log(`${err.message}: ${link.href}`);
			}
		}
	}
	return urls;
}

async function crawlPage(baseUrl, currentURL, pages) {
	let baseURLobj = new URL(baseUrl);
	let currentURLobj = new URL(currentURL);

	if (baseURLobj.hostname !== currentURLobj.hostname) {
		return pages;
	}

	const normalizedURL = normalizeURL(currentURL);
	if (pages[normalizedURL] > 0) {
		pages[normalizedURL] += 1;
		return pages;
	}

	pages[normalizedURL] = 1;

	console.log(`Started crawling ${currentURL}`);
	let htmlBody = "";
	try {
		const response = await fetch(baseUrl);
		if (response.status > 399) {
			console.log(`Error: ${response.status} ${response.statusText}`);
			return;
		}
		const contentType = response.headers.get("content-type");
		if (!contentType.includes("text/html")) {
			console.log(`Got non-html response: ${contentType}`);
			return;
		}
		htmlBody = await response.text();
	} catch (err) {
		console.log(err.message);
	}
	const nextURLs = getURLsFromHTML(htmlBody, baseUrl);

	for (let nextURL of nextURLs) {
		pages = await crawlPage(baseUrl, nextURL, pages);
	}
	return pages;
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };

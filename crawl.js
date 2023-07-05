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
	console.log(`crawling ${baseUrl}`);
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
		console.log(await response.text());
	} catch (err) {
		console.log(err.message);
	}
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };

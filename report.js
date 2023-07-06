function printReport(pages) {
	console.log("===== Report =====");
	const sortedPages = sortPages(pages);
	for (const page of sortedPages) {
		const url = page[0];
		const hits = page[1];
		console.log(`found ${hits} links to page ${url}`);
	}
}

function sortPages(pages) {
	// Sort pages by page number
	const pagesArray = Object.entries(pages);

	pagesArray.sort((a, b) => {
		return b[1] - a[1];
	});
	return pagesArray;
}

module.exports = { sortPages, printReport };

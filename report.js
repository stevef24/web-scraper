function sortPages(pages) {
	// Sort pages by page number
	const pagesArray = Object.entries(pages);

	pagesArray.sort((a, b) => {
		return b[1] - a[1];
	});

	return pagesArray;
}

module.exports = { sortPages };

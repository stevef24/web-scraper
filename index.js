const { crawlPage } = require("./crawl.js");

function main() {
	console.log(process.argv);
	if (process.argv.length < 3) {
		console.log("no website provided");
	}
	if (process.argv.length > 3) {
		console.log("too many arguments provided");
	}

	const baseURL = process.argv[2];
	console.log(`starting crawl of: ${baseURL}...`);
	crawlPage(baseURL);
}

main();

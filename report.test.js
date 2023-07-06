const { sortPages } = require("./report");
const { test, expect } = require("@jest/globals");

describe("prepare report for pages ", () => {
	test("sort 2 pages ", () => {
		const input = {
			"https://wagslane.com/path": 1,
			"https://wagslane.com": 3,
		};
		const actual = sortPages(input);
		const expected = [
			["https://wagslane.com", 3],
			["https://wagslane.com/path", 1],
		];
		expect(actual).toEqual(expected);
	});
	test("sort 5 pages ", () => {
		const input = {
			"https://wagslane.com/path": 1,
			"https://wagslane.com/path/1": 3,
			"https://wagslane.com/hello": 19,
			"https://wagslane.com/path/there": 12,
			"https://wagslane.com/path/about/id": 4,
			"https://wagslane.com/about": 89,
		};
		const actual = sortPages(input);
		const expected = [
			["https://wagslane.com/path", 1],
			["https://wagslane.com", 3],
			["https://wagslane.com/path/about/id", 4],
			["https://wagslane.com/path/there", 12],
			["https://wagslane.com/hello", 19],
			["https://wagslane.com/about", 89],
		];
		expect(actual).toEqual(expected);
	});
});

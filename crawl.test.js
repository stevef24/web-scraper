const { test, expect, describe } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

describe("convert url into standard path string", () => {
	let output = "wagslane.dev/path";
	test("should return a normalized URL", () => {
		let input = "https://wagslane.dev/path/";
		expect(normalizeURL(input)).toBe(output);
	});

	test("should return a normalized URL", () => {
		let input = "https://wagsLane.Dev/path";
		expect(normalizeURL(input)).toBe(output);
	});
	test("should return a normalized URL", () => {
		let input = "https://wagslane.dev/path";
		expect(normalizeURL(input)).toBe(output);
	});
	test("should return a normalized URL", () => {
		let input = "https://wagslane.dev/path/";
		expect(normalizeURL(input)).toBe(output);
	});
});

describe("get the url from the html", () => {
	const inputURL = "https://blog.boot.dev";
	test("getURLsFromHTML absolute", () => {
		const inputBody =
			'<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
		const actual = getURLsFromHTML(inputBody, inputURL);
		const expected = ["https://blog.boot.dev/"];
		expect(actual).toEqual(expected);
	});

	test("getURLsFromHTML relative", () => {
		const inputBody =
			'<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
		const actual = getURLsFromHTML(inputBody, inputURL);
		const expected = ["https://blog.boot.dev/path/one"];
		expect(actual).toEqual(expected);
	});

	test("getURLsFromHTML both", () => {
		const inputBody =
			'<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
		const actual = getURLsFromHTML(inputBody, inputURL);
		const expected = [
			"https://blog.boot.dev/path/one",
			"https://other.com/path/one",
		];
		expect(actual).toEqual(expected);
	});

	test("getURLsFromHTML handle error", () => {
		const inputBody =
			'<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
		const actual = getURLsFromHTML(inputBody, inputURL);
		const expected = [];
		expect(actual).toEqual(expected);
	});
});

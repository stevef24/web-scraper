import { describe, expect, test } from "@jest/globals";
import normalizeURL from "./crawl.js";

describe("normalizeURL", () => {
	test("should return a normalized URL", () => {
		expect(normalizeURL("https://www.Example.com/pathname")).toBe(
			"www.example.com/pathname"
		);
	});
	test("should return a normalized URL", () => {
		expect(normalizeURL("https://www.EXAMPLE.com")).toBe("www.example.com/");
	});
	test("should return a normalized URL", () => {
		expect(normalizeURL("www.Example.COM")).toBe("www.example.com/");
	});
	test("should return a normalized URL", () => {
		expect(normalizeURL("https://www.Example.com")).toBe("www.example.com/");
	});
});

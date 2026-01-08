import { JSDOM } from "jsdom";
import { HTML_CONTENT_TYPE } from "./constants";
import {
	validateDefinedString,
	validateFileExistance,
	validateResource,
} from "./validations";
import puppeteer from "puppeteer";

export async function _fromHttp(
	source: string,
	selector: string
): Promise<Element[]> {
	const res = await validateResource(source);

	const html = await res.text();

	const dom = new JSDOM(html, {
		url: source,
		contentType: HTML_CONTENT_TYPE,
	});

	const document = dom.window.document;

	return Array.from(document.querySelectorAll(selector));
}

export async function _fromHeadlessBrowser(
	source: string,
	selector: string
): Promise<Element[]> {
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();

	await page.goto(source, { waitUntil: "domcontentloaded" });
	await page.waitForSelector('body'); // make sure to get the content

	const html = await page.content();
	await browser.close();

	const dom = new JSDOM(html, {
		contentType: "text/html",
	});

	const document = dom.window.document;

	return Array.from(document.querySelectorAll(selector));
}

export const _fromFile = async (source: string, selector: string) => {
	let html = await validateFileExistance(source);

	const dom = new JSDOM(html, {
		contentType: HTML_CONTENT_TYPE,
	});

	const document = dom.window.document;
	return Array.from(document.querySelectorAll(selector));
};

export const _fromString = async (html: string, selector: string) => {
	html = await validateDefinedString(html);
	const dom = new JSDOM(html, {
		contentType: HTML_CONTENT_TYPE,
	});

	const document = dom.window.document;
	return Array.from(document.querySelectorAll(selector));
};

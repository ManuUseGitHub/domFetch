import { JSDOM } from "jsdom";
import { HTML_CONTENT_TYPE } from "./constants";
import {
	validateFileExistance,
	validateResource,
} from "./validations";

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

export const _fromFile = async (source: string, selector: string) => {
	let html = await validateFileExistance(source);

	const dom = new JSDOM(html, {
		contentType: HTML_CONTENT_TYPE,
	});

	const document = dom.window.document;
	return Array.from(document.querySelectorAll(selector));
};

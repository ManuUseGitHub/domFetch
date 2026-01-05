import { FetchOptions } from "./types";
import { _fromFile, _fromHttp, _fromString } from "./fetch";
import { validateOutputOption, validateSourceOption } from "./validations";

/**
 *
 * @param source References the source from where to fetch the DOM. It can be an a relative file path or an URL
 * @param selector The query selector used to fetch elements from the DOM. (will run querySelectorAll)
 * @param options The FetchOptions needed for the requested elements
 * @returns
 */
export async function selectElements(
	source: string,
	selector: string,
	options?: FetchOptions
) {
	try {
		let nodes: Array<Element> = [];
		const fixedOptions = _initOptions(options);
		const sourceOption = validateSourceOption(fixedOptions);

		if (sourceOption == "url") {
			nodes = await _fromHttp(source, selector);
		} else if (sourceOption == "file") {
			nodes = await _fromFile(source, selector);
		} else if (sourceOption == "string") {
			nodes = await _fromString(source, selector);
		}

		return nodes.map((el) => {
			return _computed(el, fixedOptions);
		});
	} catch (error: any) {
		return Promise.reject(error);
	}
}

// ============================= PRIVATE functions =============================

const _initOptions = (options: any = {}) => {
	const { output = "html", source = "url" } = options;
	return { output, source } as FetchOptions;
};

const _computed = (el: Element, options: FetchOptions) => {
	let result: any;
	const output = validateOutputOption(options);

	switch (output) {
		case "html":
		case "children":
			if (output == "html") {
				result = el.outerHTML;
			} else {
				result = el.innerHTML;
			}
			break;
		case "breakdown":
			result = {
				tag: el.tagName.toLowerCase(),
				text: el.textContent?.trim() ?? "",
				html: el.innerHTML,
				attributes: Object.fromEntries(
					Array.from(el.attributes).map((a) => [a.name, a.value])
				),
			};
			break;
		default:
			result = el;
	}
	return result;
};

import { existsSync } from "node:fs";
import { VERSION } from "./constants";
import { FetchOptions } from "./types";
import { readFile } from "node:fs/promises";

const UA = `dom-fetch/${VERSION}`;

export function validateOutputOption(options: FetchOptions) {
	const output = options.output;
	if (!/^(?:object|html|children|breakdown)$/.test(output)) {
		throw `output option not supported ["${output}"]`;
	}
	return output;
}

export function validateSourceOption(options: FetchOptions) {
	const source = options.source;
	if (!/^(?:url|file)$/.test(source)) {
		throw `source option not supported ["${source}"]`;
	}
	return source;
}

export function validateHTTPSource(source: string) {
	if (!source.startsWith("http")) {
		throw "source given is not an URL";
	}
}

export async function validateResource(source: string) {
	const res = await fetch(source, {
		headers: {
			"User-Agent": UA,
			Accept: "text/html",
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch ${source}`);
	}
	return res;
}

export async function validateFileExistance(source: string) {
	if (!existsSync(source)) {
		throw new Error(`no such file ["${source}"]`);
	}
	return await readFile(source, "utf-8");
}

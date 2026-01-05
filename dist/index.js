var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  selectElements: () => selectElements
});
module.exports = __toCommonJS(index_exports);

// src/fetch.ts
var import_jsdom = require("jsdom");

// src/constants.ts
var HTML_CONTENT_TYPE = "text/html";
var VERSION = "1.0.2";

// src/validations.ts
var import_node_fs = require("fs");
var import_promises = require("fs/promises");
var UA = `@maze014/dom-fetch/${VERSION}`;
function validateOutputOption(options) {
  const output = options.output;
  if (!/^(?:object|html|children|breakdown)$/.test(output)) {
    throw `output option not supported ["${output}"]`;
  }
  return output;
}
function validateSourceOption(options) {
  const source = options.source;
  if (!/^(?:url|file|string)$/.test(source)) {
    throw `source option not supported ["${source}"]`;
  }
  return source;
}
async function validateResource(source) {
  const res = await fetch(source, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html"
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${source}`);
  }
  return res;
}
async function validateFileExistance(source) {
  if (!(0, import_node_fs.existsSync)(source)) {
    throw new Error(`no such file ["${source}"]`);
  }
  return await (0, import_promises.readFile)(source, "utf-8");
}
async function validateDefinedString(source) {
  if (source == null || source == void 0) {
    throw new Error(`no content read from["${source}"]`);
  }
  return source;
}

// src/fetch.ts
async function _fromHttp(source, selector) {
  const res = await validateResource(source);
  const html = await res.text();
  const dom = new import_jsdom.JSDOM(html, {
    url: source,
    contentType: HTML_CONTENT_TYPE
  });
  const document = dom.window.document;
  return Array.from(document.querySelectorAll(selector));
}
var _fromFile = async (source, selector) => {
  let html = await validateFileExistance(source);
  const dom = new import_jsdom.JSDOM(html, {
    contentType: HTML_CONTENT_TYPE
  });
  const document = dom.window.document;
  return Array.from(document.querySelectorAll(selector));
};
var _fromString = async (html, selector) => {
  html = await validateDefinedString(html);
  const dom = new import_jsdom.JSDOM(html, {
    contentType: HTML_CONTENT_TYPE
  });
  const document = dom.window.document;
  return Array.from(document.querySelectorAll(selector));
};

// src/index.ts
async function selectElements(source, selector, options) {
  try {
    let nodes = [];
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
  } catch (error) {
    return Promise.reject(error);
  }
}
var _initOptions = (options = {}) => {
  const { output = "html", source = "url" } = options;
  return { output, source };
};
var _computed = (el, options) => {
  let result;
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
        )
      };
      break;
    default:
      result = el;
  }
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  selectElements
});
//# sourceMappingURL=index.js.map
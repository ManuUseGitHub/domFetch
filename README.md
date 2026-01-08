# domFetch

Fetch and extract DOM elements from a **URL or local HTML file** using a CSS query selector.

`@maze014/dom-fetch` lets you retrieve HTML elements and choose how they are represented (raw element, HTML string, children HTML, or a structured breakdown).

---

## Installation

```bash
$ npm install @maze014/dom-fetch
```

---

## Usage

### Basic example (fetch from a URL)

```ts
import { selectElements } from "@maze014/dom-fetch";

const soutce = "https://example.com";
const selector = "h1";

const elements = await selectElements(source,selector);

console.log(elements);
```

So this returns an array of `outerHTML` strings by default against the  `https://example.com` address.

---

## Custom usages

Depeding on your needs, you can use the option argument to define how the utility should manage your request.
You can fetch from multiple sources:

- by html file
- by runtime string
- by an headless browser
- by url (default:basic usage)

### Fetch from a local HTML file

```ts
import { selectElements } from "@maze014/dom-fetch";

const soutce = "./index.html";
const selector = ".article";
const option = { source: "file" } 

const elements = await selectElements(source,selector,options);
```

### Fetch from runtime string

```ts
import { selectElements } from "@maze014/dom-fetch";
const source = "<!DOCTYPE html>" +`
<html>
  <body>
    <a class='article'>Click here<a/>
  </body>
</html>`;

const selector = ".article";
const options = { source: "string" } 

const elements = await selectElements(source,selector,options);
```

### Fetch from an headless blowser

In some cases, the content needs to be the result of javascript execution. You may, then, wait for the content to be generated like for example an SPA. We got you covered with the `headless` source option!

We set a strategy leveraging `puppeteer` for that matter.

```ts
import { selectElements } from "@maze014/dom-fetch";

const soutce = "https://example-with-spa.com";
const selector = "main";
const options = { source: "headless" }

const elements = await selectElements(source,selector,options);

console.log(elements);
```

> ⚠️ Be aware that what you can get from the web console can differ from what you can get with domFetch. Please make sure to check what the output is before continuing your process.

---

### Change output format

```ts
const elements = await selectElements(
  "https://example.com",
  "a",
  { output: "breakdown" }
);
```

## Output formats

The `output` option controls how each matched element is returned.

| Output value  | Description                                        |
| ------------- | -------------------------------------------------- |
| `"html"`      | The full HTML of the matched element (`outerHTML`) |
| `"children"`  | The inner HTML of the matched element              |
| `"object"`    | The raw DOM `Element`                              |
| `"breakdown"` | A structured object describing the element         |

### Breakdown output example

```ts
{
  tag: "a",
  text: "Click here",
  html: "<a>Click here</a>",
  attributes: {
    href: "/about",
    class: "link"
  }
}
```

### Within a node script from a resource

First, create a simple js file that displays the paragraphs of the NodeJS page

```js
// nodeParagraphs.mjs

const source = "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs";
const selector = "main p";

const paragraphs = await selectElements(source, selector)

console.log(paragraphs.join(""))
```

Then write out in an html file

```bash
$ node nodeParagraphs.mjs > paragraphs.html
```

### Within a node script from a local file

First, create a simple js file that displays the paragraphs of the NodeJS page

```ts
// nodeParagraphs.mjs

const source = "./example/nodePage.html";
const selector = "main p";
const options = { ... };

const paragraphs = await selectElements(source, selector, options)

console.log(paragraphs.join(""))
```

Then write out in an html file

```bash
$ node nodeParagraphs.mjs > paragraphs.html
```

---

## API

### `selectElements(source: string, selector: string, options?: FetchOptions): Promise<any[]>`

Fetches elements matching a CSS selector from a given source.

#### Parameters

| Parameter        | Type                                              | Default  | Description                               |
| ---------------- | ------------------------------------------------- | -------- | ----------------------------------------- |
| `source`         | `string`                                          | —        | URL or relative file path containing HTML |
| `selector`       | `string`                                          | —        | CSS selector (uses `querySelectorAll`)    |
| `options.output` | `object` or <br/> **`html`** or <br/> `children` or <br/> `breakdown` | `"html"` | Format of returned elements               |
| `options.source` | `url` or <br/> **`file`** or <br/> `string` or <br/> `headless`   | `"url"`  | Defines how the source is fetched         |

#### Returns

**`Promise<any[]>`**  
An array of elements formatted according to the selected `output` option.

---

## FetchOptions

```ts
type FetchOptions = {
  output?: "object" | "html" | "children" | "breakdown";
  source?: "url" | "file" | "string" | "headless";
};
```

---

## Tests

A test project is available via [this repository](https://github.com/ManuUseGitHub/domFetchTest).

---

## License

[MIT](https://github.com/ManuUseGitHub/domFetch?tab=MIT-1-ov-file#readme)

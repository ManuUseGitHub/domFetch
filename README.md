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

const elements = await selectElements(
  "https://example.com",
  "h1"
);

console.log(elements);
```

By default:
- `source` is `"url"`
- `output` is `"html"`

So this returns an array of `outerHTML` strings.

---

### Fetch from a local HTML file

```ts
const elements = await selectElements(
  "./index.html",
  ".article",
  { source: "file" }
);
```
---

### Fetch from runtime string
```ts
const html = "<!DOCTYPE html>" +`
<html>
  <body>
    <a class='article'>Click here<a/>
  </body>
</html>`;

const elements = await selectElements(
  html, ".article", { source: "string" }
);
```

---

### Change output format

```ts
const elements = await selectElements(
  "https://example.com",
  "a",
  { output: "breakdown" }
);
```

---

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

```js
// nodeParagraphs.mjs

const source = "./example/nodePage.html";
const selector = "main p";
const options = { source : 'file' };

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
| `options.output` | `"object" \| "html" \| "children" \| "breakdown"` | `"html"` | Format of returned elements               |
| `options.source` | `"url" \| "file" \| "string"`                     | `"url"`  | Defines how the source is fetched         |

#### Returns

**`Promise<any[]>`**  
An array of elements formatted according to the selected `output` option.

---

## FetchOptions

```ts
type FetchOptions = {
  output?: "object" | "html" | "children" | "breakdown";
  source?: "url" | "file" | "string";
};
```

---

## Tests

A test project is available via [this repository](https://github.com/ManuUseGitHub/domFetchTest).


---

## License

[MIT](https://github.com/ManuUseGitHub/domFetch?tab=MIT-1-ov-file#readme)

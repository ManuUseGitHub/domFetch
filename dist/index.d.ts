/**
 * Defines the kind of representation you can get from the request
 * object : the element itself
 * html : the targeted elements HTML. The root element being the element matched by the queryy selector
 * children : the HTML of the children from the targeted elements matched
 * breakdown : the brokendown element
 */
type FetchOutput = "object" | "html" | "children" | "breakdown";
/**
 * Defines the kind of sourse to fetch from or read from
 * file : the source should be a file defined by a relative path
 * url : the source should be the response of a fetched resource through the HTTP GET method
 * string : the source should be from a string read at runtime
 */
type FetchSource = "file" | "url" | "string";
/**
 * Defines how the request should work to fetch the element of a given source kind
 */
type FetchOptions = {
    output: FetchOutput;
    source: FetchSource;
};

/**
 *
 * @param source References the source from where to fetch the DOM. It can be an a relative file path or an URL
 * @param selector The query selector used to fetch elements from the DOM. (will run querySelectorAll)
 * @param options The FetchOptions needed for the requested elements
 * @returns
 */
declare function selectElements(source: string, selector: string, options?: FetchOptions): Promise<any[]>;

export { selectElements };


/**
 * Defines the kind of representation you can get from the request
 * object : the element itself
 * html : the targeted elements HTML. The root element being the element matched by the queryy selector
 * children : the HTML of the children from the targeted elements matched
 * breakdown : the brokendown element
 */
export type FetchOutput = "object" | "html" | "children" | "breakdown";

/**
 * Defines the kind of sourse to fetch from or read from
 * file : the source should be a file defined by a relative path
 * url : the source should be the response of a fetched resource through the HTTP GET method
 * headless : the source request will use an address but will play within an headless server
 *      usefull if the content should be get from JS excution like with SPAs
 * string : the source should be from a string read at runtime
 */
export type FetchSource = "file" | "url" | "string" | "headless";

/**
 * Defines how the request should work to fetch the element of a given source kind
 */
export type FetchOptions = {
    output: FetchOutput;
    source: FetchSource;
};

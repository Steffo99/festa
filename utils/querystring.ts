import { ParsedUrlQuery } from "querystring"

/**
 * Ensure that the passed {@link ParsedUrlQuery} object has **one and only one** key with the specified name, and get its value.
 * 
 * @param queryObj The object to read the value from.
 * @param key The name of the value to read.
 * @returns The resulting string.
 */
export function getSingle(queryObj: ParsedUrlQuery, key: string): string {
    const value = queryObj[key]

    switch(typeof value) {
        case "undefined":
            throw new Error(`No "${key}" parameter found in the query string.`)
        case "object":
            throw new Error(`Multiple "${key}" parameters specified in the query string.`)
        case "string":
            return value
    }
}
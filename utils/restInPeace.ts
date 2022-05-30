/**
 * 3 AM coding
 */

import { NextApiRequest, NextApiResponse } from "next";
import { ApiError, ApiResult } from "../types/api";


type RestInOptions<T> = {
    /**
     * Prisma delegate to operate on.
     */
    model: any,

    /**
     * What kind of request is being performed: `true` for list, `false` for detail.
     */
    isList: boolean

    /**
     * Where clause for Prisma queries about multiple objects.
     * 
     * Cannot be set together with `whereDetail`.
     */
    whereList: object,

    /**
     * Where clause for Prisma queries about a single object.
     * 
     * Cannot be set together with `whereList`.
     */
    whereDetail: object,

    /**
     * The same as Prisma's `create`.
     */
    create: any,

    /**
     * The same as Prisma's `update`.
     */
    update: any,

    /**
     * Operations not allowed.
     */
    disallow?: {
        head?: boolean,
        options?: boolean,
        retrieve?: boolean,
        list?: boolean,
        create?: boolean,
        upsert?: boolean,
        update?: boolean,
        destroy?: boolean,
    }

    /**
     * Hooks ran after a specific operation is completed.
     * 
     * If a {@link BreakYourBones} is thrown, it will be caught and returned to the user.
     * 
     * ```
     * throw new BreakYourBones(403, {error: "Not allowed"})
     * ```
     */
    hooks?: {
        head?: () => T,
        options?: () => T,
        retrieve?: (obj: T) => T,
        list?: (obj: T[]) => T[],
        create?: (obj: T) => T,
        upsert?: (obj: T) => T,
        update?: (obj: T) => T,
        destroy?: () => T,
    }
}

/**
 * Handle an API route in a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful way.
 */
export function restInPeace<T>(req: NextApiRequest, res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    // Ensure the wheres are set correctly
    if (options.whereList && options.whereDetail) {
        return res.status(500).json({ error: "Request is being handled as both a list operation and a detail operation" })
    }
    else if (!(options.whereList || options.whereDetail)) {
        return res.status(500).json({ error: "Request is not being handled as any kind of operation" })
    }

    // Handle HEAD by returning an empty body
    else if (req.method === "HEAD") {
        return restInHead(res, options)
    }
    // Same thing for OPTIONS, but beware of weird CORS things!
    else if (req.method === "OPTIONS") {
        return restInOptions(res, options)
    }
    // GET can be both "list" and "retrieve"
    else if (req.method === "GET") {
        return options.isList ? restInList(res, options) : restInRetrieve(res, options)
    }
    // POST is always "create"
    else if (req.method === "POST") {
        return options.isList ? noRestForTheWicked(res) : restInCreate(res, options)
    }
    // PUT is always "upsert"
    else if (req.method === "PUT") {
        return options.isList ? noRestForTheWicked(res) : restInUpsert(res, options)
    }
    // PATCH is always "update"
    else if (req.method === "PATCH") {
        return options.isList ? noRestForTheWicked(res) : restInUpdate(res, options)
    }
    // DELETE is always "destroy"
    else if (req.method === "DELETE") {
        return options.isList ? noRestForTheWicked(res) : restInDestroy(res, options)
    }

    // What kind of weird HTTP methods are you using?!
    else {
        return noRestForTheWicked(res)
    }
}

/**
 * @returns Method not allowed.
 */
function noRestForTheWicked(res: NextApiResponse) {
    return res.status(405).json({ error: "Method not allowed" })
}

/**
 * Error which interrupts the regular flow of a hook to return something different.
 * 
 * Caught by {@link theButcher}.
 */
export class BreakYourBones<AT> {
    status: number
    response: AT

    constructor(status: number, response: AT) {
        this.status = status
        this.response = response
    }
}

/**
 * Handle a {@link restInPeace} hook, catching possible {@link BreakYourBones}.
 */
function theButcher<T>(obj: any, res: NextApiResponse, options: RestInOptions<T>, method: keyof RestInOptions<T>["hooks"]) {
    try {
        var mutated = options?.hooks?.[method]?.(obj) ?? obj
    }
    catch (e) {
        if (e instanceof BreakYourBones) {
            return res.status(e.status).json(e.response)
        }
        throw e
    }
    return mutated
}

/**
 * Handle an `HEAD` HTTP request.
 */
function restInHead<T>(res: NextApiResponse<"">, options: RestInOptions<T>) {
    if (options.disallow?.head) return noRestForTheWicked(res)
    theButcher(undefined, res, options, "head")
    return res.status(200).send("")
}

/**
 * Handle an `OPTIONS` HTTP request.
 */
function restInOptions<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.options) return noRestForTheWicked(res)
    theButcher(undefined, res, options, "options")
    return res.status(200).send("")
}

/**
 * Handle a `GET` HTTP request where a list of items is requested.
 */
function restInList<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.list) return noRestForTheWicked(res)
    const objs = options.model.findMany({ where: options.whereList })
    const mutatedObjs = theButcher(objs, res, options, "list")
    return res.status(200).json(mutatedObjs)
}

/**
 * Handle a `GET` HTTP request where a single item is requested.
 */
function restInRetrieve<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.retrieve) return noRestForTheWicked(res)
    const obj = options.model.findUnique({ where: options.whereDetail })
    const mutatedObj = theButcher(obj, res, options, "retrieve")
    if (!obj) {
        return res.status(404).json({ error: "Not found" })
    }
    return res.status(200).json(mutatedObj)
}

/**
 * Handle a `POST` HTTP request where a single item is created.
 */
function restInCreate<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.create) return noRestForTheWicked(res)
    const obj = options.model.create({ data: options.create })
    const mutatedObj = theButcher(obj, res, options, "create")
    return res.status(200).json(mutatedObj)
}

/**
 * Handle a `PUT` HTTP request where a single item is either created or updated.
 */
function restInUpsert<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.upsert) return noRestForTheWicked(res)
    const obj = options.model.upsert({
        where: options.whereDetail,
        create: options.create,
        update: options.update,
    })
    const mutatedObj = theButcher(obj, res, options, "upsert")
    return res.status(200).json(mutatedObj)
}

/**
 * Handle a `PATCH` HTTP request where a single item is updated.
 */
function restInUpdate<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.update) return noRestForTheWicked(res)
    const obj = options.model.update({
        where: options.whereDetail,
        data: options.update,
    })
    const mutatedObj = theButcher(obj, res, options, "update")
    return res.status(200).json(mutatedObj)
}

/**
 * Handle a `DELETE` HTTP request where a single item is destroyed.
 */
function restInDestroy<T>(res: NextApiResponse<ApiResult<T>>, options: RestInOptions<T>) {
    if (options.disallow?.destroy) return noRestForTheWicked(res)
    options.model.delete({
        where: options.whereDetail,
    })
    theButcher(undefined, res, options, "destroy")
    return res.status(204).send("")
}

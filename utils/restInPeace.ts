import { NextApiRequest, NextApiResponse } from "next";
import { ApiError, ApiResult } from "../types/api";


// I don't know what the typing of a Prisma model is.
export type Model = any


type RestInPeaceOptions<T> = {
    /**
     * Prisma delegate to operate on.
     */
    model: Model,

    /**
     * Options for the "head" operation.
     */
    head?: HeadOptions<T>

    /**
     * Options for the "options" operation.
     */
    options?: OptionsOptions<T>

    /**
     * Options for the "list" operation.
     */
    list?: ListOptions<T>

    /**
     * Options for the "retrieve" operation.
     */
    retrieve?: RetrieveOptions<T>

    /**
     * Options for the "create" operation.
     */
    create?: CreateOptions<T>

    /**
     * Options for the "upsert" operation.
     */
    upsert?: UpsertOptions<T>

    /**
     * Options for the "update" operation.
     */
    update?: UpdateOptions<T>

    /**
     * Options for the "destroy" operation.
     */
    destroy?: DestroyOptions<T>
}

/**
 * Handle an API route in a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)ful way.
 */
export async function restInPeace<T>(req: NextApiRequest, res: NextApiResponse<ApiResult<T>>, options: RestInPeaceOptions<T>) {
    // Handle HEAD by returning an empty body
    if (options.head && req.method === "HEAD") {
        return await handleHead(res, options.model, options.head)
    }
    // Same thing for OPTIONS, but beware of weird CORS things!
    else if (options.options && req.method === "OPTIONS") {
        return await handleOptions(res, options.model, options.options)
    }
    // GET can be both "list" and "retrieve"
    else if (options.list && options.list.where && req.method === "GET") {
        return await handleList(res, options.model, options.list)
    }
    else if(options.retrieve && options.retrieve.which && req.method === "GET") {
        return await handleRetrieve(res, options.model, options.retrieve)
    }
    // POST is always "create"
    else if (options.create && req.method === "POST") {
        return await handleCreate(res, options.model, options.create)
    }
    // PUT is always "upsert"
    else if (options.upsert && options.upsert.which && req.method === "PUT") {
        return await handleUpsert(res, options.model, options.upsert)
    }
    // PATCH is always "update"
    else if (options.update && options.update.which && req.method === "PATCH") {
        return await handleUpdate(res, options.model, options.update)
    }
    // DELETE is always "destroy"
    else if (options.destroy && options.destroy.which && req.method === "DELETE") {
        return await handleDestroy(res, options.model, options.destroy)
    }

    // What kind of weird HTTP methods are you using?!
    else {
        return res.status(405).json({ error: "Method not allowed" })
    }
}


interface OperationOptions<T> {
    before?: (model: T, obj?: any) => Promise<void>,
    after?: (model: T, obj?: any) => Promise<any>,
}


// === HEAD ===


interface HeadOptions<T> extends OperationOptions<T> {
    before?: (model: T) => Promise<void>,
    after?: (model: T) => Promise<void>,
}

/**
 * Handle an `HEAD` HTTP request.
 */
async function handleHead<T>(res: NextApiResponse<"">, model: Model, options: HeadOptions<T>) {
    await options.before?.(model)
    await options.after?.(model)
    return res.status(200).send("")
}


// === OPTIONS ===


interface OptionsOptions<T> extends OperationOptions<T> {
    before?: (model: T) => Promise<void>,
    after?: (model: T) => Promise<void>,
}

/**
 * Handle an `OPTIONS` HTTP request.
 */
async function handleOptions<T>(res: NextApiResponse<"">, model: Model, options: OptionsOptions<T>) {
    await options.before?.(model)
    await options.after?.(model)
    return res.status(200).send("")
}


// === LIST ===


interface ListOptions<T> extends OperationOptions<T> {
    /**
     * Prisma Where clause used to list objects available in a API route.
     */
    where?: object,

    before?: (model: T) => Promise<void>,
    after?: (model: T, obj: T[]) => Promise<T[]>,
}

/**
 * Handle a `GET` HTTP request where a list of items is requested.
 */
async function handleList<T>(res: NextApiResponse<ApiResult<T>>, model: Model, options: ListOptions<T>) {
    await options.before?.(model)
    const objs = await model.findMany({ where: options.where })
    const mutatedObjs = await options.after?.(model, objs) ?? objs
    return res.status(200).json(mutatedObjs)
}


// === RETRIEVE ===


interface RetrieveOptions<T> extends OperationOptions<T> {
    /**
     * Prisma Where clause used to select the object to display.
     * 
     * See also `findUnique`.
     */
    which?: object,

    before?: (model: T) => Promise<void>,
    after?: (model: T, obj: T) => Promise<T>,
}

/**
 * Handle a `GET` HTTP request where a single item is requested.
 */
async function handleRetrieve<T>(res: NextApiResponse<ApiResult<T>>, model: Model, options: RetrieveOptions<T>) {
    await options.before?.(model)
    const obj = await model.findUnique({ where: options.which })
    const mutatedObj = await options.after?.(model, obj) ?? obj
    if (!mutatedObj) {
        return res.status(404).json({ error: "Not found" })
    }
    return res.status(200).json(mutatedObj)
}


// === CREATE ===


interface CreateOptions<T> extends OperationOptions<T> {
    /**
     * Prisma Create clause used to create the object.
     */
    create: object,

    before?: (model: T) => Promise<void>,
    after?: (model: T, obj: T) => Promise<T>,
}

/**
 * Handle a `POST` HTTP request where a single item is created.
 */
async function handleCreate<T>(res: NextApiResponse<ApiResult<T>>, model: Model, options: CreateOptions<T>) {
    await options.before?.(model)
    const obj = await model.create({ data: options.create })
    const mutatedObj = await options.after?.(model, obj) ?? obj
    return res.status(200).json(mutatedObj)
}


// === UPSERT ===


interface UpsertOptions<T> extends OperationOptions<T> {
    /**
     * Prisma Where clause used to select the object to operate on.
     * 
     * See also `findUnique`.
     */
    which?: object,

    /**
     * Prisma Create clause used to create the object if it doesn't exist.
     */
    create: object,
    
    /**
     * Prisma Update clause used to update the object if it exists.
     */
    update: object,

    before?: (model: T, obj?: T) => Promise<void>,
    after?: (model: T, obj: T) => Promise<T>,
}

/**
 * Handle a `PUT` HTTP request where a single item is either created or updated.
 */
async function handleUpsert<T>(res: NextApiResponse<ApiResult<T>>, model: Model, options: UpsertOptions<T>) {
    const initialObj = await model.findUnique({ where: options.which })
    await options.before?.(model, initialObj)
    const obj = await model.upsert({
        where: options.which,
        create: options.create,
        update: options.update,
    })
    const mutatedObj = await options.after?.(model, obj) ?? obj
    return res.status(200).json(mutatedObj)
}


// === UPDATE ===


interface UpdateOptions<T> extends OperationOptions<T> {
    /**
     * Prisma Where clause used to select the object to operate on.
     * 
     * See also `findUnique`.
     */
    which?: object,

    /**
     * Prisma Update clause used to update the object if it exists.
     */
    update: object,

    before?: (model: T, obj?: T) => Promise<void>,
    after?: (model: T, obj: T) => Promise<T>,
}

/**
 * Handle a `PATCH` HTTP request where a single item is updated.
 */
async function handleUpdate<T>(res: NextApiResponse<ApiResult<T>>, model: Model, options: UpdateOptions<T>) {
    const initialObj = await model.findUnique({ where: options.which })
    await options.before?.(model, initialObj)
    const obj = await model.update({
        where: options.which,
        data: options.update,
    })
    const mutatedObj = await options.after?.(model, obj) ?? obj
    return res.status(200).json(mutatedObj)
}


// === DESTROY ===


interface DestroyOptions<T> extends OperationOptions<T> {
    /**
     * Prisma Where clause used to select the object to operate on.
     * 
     * See also `findUnique`.
     */
    which?: object,

    before?: (model: T, obj?: T) => Promise<void>,
    after?: (model: T) => Promise<void>,
}

/**
 * Handle a `DELETE` HTTP request where a single item is destroyed.
 */
async function handleDestroy<T>(res: NextApiResponse<ApiResult<T>>, model: Model, options: DestroyOptions<T>) {
    const initialObj = await model.findUnique({ where: options.which })
    await options.before?.(model, initialObj)
    await model.delete({
        where: options.which,
    })
    await options.after?.(model)
    return res.status(204).send("")
}
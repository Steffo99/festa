import { PrismaDelegate } from "../prismaClient"
import { Response } from "./throwables"


/**
 * Object containing a function related to data processing and request execution.
 */
export type FestaExecutor<Config, Auth, Query, Body, Response> = {
    /**
     * Array of HTTP methods that can be handled by the executor.
     */
    methods: string[]

    /**
     * Async function which processes the request.
     * 
     * Any thrown {@link Error} should be caught by the handler, and its {@link Error.message} returned by the API.
     * 
     * @param config - The current configuration of the request handler.
     * @param auth - The authenticated user agent.
     * @param body - The validated contents of the request body. Is always undefined in get requests.
     * @throws {ThrowableResponse}
     */
    perform: (params: { method: string, config: Config, auth: Auth, query: Query, body: Body | undefined }) => Promise<Response>
}


/**
 * {@link FestaExecutor} factory which does nothing and returns 204.
 */
export function festaNoOp(): FestaExecutor<any, any, any, any, {}> {
    return {
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        perform: async ({ }) => {
            return {}
        }
    }
}


/**
 * {@link FestaExecutor} factory which returns the `config` object received as parameter.
 */
export function festaDebugConfig<Config>(): FestaExecutor<Config, any, any, any, Config> {
    return {
        methods: ["GET"],
        perform: async ({ config }) => {
            return config
        }
    }
}


/**
 * {@link FestaExecutor} factory which returns the `auth` object received as parameter.
 */
export function festaDebugAuth<Auth>(): FestaExecutor<any, Auth, any, any, Auth> {
    return {
        methods: ["GET"],
        perform: async ({ auth }) => {
            return auth
        }
    }
}


/**
 * {@link FestaExecutor} factory which echoes back the `query` object received as parameter.
 */
export function festaDebugQuery<Query>(): FestaExecutor<any, any, Query, any, Query> {
    return {
        methods: ["GET"],
        perform: async ({ query }) => {
            return query
        }
    }
}


/**
 * {@link FestaExecutor} factory which echoes back the `body` object received as parameter.
 */
export function festaDebugBody<Body>(): FestaExecutor<any, any, any, Body, Body | null> {
    return {
        methods: ["GET"],
        perform: async ({ body }) => {
            return body ?? null
        }
    }
}


export type FestaRESTParams<Config, Auth, Query, Body> = { config: Config, auth: Auth, query: Query, body: Body | undefined }


/**
 * Parameters of {@link festaRESTGeneric}.
 */
export type FestaRESTGeneric<Config, Auth, Query, Body, Item, Delegate extends PrismaDelegate, FindManyArgs, CreateArgs> = {
    /**
     * The model to act on.
     */
    delegate: Delegate,

    /**
     * Function returning the options that should be used to `findMany` items on the delegate.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    getListArgs: (params: FestaRESTParams<Config, Auth, Query, Body>) => Promise<FindManyArgs>,

    /**
     * Function called after retrieving the items to list, which can be used to alter what is returned by the API route.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    afterList?: (params: FestaRESTParams<Config, Auth, Query, Body>, items: Item[]) => Promise<any>

    /**
     * Function returning the options that should be used to `create` an item on the delegate.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    getCreateArgs: (params: FestaRESTParams<Config, Auth, Query, Body>) => Promise<CreateArgs>,

    /**
     * Function called after creating a new item, which can be used to alter what is returned by the API route.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    afterCreation?: (params: FestaRESTParams<Config, Auth, Query, Body>, item: Item) => Promise<any>
}


/**
 * {@link FestaExecutor} factory which lists items matched by a query on a {@link PrismaDelegate}.
 * 
 * @param delegate - The delegate to list items from.
 * @param listOptions - Function returning the options that should be used by the delegate
 */
export function festaRESTGeneric<Config, Auth, Query, Body, Item, Delegate extends PrismaDelegate, FindManyArgs, CreateArgs>({ delegate, getListArgs, afterList, getCreateArgs, afterCreation }: FestaRESTGeneric<Config, Auth, Query, Body, Item, Delegate, FindManyArgs, CreateArgs>): FestaExecutor<Config, Auth, Query, Body, any> {
    return {
        methods: ["GET", "POST"],
        perform: async (params) => {
            let response: any

            if (params.method === "POST") {
                const items: Item[] = await delegate.create(await getCreateArgs(params))
                response = afterList ? await afterList(params, items) : items
            }
            else {
                const item: Item = await delegate.findMany(await getListArgs(params))
                response = afterCreation ? await afterCreation(params, item) : item
            }

            return response
        }
    }
}


export type FestaRESTSpecific<Config, Auth, Query, Body, Item, Delegate extends PrismaDelegate, FindUniqueArgs, UpdateArgs> = {
    /**
     * The model to act on.
     */
    delegate: Delegate,

    /**
     * Function returning the options that should be used to `retrieve`, `update` or `destroy` an item on the delegate.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    getFindArgs: (params: FestaRESTParams<Config, Auth, Query, Body>) => Promise<FindUniqueArgs>,

    /**
     * Function called after finding an item, which can be used for example to forbid access to that item.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    afterFind?: (params: FestaRESTParams<Config, Auth, Query, Body>, item: Item) => Promise<void>

    /**
     * Function called after retrieving an item, which can be used to alter what is returned by the API route.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    afterRetrieval?: (params: FestaRESTParams<Config, Auth, Query, Body>, item: Item) => Promise<any>

    /**
     * Function returning the options that should be used to `update` an item on the delegate.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    getUpdateArgs: (params: FestaRESTParams<Config, Auth, Query, Body>) => Promise<UpdateArgs>,

    /**
     * Function called before updating an existing item, which can be used for example to forbid access to that item.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    beforeUpdate?: (params: FestaRESTParams<Config, Auth, Query, Body>, item: Item) => Promise<void>

    /**
     * Function called after updating an existing item, which can be used to alter what is returned by the API route.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    afterUpdate?: (params: FestaRESTParams<Config, Auth, Query, Body>, item: Item) => Promise<any>

    /**
     * Function returning the options that should be used to `destroy` an item on the delegate.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    getDestroyArgs: (params: FestaRESTParams<Config, Auth, Query, Body>) => Promise<FindUniqueArgs>

    /**
     * Function called before destroying an existing item, which can be used for example to forbid access to that item.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    beforeDestruction?: (params: FestaRESTParams<Config, Auth, Query, Body>, item: Item) => Promise<void>

    /**
     * Function called after destroying an existing item, which can be used to alter what is returned by the API route.
     * 
     * @throws {ThrowableResponse} If the request should be short-circuited to a specific response.
     */
    afterDestruction?: (params: FestaRESTParams<Config, Auth, Query, Body>) => Promise<any>
}


/**
 * {@link FestaExecutor} factory which operates on a single item matched by a query on a {@link PrismaDelegate}.
 * 
 * Similar to the old `restInPeace` function.
 */
export function festaRESTSpecific<Config, Auth, Query, Body, Item, Delegate extends PrismaDelegate, FindUniqueArgs, UpdateArgs>({ delegate, getFindArgs, afterFind, afterRetrieval, getUpdateArgs, beforeUpdate, afterUpdate, getDestroyArgs, beforeDestruction, afterDestruction }: FestaRESTSpecific<Config, Auth, Query, Body, Item, Delegate, FindUniqueArgs, UpdateArgs>): FestaExecutor<Config, Auth, Query, Body, any> {
    return {
        methods: ["GET", "PATCH", "DELETE"],
        perform: async (params) => {
            let response: any

            const item = await delegate.findUnique(await getFindArgs(params))
            if (!item) {
                throw Response.error({ status: 404, message: "Item not found" })
            }

            afterFind && await afterFind(params, item)

            if (params.method === "DELETE") {
                beforeDestruction && await beforeDestruction(params, item)
                await delegate.delete(await getDestroyArgs(params))
                response = afterDestruction ? await afterDestruction(params) : null
            }
            else if (params.method === "PATCH") {
                beforeUpdate && await beforeUpdate(params, item)
                response = await delegate.update(await getUpdateArgs(params))
                response = afterUpdate ? await afterUpdate(params, item) : response
            }
            else {
                response = afterRetrieval ? await afterRetrieval(params, item) : item
            }

            return response
        }
    }
}
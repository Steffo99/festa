/**
 * Object containing a function related to server configuration.
 * 
 * @see {@link festaAPI} and its parameters {@link FestaAPI}.
 */
export type FestaConfigurator<Config> = {
    /**
     * Async function which returns the relevant configuration variables in form of an object.
     * 
     * Any thrown {@link Error} should be caught by the handler, and depending on the current `NODE_ENV`:
     * - in `development` the {@link Error.message} should be returned by the API;
     * - in `production` a generic error should be sent instead, to prevent attackers from gaining excess information about the server state.
     * 
     * @throws {ThrowableResponse}
     */
    perform: () => Promise<Config>
}


/**
 * {@link FestaConfigurator} which returns an empty object.
 * 
 * Never throws.
 */
export const festaNoConfig: FestaConfigurator<{}> = {
    perform: async () => {
        return {}
    }
}

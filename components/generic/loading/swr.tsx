import { SWRResponse } from "swr";


export type SWRMultiplexerConfig<D, E = Error> = {
    hook: SWRResponse<D, E>,
    loading: () => JSX.Element,
    ready: (data: D) => JSX.Element,
    error: (error: E) => JSX.Element,
}

export function swrMultiplexer<D, E = Error>(config: SWRMultiplexerConfig<D, E>): JSX.Element {
    if (config.hook.error) {
        return config.error(config.hook.error)
    }
    if (config.hook.data) {
        return config.ready(config.hook.data)
    }
    return config.loading()
}

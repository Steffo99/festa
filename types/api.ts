export type ApiError = {
    error: string
}

export type ApiResult<T> = ApiError | T

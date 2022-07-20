import React from "react"
import { PostcardContext, PostcardSource } from "./base"
import { usePostcardStorage } from "./storage"


export type PostcardContextProviderProps = {
    defaultPostcard: PostcardSource,
    children: React.ReactNode,
}


export const PostcardContextProvider = ({ defaultPostcard, children }: PostcardContextProviderProps) => {
    return (
        <PostcardContext.Provider value={usePostcardStorage(defaultPostcard)}>
            {children}
        </PostcardContext.Provider>
    )
}

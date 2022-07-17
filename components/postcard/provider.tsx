import React from "react"
import { PostcardContext, PostcardSource } from "./base"
import { useStatePostcard } from "./storage"


export type PostcardContextProviderProps = {
    defaultPostcard: PostcardSource,
    children: React.ReactNode,
}


export const PostcardContextProvider = ({ defaultPostcard, children }: PostcardContextProviderProps) => {
    return (
        <PostcardContext.Provider value={useStatePostcard(defaultPostcard)}>
            {children}
        </PostcardContext.Provider>
    )
}

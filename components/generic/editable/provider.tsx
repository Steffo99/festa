import { ReactNode, useState } from "react"
import { EditingContext, EditingMode } from "./base"


/**
 * Component which stores the current editing mode (by default {@link EditingMode.VIEW}) using {@link useState} and provides it to its children through an {@link EditingContext}.
 */
export const EditingContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <EditingContext.Provider value={useState<EditingMode>(EditingMode.VIEW)}>
            {children}
        </EditingContext.Provider>
    )
}

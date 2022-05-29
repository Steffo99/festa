import { useEffect } from "react"
import { FestaLoginData } from "../types/user"

export function useStoredLogin(setLogin: React.Dispatch<React.SetStateAction<FestaLoginData | null>>): void {
    const thatStorageOverThere = typeof localStorage !== "undefined" ? localStorage : undefined

    useEffect(
        () => {
            if(thatStorageOverThere === undefined) return

            const raw = localStorage.getItem("login")
            if(raw === null) {
                console.debug("No stored login data found.")
                return
            }

            try {
                var parsed = JSON.parse(raw)
            }
            catch(e) {
                console.error("Failed to parse stored login data as JSON.")
                return
            }

            const data = {
                ...parsed,
                expiresAt: new Date(parsed.expiresAt)
            }
            
            if(new Date().getTime() >= data.expiresAt.getTime()) {
                console.debug("Stored login data has expired, clearing...")
                thatStorageOverThere.removeItem("login")
                return
            }

            setLogin(data)
        },
        [thatStorageOverThere]
    )
}
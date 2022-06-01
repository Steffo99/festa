import {default as axios} from "axios";
import { useContext, useMemo } from "react";
import { LoginContext } from "../contexts/login";
import { FestaLoginData } from "../types/user";
import { useDefinedContext } from "../utils/definedContext";

export function useAxios(data?: FestaLoginData | null) {
    const loginContext = useContext(LoginContext)

    const headers: {[key: string]: string} = {}
    
    let login = data || loginContext?.[0]
    if(login) {
        headers["Authorization"] = `Bearer ${login.token}`
    }

    return useMemo(() => axios.create({headers}), [login])
}

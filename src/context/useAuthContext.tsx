import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export const useAuthContext = ()=>{

    const context = useContext(AuthContext)

    if(!context){
        return Error("useAuthcontext must be placed inside the AuthContextProvider");
    }

    return context;
}
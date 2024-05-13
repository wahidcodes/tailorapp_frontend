import { useReducer, createContext } from "react";

interface AuthType{
    state:{},
    dispatch:{string:{state:string}},
}

export const AuthContext = createContext({} as AuthType|any);

export const authReducer = (state:any, action:any)=>{
    switch(action.type){
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}:any)=>{
    const [state, dispatch] = useReducer(authReducer, {user:null})
    console.log('AuthContext State: ',state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}
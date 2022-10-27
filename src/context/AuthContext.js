import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    // login/logout case
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null } // remove user object
        default:
            return state // original state
    }
}

// wrapper
export const AuthContextProvider = ({ children }) => {
    // register state
    const [state, dispatch] = useReducer(authReducer, {
        user: null // user not logged in by default
    })

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
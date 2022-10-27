import { useAuthContext } from "./useAuthContext"



export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'}) // no payload - just reset the user = null in useAuthContext.js
    }

    return { logout }
}
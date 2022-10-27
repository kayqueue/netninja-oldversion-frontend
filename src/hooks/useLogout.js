import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'}) // no payload - just reset the user = null in useAuthContext.js
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null }) // clear global state - prevent the previous state from flashing
    }

    return { logout }
}
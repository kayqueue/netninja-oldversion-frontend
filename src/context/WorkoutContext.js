import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

// state == previous state value, action == object passed into dispatch
export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] // single new workout object, previous state workouts
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({children}) => { // children property e.g. <App />
    // update state value and specify initial value
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    
    
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}
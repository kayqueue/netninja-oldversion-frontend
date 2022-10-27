// imports
import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

// for home page
const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()

    // fires a function once when component is rendered
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}` // note the back ticks ``
                },
            })
            const json = await response.json(); // array of workout objects

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        // fetch if there is a user
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user]) // [] fires once when it is rendered

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
// imports
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    
    const handleClick = async () => {

        // check for user
        if (!user) {
            return
        }

        const response = await fetch('https://netninja-oldversion.herokuapp.com/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}` // note the back ticks ``
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails
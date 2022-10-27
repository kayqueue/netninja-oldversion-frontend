import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    // create state for each property of new workout
    const [title, setTitle] = useState('') // initial value is an empty string
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        // prevent refresh when clicked
        e.preventDefault()

        // dummy workout object to be sent as the body of the request
        const workout = {title, load, reps}

        // use fetch api to send a post request
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout), // convert workout to a JSON string
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() // from workoutController - createWorkout()

        // if response if NOT ok
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            // reset the form
            setTitle('')
            setLoad('')
            setReps('')
            setError(null) // incase there was an error previously
            setEmptyFields([]) // incase there was an error previously
            console.log("new workout added", json)
            dispatch({type: 'CREATE_WORKOUT', payload: json}) // payload is the single workout newly added
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => {setTitle(e.target.value)}}
                value={title} // reflect changes e.g. refresh the page --> back to empty string
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => {setLoad(e.target.value)}}
                value={load} // reflect changes e.g. refresh the page --> back to empty string
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => {setReps(e.target.value)}}
                value={reps} // reflect changes e.g. refresh the page --> back to empty string
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
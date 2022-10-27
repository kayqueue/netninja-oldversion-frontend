import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        // prevent refresh upon submit
        e.preventDefault()

        console.log(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => {setEmail(e.target.value)}}
                value={email} // reflect change in email state
            />
            <label>Password:</label>
            <input
                type="password" // hidden
                onChange={(e) => {setPassword(e.target.value)}}
                value={password} // reflect change in email state
            />

            <button>Login</button>
        </form>
    )
}

export default Login
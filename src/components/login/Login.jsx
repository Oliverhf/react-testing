import { useState } from "react"
import axios from "axios"

const Login = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1")
            setUser(data)
        } catch {
            setError(true)
        }
    }

    return (
        <div className="container">
            <span className="user">{user.name}</span>
            <form>
                <input type="text" placeholder="username" value={username} onChange={({target}) => setUsername(target.value)} />
                <input type="password" placeholder="password" value={password} onChange={({target}) => setPassword(target.value)}  />
                <button 
                disabled={!username || !password}
                onClick={handleClick}
                >{loading ? "please wait" : "Login"}</button>
                <span data-testid="error" style={{visibility: error ? "visible" : "hidden"}}>Something Went Wrong!</span>
            </form>
        </div>
    )
}

export default Login
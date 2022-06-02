import "./LogIn.css"
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"

const LogIn = () => {

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const [logInErr, setLogInErr] = useState(false)

    const GetHandler = (e) => {
        e.preventDefault()
        axios.get("http://localhost:1337/login/", {params:{
            userName,
            password
        }})
            .then(res => {
                const user = res.data.userName
                history.push(`/${user}`)
            })
            .catch(() => {
                setLogInErr(true)
                // console.log(err)
            })
    }

    return (
        <div id="main-container">
            <form onSubmit={GetHandler}>
                {
                    logInErr && <p>User does not exist</p>
                }
                <label>Username</label>
                <input value={userName} onChange={e => setUsername(e.target.value)} />
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} />

                <button>Log In</button>
                {

                }
            </form>
        </div>
    )
}
export default LogIn
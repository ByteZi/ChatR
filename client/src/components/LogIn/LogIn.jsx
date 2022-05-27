import "./LogIn.css"
import {useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"

const LogIn = () => {

    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const history = useHistory();

    const [logInErr, setLogInErr] = useState(false)

    const GetHandler = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:1337/user/${userName}`)
            .then(() => {
                history.push(`/${userName}`)
                // window.sessionStorage.setItem('userName',userName)
            })
            .catch(() => setLogInErr(true))
    }

    return (
        <div id="main-container">
            <form onSubmit={GetHandler}>
                {
                    logInErr && <p>User does not exist</p>
                }
                <label>User name</label>
                <input value={userName} onChange={e => setUserName(e.target.value)}/>
                <label>Password</label>
                <input value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
                <button>Log In</button>
            </form>
        </div>
    )
}
export default LogIn
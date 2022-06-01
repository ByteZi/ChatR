import "./LogIn.css"
import {useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"

const LogIn = () => {

    const [email, setEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    
    const history = useHistory();

    const [logInErr, setLogInErr] = useState(false)

    const GetHandler = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:1337/user/${email}`)
            .then(user => {
                history.pushState(`/Success`)
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
                <input value={email} onChange={e => setEmail(e.target.value)}/>
                <label>Password</label>
                <input value={userPassword} onChange={e => setUserPassword(e.target.value)}/>
               
                <button>Log In</button>
                {
                    
                }
            </form>
        </div>
    )
}
export default LogIn
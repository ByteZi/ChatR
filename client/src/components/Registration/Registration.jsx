import { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Registration = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [regErr, setRegErr] = useState(false)
    const history = useHistory();

    const PostUserHandler = (e) => {
        e.preventDefault()

        const user = {email ,userName ,password}
        axios.post("http://localhost:1337/user", user)
            .then(() => {
                window.sessionStorage.setItem(userName)
                history.push(`/${userName}`)
            })
            .catch(err => {
                const errArr = []
                for(const key of Object.keys(err.response.data.message)){
                    errArr.push(err.response.data.message[key].message)
                }
                setRegErr(errArr)
            })
    }

    return (
        <div>
            <form onSubmit={PostUserHandler} style={{ display: "flex", width: "200px", flexDirection: "column" }}>
                <label>email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <label>User Name</label>
                <input value={userName} onChange={e => setUserName(e.target.value)} />
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} />
                <button>Submit</button>
                {JSON.stringify(regErr)}
            </form>
        </div>
    )
}

export default Registration
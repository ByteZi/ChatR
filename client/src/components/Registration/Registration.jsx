import { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import './Registration.css'

const Registration = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [regErr, setRegErr] = useState(false)
    const history = useHistory();

    const PostUserHandler = (e) => {
        e.preventDefault()
        const user = { email, userName, password, confirmPassword }

        axios.post("http://localhost:1337/user/", user)
            .then(() => {
                history.push(`/${userName}`)
            })
            .catch(err => {
                const errArr = []
                const error = err.response.data

                console.log(error)

                if (error.errors) {
                    for (const key of Object.keys(error.errors)) {
                        errArr.push(error.errors[key].message)
                    }
                }
                for (const key of Object.keys(error.keyValue)) {
                    if (error.keyValue) {
                        errArr.push(`${key.toLowerCase()} has already been taken`)
                    }
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
                <label>Confirm Password</label>
                <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button>Submit</button>
                {
                    regErr &&
                    regErr.map((v, i) => { return <p key={i} className="dangerErr">{v}</p> })
                }

            </form>
        </div>
    )
}

export default Registration
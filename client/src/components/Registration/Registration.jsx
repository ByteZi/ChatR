import { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import './Registration.css'

const Registration = () => {
    const [userName, setUserName] = useState('Tester3')
    const [email, setEmail] = useState('Tester3@gmail.com')
    const [password, setPassword] = useState('Tester3')
    const [confirmPassword, setConfirmPassword] = useState('Tester3')

    const [regErr, setRegErr] = useState(false)
    const history = useHistory();

    const PostUserHandler = (e) => {
        e.preventDefault()

        const user = { email, userName, password, confirmPassword }

        axios.post("http://localhost:1337/user/", user)
            .then(() => {
                // window.sessionStorage.setItem(userName)
                history.push(`/success`)
            })
            .catch(err => {
                const errArr = []
                const errors = err.response.data

                if (errors.errors) {
                    for (const key of Object.keys(errors)) {
                        errArr.push(errors[key].message)
                    }
                }else if(errors.keyValue){
                    for (const key of Object.keys(errors.keyValue)){
                        errArr.push(key.toLowerCase() + ' already exists')
                    }
                }
                setRegErr(errArr);
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
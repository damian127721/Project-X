import React, { useState } from "react"
import TextInput from "../components/TextInput"
import { Link } from "react-router-dom"
import CustomError from "../components/Error"
import { useNavigate } from "react-router-dom"

export default function Registration() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [checkedInputs, setCheckedInputs] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        if (loading) {
            return
        }
        
        if (!email || !username || !password) {
            setCheckedInputs(true)
            return
        }
        
        try {
            setLoading(true)

            const options = {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    username,
                    password,
                    email
                })
            }
            const res = await fetch("http://localhost:5000/api/user/register", options)
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message)
            }
            
            localStorage.setItem("user", JSON.stringify(data))
            navigate("/home", {replace: true})
        } catch(err) {
            console.log(err)
            if (!error) {
                setError(err.message)
                setTimeout(() => {
                setError("")
            }, 3000)
            }
        }
        
        setLoading(false)
    }

    return (
    <div className="app-info-center registration">
        {error && <CustomError message={error}/>}
        <h2>Registration</h2>
        <main className="blue-box">
            <form className="equal-flex">
                <TextInput error={checkedInputs && email===""} type="email" placeholder="Email" setterFunction={setEmail}/>
                <TextInput error={checkedInputs && username===""} type="text" placeholder="Username" setterFunction={setUsername}/>
                <TextInput error={checkedInputs && password===""} type="password" placeholder="Password" setterFunction={setPassword}/>
                <div className="right-middle-flex"><p>Registered ? <span><Link className="bold" to="/">Log in there</Link></span></p><button className="non-visual-button" onClick={(e) => submitHandler(e)}><h4>Register</h4></button></div>
            </form>
        </main>
    </div>
    )
}
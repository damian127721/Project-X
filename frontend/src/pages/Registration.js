import React, { useState } from "react"
import TextInput from "../components/TextInput"
import { Link } from "react-router-dom"

export default function Registration() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
    <div className="app-info-center registration">
        <h2>Registration</h2>
        <main className="blue-box">
            <div className="equal-flex">
                <TextInput type="email" placeholder="Email" setterFunction={setEmail}/>
                <TextInput type="text" placeholder="Username" setterFunction={setUsername}/>
                <TextInput type="password" placeholder="Password" setterFunction={setPassword}/>
                <div className="right-middle-flex"><p>Registered ? <span><Link className="bold" to="/">Log in there</Link></span></p><h4>Register</h4></div>
            </div>
        </main>
    </div>
    )
}
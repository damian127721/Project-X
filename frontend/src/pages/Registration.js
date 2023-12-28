import React, { useState } from "react"
import TextInput from "../components/TextInput"
import { Link } from "react-router-dom"
import {useToast} from "@chakra-ui/react"

export default function Registration() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [checkedInputs, setCheckedInputs] = useState(false)

    const toast = useToast()

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
        } catch(err) {
            toast({
                title: "Error occured",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        
        setLoading(false)
    }

    return (
    <div className="app-info-center registration">
        <h2>Registration</h2>
        <main className="blue-box">
            <form className="equal-flex">
                <TextInput state={checkedInputs && email === "" ? "error" : ""} type="email" placeholder="Email" setterFunction={setEmail}/>
                <TextInput state={checkedInputs && username === "" ? "error" : ""} type="text" placeholder="Username" setterFunction={setUsername}/>
                <TextInput state={checkedInputs && password === "" ? "error" : ""} type="password" placeholder="Password" setterFunction={setPassword}/>
                <div className="right-middle-flex"><p>Registered ? <span><Link className="bold" to="/">Log in there</Link></span></p><button className="non-visual-button" onClick={(e) => submitHandler(e)}><h4>Register</h4></button></div>
            </form>
        </main>
    </div>
    )
}
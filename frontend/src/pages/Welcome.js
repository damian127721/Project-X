import React from "react"
import NavList from "../components/NavList"
import TextInput from "../components/TextInput"

export default function Welcome() {
    return (
        <>
            <header>
                <NavList list={[{
                    path: "/home",
                    name: "Information",
                    side: "right"
                }]}></NavList>
                <div className="welcome-front">
                    <div className="login">
                        <h1>Appandos</h1>
                        <div className="equal-flex">
                            <TextInput type="email" placeholder="Email"/>
                            <TextInput type="text" placeholder="Password"/>
                            <div className="right-middle-flex"><p>Don’t have account? Register there </p><h4>Login</h4></div>
                        </div>
                    </div>
                    <div className="representative-frame">
                        <img></img>
                    </div>
                    {/* {<img></img>} */}
                </div>
            </header>
        </>
    )
}
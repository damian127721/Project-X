import React from "react"
import {useLottie} from "lottie-react"
import NavList from "../components/NavList"
import TextInput from "../components/TextInput"
import robotAnimation from "../assets/robot-animation.json"
import spaceshipStream from "../assets/spaceship-stream.svg"
import spaceshipCabine from "../assets/spaceship-cabine.svg"

export default function Welcome() {
    const robotOptions = {
        animationData: robotAnimation,
        loop: true,
        style: {
            height: 250,
            width: 208,
            position: "absolute",
            bottom: 100
        }
    }
    const {View : Robot} = useLottie(robotOptions)

    return (
        <>
            <header>
                <NavList list={[{
                    path: "/home",
                    name: "Informations",
                    side: "right"
                }]}></NavList>
                <div className="welcome-front">
                    <div className="spaceship">
                        <img className="spaceship-cabine" src={spaceshipCabine} alt="spaceship" />
                        {/* <div className="space"></div> */}
                        <img className="spaceship-stream" src={spaceshipStream} alt="spaceship" />
                    </div>
                    <div className="login">
                        <h1>Appandos</h1>
                        <div className="equal-flex">
                            <TextInput type="email" placeholder="Email"/>
                            <TextInput type="text" placeholder="Password"/>
                            <div className="right-middle-flex"><p>Don’t have account? <span className="bold">Register there</span> </p><h4>Login</h4></div>
                        </div>
                    </div>
                    <div className="representative-frame">
                        {Robot}
                    </div>
                </div>
            </header>
        </>
    )
}
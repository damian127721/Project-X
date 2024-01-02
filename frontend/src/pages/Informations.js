import HomeLink from "../components/navElements/HomeLink"
import React, { useContext } from "react"
import NavList from "../components/NavList"
import { UserContext } from "./UserStatusProvider"


export default function Informations() {
    const userStatus = useContext(UserContext)

    return (<>
            <div className="body-layout">
                <NavList list={[{
                        path: userStatus.user === "" ? "/" : "/home",
                        name: <HomeLink />,
                        side: "left"
                }]}>

                </NavList>
                <div className="app-info-center">
                    <h2>Informations</h2>
                    <main className="blue-box">
                        <h5>Project informations</h5>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>
                        <h5>Contact</h5>
                        <address><h6>somecontact@seznam.cz</h6></address>
                    </main>
                </div>
            </div>
        </>
    )
}
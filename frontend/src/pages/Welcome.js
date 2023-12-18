import React from "react"
import NavList from "../components/NavList"

export default function Welcome() {
    return (
        <>
            <header>
                <NavList list={[{
                    path: "/home",
                    name: "Home",
                    side: "right"
                },{
                    side: "right",
                    path: "/",
                    name: "test"
                }
                ]}></NavList>
            </header>
        </>
    )
}
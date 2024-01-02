import React, { useContext } from "react"
import NavList from "../components/NavList"
import {MenuButton, PeopleButton, NotifyButton} from "../components/navElements/Buttons"
import ProfileIcon from "../components/ProfileIcon"
import { UserContext } from "./UserStatusProvider"

export default function Home() {
    const userStatus = useContext(UserContext)
    console.log(userStatus)

    return (<>
        <div className="body-layout">
            <NavList list={[{
                path: "/informations",
                name: <MenuButton />,
                side: "left",
                button: true
            }, {
                path: "/informations",
                name: <PeopleButton />,
                side: "left",
                button: true
            }, {
                path: "/informations",
                name: <NotifyButton />,
                side: "left",
                button: true
            }, {
                path: "/informations",
                name: <ProfileIcon profilePic={userStatus.user.pic ? userStatus.user.pic : "" + {/* Tady musím stahnout default fotku */}} />,
                side: "right",
                button: true
            }]}/>
        </div>
    </>)
}
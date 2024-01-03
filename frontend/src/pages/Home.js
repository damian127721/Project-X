import React, { useContext, useState } from "react"
import NavList from "../components/NavList"
import {MenuButton, PeopleButton, NotifyButton} from "../components/navElements/Buttons"
import ProfileIcon from "../components/ProfileIcon"
import { UserContext } from "./UserStatusProvider"
import defaultProfileIcon from "../assets/icons/user.png"
import HomeNav from "../components/HomeNav"

export default function Home() {
    const userStatus = useContext(UserContext)

    const [windowsOpened, setWindowsOpened] = useState({
        menu: false,
        people: false,
        notify: false,
        profile: false,
    })

    const windowsHandleFunction = (window) => {
        setWindowsOpened(prevWindowsOpened => ({
            ...prevWindowsOpened,
            [window]: !prevWindowsOpened[window]
        }))
        
    }
    console.log(windowsOpened)
    return (<>
        <div className="body-layout">
            <NavList list={[{
                path: "menu",
                name: <MenuButton handleFunction={() => windowsHandleFunction("menu")} opened={windowsOpened.menu}/>,
                side: "left",
                button: true
            }, {
                path: "notify",
                name: <NotifyButton handleFunction={() => windowsHandleFunction("notify")} opened={windowsOpened.notify}/>,
                side: "left",
                button: true
            }, {
                path: "people",
                name: <PeopleButton handleFunction={() => windowsHandleFunction("people")} opened={windowsOpened.people}/>,
                side: "left",
                button: true
            }, {
                path: "profile",
                name: <ProfileIcon handleFunction={() => windowsHandleFunction("profile")} profilePic={userStatus.user.pic ? userStatus.user.pic : defaultProfileIcon} />,
                side: "right",
                button: true
            }]}/>
            <HomeNav 
                menuOpened={windowsOpened.menu}
                notifyOpened={windowsOpened.notify}
                peopleOpened={windowsOpened.people}
                activity={{
                    users: [{name: "damian"}, {name: "kokot"}, {name: "piča"}], 
                    groups: [{name: "hospoda"}, {name: "piča D"}]
                }}
            people = {{
                users: [{name: "damian"}, {name: "kokot"}, {name: "piča"}], 
                groups: [{name: "hospoda"}, {name: "piča D"}]
            }}
            />
        </div>
    </>)
}
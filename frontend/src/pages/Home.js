import React, { useContext, useEffect, useState } from "react"
import NavList from "../components/NavList"
import {MenuButton, PeopleButton, NotifyButton} from "../components/navElements/Buttons"
import ProfileIcon from "../components/ProfileIcon"
import { UserContext } from "./UserStatusProvider"
import defaultProfileIcon from "../assets/icons/user.png"
import HomeNav from "../components/HomeNav"
import ProfileNav from "../components/ProfileNav"
import {ReactComponent as SearchIcon} from "../assets/icons/search.svg"

export default function Home() {
    const [searchValue, setSearchValue] = useState("")
    const userStatus = useContext(UserContext)

    const [windowsOpened, setWindowsOpened] = useState({
        menu: false,
        people: false,
        notify: false,
        profile: false,
    })

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("test")
    }

    const windowsHandleFunction = (window) => {
        setWindowsOpened(prevWindowsOpened => ({
            ...prevWindowsOpened,
            [window]: !prevWindowsOpened[window]
        }))
    }

    const profileMenuHandleFunction = (e) => {
        if (e.target.tagName == "BODY" && windowsOpened.profile) {
            setWindowsOpened(prevWindowsOpened => ({
                ...prevWindowsOpened,
                profile: false
            }))
            console.log("prvni")
        } else if (e.target.classList[0] === "profile-pic") {
            setWindowsOpened(prevWindowsOpened => ({
                ...prevWindowsOpened,
                profile: !prevWindowsOpened.profile
            }))
        }
    }

    useEffect(() => {
        document.body.addEventListener("click", profileMenuHandleFunction)
        return () => {
            document.body.removeEventListener("click", profileMenuHandleFunction)
        }
    }, [windowsOpened])

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
                name: <ProfileIcon profilePic={userStatus.user.pic ? userStatus.user.pic : defaultProfileIcon} />,
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
            <ProfileNav 
                profileOpened={windowsOpened.profile}
            />
            <form onSubmit={submitHandler} className="search-box"><input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Search for people..." className="search-bar" /><button type="submit" className="search-icon non-visual-button"><SearchIcon/></button>
                <ul className="search-list">
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </form>
        </div>
    </>)
}
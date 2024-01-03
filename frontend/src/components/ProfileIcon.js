import React from "react"

export default function ProfileIcon({profilePic, handleFunction}) {
    return <img src={profilePic} className="profile-pic" onClick={handleFunction}></img>
}
import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Check} from "../assets/icons/check.svg"
import {ReactComponent as Cross} from "../assets/icons/cross.svg"

export default function HomeNav({menuOpened, notifyOpened, peopleOpened, activity, people}) {
    return <nav className="side-flex">
        {menuOpened && <ul className="blue-side-box" style={{textAlign: "center"}}>
            <li><Link to="/informations">Informations</Link></li>
            <li><Link to="/home">Home</Link></li>
        </ul>}
        {notifyOpened && <ul className="blue-side-box">
            {activity?.groups.map(group => <li>Some activity in group {group.name}</li>)}
            {activity?.users.map(user => <li>New message from {user.name}</li>)}
        </ul>}
        {peopleOpened && <ul className="blue-side-box">
            <div className="people">
                <li className="description">[users]</li>
                {people?.users.map(user => <li>{user.name}</li>)}    
            </div>
            <div className="people">
                <li className="description">[groups]</li>
                {people?.groups.map(group => <li>{group.name}<div className="accept"><span className="check"><Check /></span><span className="cross"><Cross /></span></div></li>)}   
            </div>
        </ul>}
    </nav>
}
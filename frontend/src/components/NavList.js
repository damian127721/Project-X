import React from "react";
import { Link } from "react-router-dom";

export default function NavList({list}) {
    return (
        <div className="nav-list">
            <nav>
            <ul>
            {list.map(item => {
                return (item.side === "left") ? <li><Link to={item.path}>{item.name}</Link></li> : <></>
            })}
            </ul>
            </nav>
            <nav>
            <ul>
            {list.map(item => {
                return (item.side === "right") ? <li><Link to={item.path}>{item.name}</Link></li> : <></>
            })}
            </ul>
            </nav>
        </div>
    )
}
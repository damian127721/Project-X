import React from "react";
import { Link } from "react-router-dom";

export default function NavList({list}) {
    return (
        <div className="nav-list">
            <nav>
            <ul>
            {list.map(item => {
                if (item.side === "left") {
                    if (item.button) {
                        return <li key={item.path}>{item.name}</li>
                    } else {
                        return <li key={item.path}><Link to={item.path}>{item.name}</Link></li>
                    }
                }
            })}
            </ul>
            </nav>
            <nav>
            <ul>
            {list.map(item => {
                if (item.side === "right") {
                    if (item.button) {
                        return <li key={item.path}>{item.name}</li>
                    } else {
                        return <li key={item.path}><Link to={item.path}>{item.name}</Link></li>
                    }
                }
            })}
            </ul>
            </nav>
        </div>
    )
}
import React from "react";
import {ReactComponent as MenuIcon} from "../../assets/icons/menu.svg"
import {ReactComponent as PeopleIcon} from "../../assets/icons/people.svg"
import {ReactComponent as NotifyIcon} from "../../assets/icons/notify.svg"

function MenuButton({handleFunction, opened}) {
    return (<button onClick={handleFunction} className={`icon-button${opened? " opened" : ""}`}><MenuIcon className="icon"/></button>)
}

function PeopleButton({handleFunction, opened}) {
    return (<button onClick={handleFunction} className={`icon-button${opened? " opened" : ""}`}><PeopleIcon className="icon"/></button>)
}

function NotifyButton({handleFunction, opened}) {
    return (<button onClick={handleFunction} className={`icon-button${opened? " opened" : ""}`}><NotifyIcon className="icon"/></button>)
}

export {MenuButton, PeopleButton, NotifyButton}
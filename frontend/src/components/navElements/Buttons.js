import React from "react";
import {ReactComponent as MenuIcon} from "../../assets/icons/menu.svg"
import {ReactComponent as PeopleIcon} from "../../assets/icons/people.svg"
import {ReactComponent as NotifyIcon} from "../../assets/icons/notify.svg"

function MenuButton({handleFunction}) {
    return (<button onClick={handleFunction} className="icon-button"><MenuIcon className="icon"/></button>)
}

function PeopleButton({handleFunction}) {
    return (<button onClick={handleFunction} className="icon-button"><PeopleIcon className="icon"/></button>)
}

function NotifyButton({handleFunction}) {
    return (<button onClick={handleFunction} className="icon-button"><NotifyIcon className="icon"/></button>)
}

export {MenuButton, PeopleButton, NotifyButton}
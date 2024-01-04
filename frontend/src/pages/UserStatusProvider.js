import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export default function UserStatusProvider({children}) {
    const [user, setUser] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setUser(user)
        }
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            navigate("/home")
        } else {
            navigate("/")
        }
    }, [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext}
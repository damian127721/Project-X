import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

export default function UserStatusProvider({children}) {
    const [user, setUser] = useState("")

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setUser(user)
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext}
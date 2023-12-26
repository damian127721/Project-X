import React from "react"

export default function TextInput({placeholder, type, state, setterFunction}) {
    return (
        <input className={`text-input ${state}`} placeholder={placeholder} type={type} onChange={(e) => setterFunction(e.target.value)}/>
    )
}
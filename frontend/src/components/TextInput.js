import React from "react"

export default function TextInput({placeholder, type, state, setterFunction, error}) {
    return (
        <input className={`text-input ${state} ${error && "error"}`} placeholder={placeholder} type={type} onChange={(e) => setterFunction(e.target.value)}/>
    )
}
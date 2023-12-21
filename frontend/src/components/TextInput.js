import React from "react"

export default function TextInput({placeholder, type, state}) {
    return (
        <input className={`text-input ${state}`} placeholder={placeholder} type={type} />
    )
}
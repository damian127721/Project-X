import React from "react"

export default function TextInput({placeholder, type}) {
    return (
        <input className="text-input" placeholder={placeholder} type={type} />
    )
}
import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { twMerge } from "tailwind-merge"

type InputTextProps = {
  inputProps: UseFormRegisterReturn
  label: string
  className?: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
}
export default function InputText({
  label = "",
  className = "",
  required = false,
  type = "text",
  placeholder = label,
  error,
  inputProps,
}: InputTextProps) {
  const inputTextClass = twMerge(
    `${
      error
        ? "border-red-600 hover:border-red-600 active:border-red-600"
        : "hover:border-blue-400 active:border-blue-400"
    }shadow outline-none appearance-none border rounded min-w-full py-2 px-3 text-grey-darker mb-3 ${className} }`
  )
  return (
    <div className={`mb-2 p-2 ${error ? "text-red-600" : "text-black"}`}>
      <label className={`block text-grey-darker text-sm font-bold mb-2`}>
        {label}
      </label>
      <input
        required={required}
        className={inputTextClass}
        placeholder={placeholder}
        type={type}
        {...inputProps}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  )
}

import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type InputCheckProps = {
  inputProps: UseFormRegisterReturn
  label: string
  className?: string
  error?: string
}
export default function InputCheck({
  label = "",
  error,
  inputProps,
}: InputCheckProps) {
  return (
    <div className={`mb-2 p-2 ${error ? "text-red-600" : "text-black"}`}>
      <label className="inline-flex items-center">
        <input type="checkbox" className="form-checkbox" {...inputProps} />
        <span className="ml-2">
          <b>{label}</b>
        </span>
      </label>
    </div>
  )
}

import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { NotificationError } from "../NotificationError/NotificationError"
import { StaticOptionsType } from "../StaticSelect/static.options"
import { fetchCategoriesOptions } from "./selectCategory.api"

type SelectCategoriesProps = {
  inputProps: UseFormRegisterReturn
  label: string
  className?: string
  placeholder?: string
  error?: string
  required?: boolean
}

export default function SelectCategories({
  inputProps,
  error,
  label,
  className,
  placeholder,
  required,
}: SelectCategoriesProps) {
  const [options, setOptions] = React.useState<StaticOptionsType>([])

  React.useEffect(() => {
    fetchCategoriesOptions()
      .then((res) => setOptions(res))
      .catch((err) => NotificationError(err))
  }, [])

  const inputSelectClass = twMerge(
    `${
      error
        ? "border-red-600 hover:border-red-600 active:border-red-600"
        : "hover:border-blue-400 active:border-blue-400"
    }shadow outline-none  border rounded min-w-full py-2 pl-3 text-grey-darker mb-3 ${className} }`
  )
  return (
    <div className={`mb-2 p-2 ${error ? "text-red-600" : "text-black"}`}>
      <label className={`block text-grey-darker text-sm font-bold mb-2`}>
        {label}
      </label>

      <select
        {...inputProps}
        className={inputSelectClass}
        required={required}
        placeholder={placeholder}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  )
}

import React from "react"
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form"
type ControllerSelectProps = {
  error?: string
  name: string
  comp: React.ComponentType<{ field: ControllerRenderProps }>
  label: string
}
export default function ControllerSelect({
  error,
  name,
  comp: ChildComponent,
  label,
}: ControllerSelectProps) {
  const { control } = useFormContext() // retrieve all hook methods

  return (
    <div className={`mb-2 p-2 ${error ? "text-red-600" : "text-black"}`}>
      <label className="block text-grey-darker text-sm font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <ChildComponent field={field} />}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  )
}

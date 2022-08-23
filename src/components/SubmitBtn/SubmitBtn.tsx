import React from "react"
import { twMerge } from "tailwind-merge"

type SubmitBtnProps = {
  className?: string
  isSubmitting?: boolean
  label: string
  labelWhileLoading: string
}
export default function SubmitBtn({
  className = "",
  isSubmitting = false,
  label,
  labelWhileLoading,
}: SubmitBtnProps) {
  const submitBtnClass = twMerge(
    "ml-2 flex min-w-[100px] items-center justify-center rounded-md bg-info p-1 text-white hover:opacity-80",
    className
  )

  return (
    <button type="submit" className={submitBtnClass} disabled={isSubmitting}>
      {isSubmitting && (
        <svg
          className="mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {isSubmitting ? labelWhileLoading : label}
    </button>
  )
}

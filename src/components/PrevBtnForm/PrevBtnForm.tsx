import React from "react"
import { twMerge } from "tailwind-merge"

type PrevBtnProps = {
  className?: string
  label?: string
  onClick: () => void
}
export default function PrevBtnForm({
  className,
  label = "Cancelar",
  onClick,
}: PrevBtnProps) {
  const prevBtnClassName = twMerge(
    "ml-2 flex min-w-[100px] items-center justify-center rounded-md bg-danger p-1 text-white hover:opacity-80",
    className
  )

  return (
    <button type="button" className={prevBtnClassName} onClick={onClick}>
      {label}
    </button>
  )
}

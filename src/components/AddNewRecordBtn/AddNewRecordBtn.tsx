import React from "react"
import { twMerge } from "tailwind-merge"

type AddNewRecordBtnProps = {
  className?: string
  onClick: () => void
  label?: string
}
export default function AddNewRecordBtn({
  className = "",
  onClick,
  label = "+",
}: AddNewRecordBtnProps) {
  const classNameBtn = twMerge(
    `bg-primary text-white  rounded-md hover:bg-info w-[50px]${className} }`
  )
  return (
    <button className={classNameBtn} onClick={onClick}>
      {label}
    </button>
  )
}

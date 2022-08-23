import React from "react"
export default function SidebarBrand() {
  return (
    <div className="text-white flex items-center space-x-2 px-4 cursor-pointer">
      <img
        className="h-8 w-8"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
        alt="Workflow"
      />
      <span className="text-2xl font-extrabold">Perfumes</span>
    </div>
  )
}

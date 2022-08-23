import React from "react"

type SidebarToggleBtnProps = {
  onClick: () => void
}
export default function SidebarToggleBtn({ onClick }: SidebarToggleBtnProps) {
  return (
    <button
      className="mobile-menu-button p-4 focus:outline-none focus:bg-grey"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  )
}

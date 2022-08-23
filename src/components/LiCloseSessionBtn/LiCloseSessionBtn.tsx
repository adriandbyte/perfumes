import React from "react"
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

export default function LiCloseSessionBtn() {
  const navigate = useNavigate()

  const handleCloseSession = () => {
    navigate("/login")
    localStorage.clear()
  }
  return (
    <li className="block py-2.5 px-4 hover:bg-info transition duration-200 rounded cursor-pointer">
      <div className="flex" onClick={handleCloseSession}>
        <BiLogOut className="text-3xl cursor-pointer" />
        <span className="hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Cerrar Sesion
        </span>
      </div>
    </li>
  )
}

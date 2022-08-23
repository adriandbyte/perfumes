import React, { useState } from "react"
import LiNavLink from "../LiNavLink/LiNavLink"

export default function DropDownMenuLink() {
  const [hidden, setHidden] = useState(true)
  return (
    <li
      className="block hover:bg-info  transition duration-200 rounded cursor-pointer"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div className="py-2.5 px-4 hover:bg-info transition duration-200 rounded cursor-pointer">
        Articulos
        <div
          className={`${
            hidden ? "hidden" : "visible"
          } bg-info absolute mb-20 ml-20  text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44`}
        >
          <ul
            className="py-1 bg-primary w-[250px] rounded"
            aria-labelledby="dropdownButton"
          >
            <LiNavLink to="/articles">Listado de articulos</LiNavLink>
            <LiNavLink to="/inventory">Administrar inventario</LiNavLink>
          </ul>
        </div>
      </div>
    </li>
  )
}

import React, { PropsWithChildren } from "react"
import NavLink from "../NavLink/NavLink"

type LiNavLinkProps = PropsWithChildren<{ to: string }>
export default function LiNavLink({ to, children }: LiNavLinkProps) {
  return (
    <NavLink to={to}>
      <li className="block py-2.5 px-4 hover:bg-info transition duration-200 rounded cursor-pointer">
        {children}
      </li>
    </NavLink>
  )
}

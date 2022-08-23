import React, { PropsWithChildren } from "react"
import { NavLink as NavLinkRR } from "react-router-dom"
type NavLinkProps = PropsWithChildren<{ to: string }>

export default function NavLink({ to, children }: NavLinkProps) {
  return (
    <NavLinkRR
      to={to}
      className={({ isActive }) => (isActive ? "font-bold" : undefined)}
    >
      {children}
    </NavLinkRR>
  )
}

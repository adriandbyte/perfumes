import * as React from "react"
import { Navigate, useLocation } from "react-router-dom"

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

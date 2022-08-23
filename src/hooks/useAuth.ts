import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      "You need to encapsulate the components within AuthProvider"
    )
  }
  return context
}

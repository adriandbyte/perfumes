import { createContext, PropsWithChildren } from "react"
import { useNavigate } from "react-router-dom"

type LoginResourcesType = {
  categories: string[]
  suppliers: string[]
}
type LoginModuleType = {
  resources: LoginResourcesType[]
}

export type SuccessLoginResponseType = {
  code: number
  status: boolean
  data: {
    code: number
    error: boolean
    message: string
    modules: LoginModuleType
    role: string
    token: string
  }
}

export type LoginCredentials = {
  email: string
  password: string
}
type AuthContextProps = {
  signIn: (credentials: LoginCredentials) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export default function AuthProvider({ children }: PropsWithChildren) {
  const history = useNavigate()

  const signIn = async (credentials: LoginCredentials) => {
    return fetch(`${process.env.REACT_APP_SERVER_PATH}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((response: SuccessLoginResponseType) => {
        if (response.data.error) {
          throw new Error(response.data.message)
        }

        window.localStorage.setItem("token", response.data.token)
        window.localStorage.setItem(
          "modules",
          JSON.stringify(response.data.modules)
        )
        window.localStorage.setItem("role", response.data.role)
        history("/", { replace: true })
      })
      .catch(() => {
        throw new Error("Servidor sin conexion favor de intentar mas tarde")
      })
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  )
}

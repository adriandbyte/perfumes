import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import InputText from "../../components/Inputs/InputText"
import SubmitBtn from "../../components/SubmitBtn/SubmitBtn"
import useAuth from "../../hooks/useAuth"
import { LoginCredentials } from "../../providers/AuthProvider"

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>()

  const { signIn } = useAuth()

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    try {
      await signIn(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something goes wrong"
      setError("email", { message })
      setError("password", { message })
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div />
        <div className="flex self-center justify-center w-[600px]">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col min-w-full">
            <InputText
              required
              label="Correo electrónico"
              error={errors.email?.message}
              type="email"
              inputProps={register("email")}
            />
            <InputText
              required
              label="Contraseña"
              error={errors.password?.message}
              type="password"
              inputProps={register("password")}
            />
            <div className="flex justify-center text-blue-700 mt-2  hover:underline">
              <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="flex items-center justify-center mt-4">
              <SubmitBtn
                label="Ingresar"
                labelWhileLoading="Cargando..."
                className="p-2 bg-primary"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

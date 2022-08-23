import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import InputText from "../../../components/Inputs/InputText"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import PrevBtnForm from "../../../components/PrevBtnForm/PrevBtnForm"
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn"
import BaseLayout from "../../../layout/BaseLayout"
import { createCategory } from "../services/categories.api"
import { NewCategoriesInputs } from "../types/categories.types"

export default function NewCategory() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewCategoriesInputs>()
  const navigate = useNavigate()
  const handleCancel = () => navigate("/categories")

  const onSubmit: SubmitHandler<NewCategoriesInputs> = async (data) => {
    createCategory(data)
      .then((res) => {
        NotificationSuccess(`Categoria: ${res} creada exitosamente.`)
        navigate("/categories")
      })
      .catch((err) => {
        const message =
          err instanceof Error ? err.message : "Something goes wrong"
        setError("name", { message })
        setError("logo_path", { message })
      })
  }
  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Alta de Categoria</span>
      <div className="flex">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex self-center justify-center w-[500px] mt-8">
            <div className="bg-white border border-gray-400 rounded  p-6 mb-2 flex flex-col min-w-full">
              <InputText
                required
                className="mb-0"
                label="Nombre"
                error={errors.name?.message}
                type="text"
                inputProps={register("name")}
              />
              <InputText
                required
                className="mb-0"
                label="Path"
                error={errors.logo_path?.message}
                type="text"
                inputProps={register("logo_path")}
              />

              <div className="flex items-center justify-between mt-4">
                <PrevBtnForm onClick={handleCancel} />
                <SubmitBtn
                  label="Crear"
                  labelWhileLoading="Cargando..."
                  className="p-1 bg-primary"
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  )
}

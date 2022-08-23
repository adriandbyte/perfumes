import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import InputCheck from "../../../components/InputCheck/InputCheck"
import InputText from "../../../components/Inputs/InputText"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import PrevBtnForm from "../../../components/PrevBtnForm/PrevBtnForm"
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn"
import BaseLayout from "../../../layout/BaseLayout"
import { createSupplier } from "../services/suppliers.api"
import { NewSupplierInputsType } from "../types/suppliers.types"

export default function NewSupplier() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewSupplierInputsType>()
  const navigate = useNavigate()
  const handleCancel = () => navigate("/categories")

  const onSubmit: SubmitHandler<NewSupplierInputsType> = async (data) => {
    createSupplier(data)
      .then((res) => {
        NotificationSuccess(`Provedor: ${res} creado exitosamente.`)
        navigate("/suppliers")
      })
      .catch((err) => {
        const message =
          err instanceof Error ? err.message : "Something goes wrong"
        console.log(message)
      })
  }
  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Alta de Provedor</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-1 md:grid-cols-1">
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
                label="RFC"
                error={errors.rfc?.message}
                type="text"
                inputProps={register("rfc")}
              />
              <InputText
                required
                className="mb-0"
                label="Pais"
                error={errors.country?.message}
                type="text"
                inputProps={register("country")}
              />

              <InputCheck
                className="mb-0"
                label="Activo"
                inputProps={register("active")}
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
        </div>
      </form>
    </BaseLayout>
  )
}

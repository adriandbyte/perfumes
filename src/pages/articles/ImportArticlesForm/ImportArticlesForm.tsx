import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import InputText from "../../../components/Inputs/InputText"
import PrevBtnForm from "../../../components/PrevBtnForm/PrevBtnForm"
import SelectCategoryControllerImport from "../../../components/SelectCategory/SelectCategoryControllerImport"
import SelectSupplierControllerImport from "../../../components/SelectSuppliers/SelectSupplierControllerImport"
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn"
import {
  ImportArticlesFormProps,
  ImportArticlesListInputs,
} from "../types/articles.types"

export default function ImportArticleForm({
  onSubmit,
  submitButtonLabel,
}: ImportArticlesFormProps) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ImportArticlesListInputs>({
    defaultValues: {
      categoryId: undefined,
      supplierId: undefined,
    },
  })

  const handleCancel = () => navigate("/articles")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid lg:grid-cols-1 md:grid-cols-1">
        <div className="flex self-center justify-center w-[500px] mt-8">
          <div className="bg-white border border-gray-400 rounded  p-6 mb-2 flex flex-col min-w-full">
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <SelectCategoryControllerImport
                  field={field}
                  error={errors.categoryId?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="supplierId"
              render={({ field }) => (
                <SelectSupplierControllerImport
                  field={field}
                  error={errors.categoryId?.message}
                />
              )}
            />

            <InputText
              required
              className="mb-0"
              label="Archivo"
              error={errors.file?.message}
              type="file"
              inputProps={register("file")}
            />

            <div className="flex items-center justify-between mt-4">
              <PrevBtnForm onClick={handleCancel} />
              <SubmitBtn
                label={submitButtonLabel}
                labelWhileLoading="Cargando..."
                className="p-1 bg-primary"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

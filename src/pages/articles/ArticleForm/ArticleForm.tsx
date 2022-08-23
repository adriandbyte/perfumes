import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import InputText from "../../../components/Inputs/InputText"
import PrevBtnForm from "../../../components/PrevBtnForm/PrevBtnForm"
import SelectCategoryController from "../../../components/SelectCategory/SelectCategoryController"
import SelectSupplierController from "../../../components/SelectSuppliers/SelectSupplierController"
import {
  genderOptions,
  measureOptions,
  typeOptions,
} from "../../../components/StaticSelect/static.options"
import StaticSelect from "../../../components/StaticSelect/StaticSelect"
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn"
import { ArticleFormProps, ArticleType } from "../types/articles.types"

export default function ArticleForm({
  onSubmit,
  defaultValues,
  updateArticle = false,
}: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ArticleType>({
    defaultValues,
  })
  const navigate = useNavigate()
  const handleCancel = () => navigate("/articles")

  return (
    <div>
      <span className="font-bold text-3xl">
        {updateArticle ? "Actualizacion de articulo" : "Alta de articulo"}
      </span>

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
              label="Codigo de barras"
              error={errors.barcode?.message}
              type="text"
              inputProps={register("barcode")}
            />
            {getValues("articlePath") && (
              <div>
                <img
                  src={`${process.env.REACT_APP_SERVER_PATH}/${getValues(
                    "articlePath"
                  )}`}
                />
              </div>
            )}
            <InputText
              className="mb-0"
              label="Imagen"
              error={errors.image?.message}
              type="file"
              inputProps={register("image")}
            />
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <SelectCategoryController
                  field={field}
                  error={errors.categoryId?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="supplierId"
              render={({ field }) => (
                <SelectSupplierController
                  field={field}
                  error={errors.supplierId?.message}
                />
              )}
            />

            <InputText
              required
              className="mb-0"
              label="Descripcion"
              error={errors.description?.message}
              type="text"
              inputProps={register("description")}
            />

            <InputText
              required
              className="mb-0"
              label="Precio"
              error={errors.description?.message}
              type="number"
              inputProps={register("entry_price")}
            />
            <InputText
              required
              className="mb-0"
              label="Marca"
              error={errors.description?.message}
              type="text"
              inputProps={register("brand")}
            />

            <StaticSelect
              required
              className="mb-0"
              label="Medida"
              error={errors.measure?.message}
              inputProps={register("measure")}
              options={measureOptions}
            />
            <StaticSelect
              required
              className="mb-0"
              label="Genero"
              error={errors.gender?.message}
              inputProps={register("gender")}
              options={genderOptions}
            />

            <StaticSelect
              required
              className="mb-0"
              label="Tipo"
              error={errors.type?.message}
              inputProps={register("type")}
              options={typeOptions}
            />

            <div className="flex items-center justify-between mt-4">
              <PrevBtnForm onClick={handleCancel} />
              <SubmitBtn
                label={updateArticle ? "Actualizar" : "Crear"}
                labelWhileLoading="Cargando..."
                className="p-1 bg-primary"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

import _ from "lodash"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import Select from "react-select"
import { ArticleType } from "../../pages/articles/types/articles.types"
import { StaticOptionsType } from "../StaticSelect/static.options"
import { fetchCategoriesOptions } from "./selectCategory.api"
type SelectCategoriesControllerProps = {
  error?: string
  field: ControllerRenderProps<ArticleType, "categoryId">
}
export default function SelectCategoryController({
  error,
  field: { value, onChange },
}: SelectCategoriesControllerProps) {
  const [options, setOptions] = React.useState<StaticOptionsType>([])
  const selectValue = _.isObject(value) ? value["value"] : value

  React.useEffect(() => {
    fetchCategoriesOptions()
      .then((res) => setOptions(res))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={`mb-2 p-2 ${error ? "text-red-600" : "text-black"}`}>
      <label className={`block text-grey-darker text-sm font-bold mb-2`}>
        Categorias
      </label>
      <Select
        value={options.find((c) => c.value === selectValue)}
        name="categoryId"
        placeholder="Selecciona una categoria"
        options={options}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
      />
    </div>
  )
}

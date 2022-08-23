import _ from "lodash"
import React from "react"
import { ControllerRenderProps } from "react-hook-form"
import Select from "react-select"
import { ArticleType } from "../../pages/articles/types/articles.types"
import { StaticOptionsType } from "../StaticSelect/static.options"
import { fetchSuppliersOptions } from "./selectSuppiers.api"

type SelectSupplierControlerProps = {
  error?: string
  field: ControllerRenderProps<ArticleType, "supplierId">
}
export default function SelectSupplierController({
  error,
  field: { value, onChange },
}: SelectSupplierControlerProps) {
  const [options, setOptions] = React.useState<StaticOptionsType>([])
  const selectValue = _.isObject(value) ? value["value"] : value

  React.useEffect(() => {
    fetchSuppliersOptions()
      .then((res) => setOptions(res))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={`mb-2 p-2 ${error ? "text-red-600" : "text-black"}`}>
      <label className={`block text-grey-darker text-sm font-bold mb-2`}>
        Provedores
      </label>
      <Select
        value={options.find((c) => c.value === selectValue)}
        name="supplierId"
        placeholder="Selecciona un provedor"
        options={options}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
      />
    </div>
  )
}

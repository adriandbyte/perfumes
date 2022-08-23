import ReactDataGrid from "@inovua/reactdatagrid-community"
import React from "react"
import { SubmitHandler } from "react-hook-form"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import BaseLayout from "../../../layout/BaseLayout"
import ImportArticleForm from "../ImportArticlesForm/ImportArticlesForm"
import { ImportArticlesListInputs } from "../types/articles.types"
import { comparePricesArticles } from "./comparePricesArticles.api"

export default function CompareArticlesPrices() {
  const [data, setData] = React.useState([])

  const onSubmit: SubmitHandler<ImportArticlesListInputs> = async (data) => {
    const formData = new FormData()
    formData.append("supplier", data.supplierId)
    formData.append("category", data.categoryId)
    formData.append("articles_list", data.file[0])

    try {
      const res = await comparePricesArticles(formData)
      setData(res)
      NotificationSuccess("Comparación de precios realizada correctamente")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something goes wrong"
      NotificationError(message)
    }
  }

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Comparar precios</span>
      <ImportArticleForm onSubmit={onSubmit} submitButtonLabel="Comparar" />
      {data.length > 0 && (
        <div className="mt-6 text-center">
          <span className="font-bold text-2xl">
            Artículos que cambiaron de precio
          </span>
          <div className="mt-4">
            <ReactDataGrid
              idProperty="id"
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
      )}
    </BaseLayout>
  )
}

const columns = [
  {
    name: "name",
    header: "Nombre",
    defaultFlex: 2,
    editable: false,
    resizable: true,
  },

  {
    name: "currentPrice",
    header: "Precio anterior",
    defaultFlex: 1,
    resizable: false,
    editable: false,
  },

  {
    name: "entry_price",
    header: "Nuevo precio",
    defaultFlex: 1,
    resizable: false,
    editable: false,
  },
]

import ReactDataGrid from "@inovua/reactdatagrid-community"
import React from "react"
import { SubmitHandler } from "react-hook-form"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import BaseLayout from "../../../layout/BaseLayout"
import ImportArticleForm from "../ImportArticlesForm/ImportArticlesForm"
import { ImportArticlesListInputs } from "../types/articles.types"
import { findNewArticles } from "./findNewAritcles.api"

export default function FindNewArticles() {
  const [data, setData] = React.useState([])

  const onSubmit: SubmitHandler<ImportArticlesListInputs> = async (data) => {
    const formData = new FormData()
    formData.append("supplier", data.supplierId)
    formData.append("category", data.categoryId)
    formData.append("articles_list", data.file[0])

    try {
      const res = await findNewArticles(formData)
      setData(res)
      NotificationSuccess("Listado de de nuevos articulos")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something goes wrong"
      NotificationError(message)
    }
  }

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Buscar nuevos articlos</span>
      <ImportArticleForm onSubmit={onSubmit} submitButtonLabel="Buscar" />
      {data.length > 0 && (
        <div className="mt-6 text-center">
          <span className="font-bold text-2xl">
            Articulos nuevos del proveedor
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
    header: "Nombre del artículo",
    defaultFlex: 2,
    editable: false,
    resizable: true,
  },
  {
    name: "entry_price",
    header: "Precio unitario",
    defaultFlex: 1,
    resizable: false,
    editable: false,
  },
]

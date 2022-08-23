import React from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import BaseLayout from "../../../layout/BaseLayout"
import ImportArticleForm from "../ImportArticlesForm/ImportArticlesForm"
import { importArticleList } from "../services/articles.api"
import { ImportArticlesListInputs } from "../types/articles.types"
export default function ImportArticlesList() {
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ImportArticlesListInputs> = async (data) => {
    const formData = new FormData()
    formData.append("supplier", data.supplierId)
    formData.append("category", data.categoryId)
    formData.append("articles_list", data.file[0])

    try {
      const res = await importArticleList(formData)
      NotificationSuccess(res)
      navigate("/articles")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something goes wrong"
      NotificationError(message)
    }
  }

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Importar lista</span>
      <ImportArticleForm onSubmit={onSubmit} submitButtonLabel="Importar" />
    </BaseLayout>
  )
}

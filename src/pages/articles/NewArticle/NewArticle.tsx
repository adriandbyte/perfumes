import _ from "lodash"
import React from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"

import BaseLayout from "../../../layout/BaseLayout"
import ArticleForm from "../ArticleForm/ArticleForm"
import { createArticle } from "../services/articles.api"
import { ArticleType } from "../types/articles.types"

export default function NewArticle() {
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ArticleType> = async (data) => {
    const formData = new FormData()
    formData.append("barcode", data.barcode)
    formData.append("brand", data.brand)
    formData.append(
      "categoryId",
      _.isObject(data.categoryId) ? data.categoryId["value"] : data.categoryId
    )
    formData.append(
      "supplierId",
      _.isObject(data.supplierId) ? data.supplierId["value"] : data.supplierId
    )
    formData.append("description", data.description)
    formData.append("entry_price", data.entry_price)
    formData.append("image", data.image[0])
    formData.append("name", data.name)
    formData.append("gender", data.gender)
    formData.append("measure", data.measure)
    formData.append("type", data.type)

    try {
      const res = await createArticle(formData)
      NotificationSuccess(`Articulo ${res} generado correctamente`)
      navigate("/articles")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something goes wrong"
      NotificationError(message)
    }
  }
  return (
    <BaseLayout>
      <div className="flex">
        <ArticleForm onSubmit={onSubmit} />
      </div>
    </BaseLayout>
  )
}

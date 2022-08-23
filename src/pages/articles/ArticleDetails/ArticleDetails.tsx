import _ from "lodash"
import React, { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import BaseLayout from "../../../layout/BaseLayout"
import ArticleForm from "../ArticleForm/ArticleForm"
import { ArticleType } from "../types/articles.types"
import { fetchArticleById, updateArticleDetails } from "./articleDetails.api"

export default function ArticleDetails() {
  const [article, setArticle] = useState<ArticleType | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ArticleType> = async (data) => {
    if (!id) return

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
      await updateArticleDetails(formData, id)
      NotificationSuccess("Articulo actualizado correctamente")
      navigate("/articles")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something goes wrong"
      console.log(message)
    }
  }
  React.useEffect(() => {
    if (id) {
      fetchArticleById(id)
        .then((res) => setArticle(res))
        .catch((err) => console.log(err))
    }
  }, [])

  return (
    <BaseLayout>
      <div className="flex">
        {article && (
          <ArticleForm
            onSubmit={onSubmit}
            defaultValues={article}
            updateArticle={true}
          />
        )}
      </div>
    </BaseLayout>
  )
}

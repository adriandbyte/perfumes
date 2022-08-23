import { defaultHeadersWithToken } from "../../../utils"
import { ArticleType } from "../types/articles.types"

export async function fetchArticleById(id: string): Promise<ArticleType> {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/articles/${id}`, {
    method: "GET",
    headers: defaultHeadersWithToken,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      const article = {
        ...response.data.article,
        supplierId: response.data.article.supplier,
        categoryId: response.data.article.category,
      }

      return article
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

export async function updateArticleDetails(
  formData: FormData,
  articleId: string
) {
  // for (const value of formData.values()) {
  //   console.log(value)
  // }
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/${articleId}`,
    {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.newArticle.name
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

import { defaultHeadersWithToken } from "../../../utils"
import { ArticleType } from "../types/articles.types"

export async function fetchArticles() {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/articles`, {
    method: "GET",
    headers: defaultHeadersWithToken,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.articles.rows
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}
export async function createArticle(formData: FormData) {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/articles`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    body: formData,
  })
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
export async function deleteArticle(id: number) {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/articles/${id}`, {
    method: "DELETE",
    headers: defaultHeadersWithToken,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.message
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}
export async function updateArticle(article: ArticleType) {
  const data = {
    barcode: article.barcode,
    name: article.name,
    description: article.description,
    entry_price: article.entry_price,
    brand: article.brand,
    measure: article.measure,
    type: article.type,
  }
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/partial/${article.id}`,
    {
      method: "PATCH",
      headers: defaultHeadersWithToken,
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.updatedArticle
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

export async function importArticleList(formData: FormData) {
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value)
  // }
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/import/list`,
    {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.message
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

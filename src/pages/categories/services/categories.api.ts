import { defaultHeadersWithToken } from "../../../utils"
import { CategoriesType, NewCategoriesInputs } from "../types/categories.types"

export async function fetchCategories() {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/categories`, {
    method: "GET",
    headers: defaultHeadersWithToken,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.categories.rows
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

export async function createCategory(data: NewCategoriesInputs) {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/categories`, {
    method: "POST",
    headers: defaultHeadersWithToken,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.category.name
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

export async function deleteCategory(id: number) {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/categories/${id}`, {
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

export async function updateCategory(category: {
  id: number
  name: string
  logo_path: string
}): Promise<CategoriesType> {
  const { id, name, logo_path } = category
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/categories/${id}`, {
    method: "PUT",
    headers: defaultHeadersWithToken,
    body: JSON.stringify({ name, logo_path }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.newCategory
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

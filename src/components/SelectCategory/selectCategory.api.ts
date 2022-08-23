import { defaultHeadersWithToken } from "../../utils"

export async function fetchCategoriesOptions() {
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/catalogs/categories/populate`,
    {
      method: "GET",
      headers: defaultHeadersWithToken,
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }

      return response.data.options
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

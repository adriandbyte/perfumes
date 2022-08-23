import { defaultHeadersWithToken } from "../../../utils"
import { SuppliersType } from "../types/suppliers.types"

export async function fetchSuppliers() {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/suppliers`, {
    method: "GET",
    headers: defaultHeadersWithToken,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.suppliers.rows
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}
export async function createSupplier(data: {
  name: string
  rfc: string
  country: string
  active: boolean
}) {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/suppliers`, {
    method: "POST",
    headers: defaultHeadersWithToken,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.supplier.name
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

export async function deleteSupplier(id: number) {
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/suppliers/${id}`, {
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
export async function updateSupplier(category: {
  id: number
  name: string
  rfc: string
  country: string
  active: boolean
}): Promise<SuppliersType> {
  const { name, rfc, country, active, id } = category
  return fetch(`${process.env.REACT_APP_SERVER_PATH}/admin/suppliers/${id}`, {
    method: "PUT",
    headers: defaultHeadersWithToken,
    body: JSON.stringify({ name, rfc, country, active }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.newSupplier
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

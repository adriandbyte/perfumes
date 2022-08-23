import { defaultHeadersWithToken } from "../../../utils"
import { InventoryType } from "../types/Inventory.types"

export async function fetchInvetoryData(): Promise<InventoryType[]> {
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/inventory/existences`,
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
      const parsedData = response.data.existences.rows.map(
        (r: InventoryType) => {
          return {
            ArticleId: r.ArticleId,
            existence: r.existence,
            salePrice: r.salePrice,
            ...r.article,
          }
        }
      )
      return parsedData
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

export async function updateInventoryItem(item: InventoryType) {
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/inventory/adjusts/${item.ArticleId}`,
    {
      method: "PUT",
      headers: defaultHeadersWithToken,
      body: JSON.stringify({
        salePrice: item.salePrice,
        existence: item.existence,
      }),
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return {
        id: response.data.updatedInventory.ArticleId,
        salePrice: response.data.updatedInventory.salePrice,
        existence: response.data.updatedInventory.existence,
      }
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

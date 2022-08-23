import React from "react"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import {
  fetchInvetoryData,
  updateInventoryItem,
} from "../services/inventory.api"
import { InventoryType } from "../types/Inventory.types"
export default function useInventory() {
  const [data, setData] = React.useState<InventoryType[]>([])

  React.useEffect(() => {
    fetchInvetoryData()
      .then((res) => setData(res))
      .catch((err) => console.log(err))
  }, [])

  const handleEditInventoryItem = (item: InventoryType) => {
    updateInventoryItem(item)
      .then((nC) => {
        setData(
          data.map((i) =>
            i.ArticleId === nC.id
              ? { ...i, salePrice: nC.salePrice, existence: nC.existence }
              : i
          )
        )
        NotificationSuccess(`Se actualizo el registro correctamente`)
      })
      .catch((err) => NotificationError(err))
  }

  return { data, editInventoryItem: handleEditInventoryItem }
}

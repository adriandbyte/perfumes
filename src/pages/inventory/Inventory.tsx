import React from "react"
import AddNewRecordBtn from "../../components/AddNewRecordBtn/AddNewRecordBtn"
import BaseLayout from "../../layout/BaseLayout"
import useInventory from "./hooks/useInventory"
import InventoryTable from "./InventoryTable/InventoryTable"

export default function Inventory() {
  const { data, editInventoryItem } = useInventory()

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Inventario</span>
      <div className="w-100 flex justify-end py-2">
        <AddNewRecordBtn onClick={() => console.log("add inventoryu")} />
      </div>
      <InventoryTable dataSource={data} editInventoryItem={editInventoryItem} />
    </BaseLayout>
  )
}

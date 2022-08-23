import React from "react"
import BaseLayout from "../../layout/BaseLayout"

import AddNewRecordBtn from "../../components/AddNewRecordBtn/AddNewRecordBtn"

import SuppliersTable from "./SuppliersTable/SuppliersTable"
import useSuppliers from "./hooks/useSupplier"

export default function Suppliers() {
  const { suppliers, addSupplier, deleteSupplier, editSupplier } =
    useSuppliers()

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Provedores</span>
      <div className="w-100 flex justify-end py-2">
        <AddNewRecordBtn onClick={addSupplier} />
      </div>
      <SuppliersTable
        dataSource={suppliers}
        deleteSupplier={deleteSupplier}
        editSupplier={editSupplier}
      />
    </BaseLayout>
  )
}

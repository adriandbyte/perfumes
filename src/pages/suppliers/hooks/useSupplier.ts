import React from "react"
import { useNavigate } from "react-router-dom"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import {
  deleteSupplier,
  fetchSuppliers,
  updateSupplier,
} from "../services/suppliers.api"
import { SuppliersType } from "../types/suppliers.types"
export default function useSuppliers() {
  const [suppliers, setSuppliers] = React.useState<SuppliersType[]>([])
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchSuppliers()
      .then((res) => setSuppliers(res))
      .catch((err) => console.log(err))
  }, [])

  const handleDeleteSupplier = async (id: number) => {
    deleteSupplier(id)
      .then((message) => {
        setSuppliers(suppliers.filter((c) => c.id !== id))
        NotificationSuccess(message)
      })
      .catch((err) => NotificationError(err))
  }

  const handleEditSupplier = (supplier: SuppliersType) => {
    const { id, name, rfc, country, active } = supplier
    updateSupplier({ id, rfc, country, name, active })
      .then((nS) => {
        setSuppliers(suppliers.map((c) => (c.id === nS.id ? nS : c)))
        NotificationSuccess(`Se actualizo el registro correctamente`)
      })
      .catch((err) => NotificationError(err))
  }

  const handleNewRecord = () => navigate("/suppliers/new")

  return {
    suppliers,
    deleteSupplier: handleDeleteSupplier,
    editSupplier: handleEditSupplier,
    addSupplier: handleNewRecord,
  }
}

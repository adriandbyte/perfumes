import React from "react"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import {
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../services/categories.api"
import { CategoriesType } from "../types/categories.types"
import { useNavigate } from "react-router-dom"

export default function useCategories() {
  const [categories, setCategories] = React.useState<CategoriesType[]>([])
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res))
      .catch((err) => console.log(err))
  }, [])

  const handleDeleteCategory = async (id: number) => {
    deleteCategory(id)
      .then((message) => {
        setCategories(categories.filter((c) => c.id !== id))
        NotificationSuccess(message)
      })
      .catch((err) => NotificationError(err))
  }
  const handleEditCategory = (category: CategoriesType) => {
    const { id, name, logo_path } = category
    updateCategory({ id, name, logo_path })
      .then((nC) => {
        setCategories(categories.map((c) => (c.id === nC.id ? nC : c)))
        NotificationSuccess(`Se actualizo el registro correctamente`)
      })
      .catch((err) => NotificationError(err))
  }

  const handleNewRecord = () => navigate("/categories/new")

  return {
    categories,
    deleteCategory: handleDeleteCategory,
    editCategory: handleEditCategory,
    addCategory: handleNewRecord,
  }
}

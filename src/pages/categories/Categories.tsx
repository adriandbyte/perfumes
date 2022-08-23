import React from "react"
import BaseLayout from "../../layout/BaseLayout"
import AddNewRecordBtn from "../../components/AddNewRecordBtn/AddNewRecordBtn"
import CategoriesTable from "./CategoriesTable/CategoriesTable"
import useCategories from "./hooks/useCategories"

export default function Categories() {
  const { categories, deleteCategory, editCategory, addCategory } =
    useCategories()

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Categorias</span>
      <div className="w-100 flex justify-end py-2">
        <AddNewRecordBtn onClick={addCategory} />
      </div>
      <CategoriesTable
        dataSource={categories}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
      />
    </BaseLayout>
  )
}

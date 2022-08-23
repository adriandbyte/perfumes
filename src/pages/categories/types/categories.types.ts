export type CategoriesType = {
  id: number
  name: string
  logo_path: string
}
export type NewCategoriesInputs = {
  name: string
  logo_path: string
}
export type CategoriesTableProps = {
  dataSource: CategoriesType[]
  deleteCategory: (id: number) => void
  editCategory: (category: CategoriesType) => void
}

import { SubmitHandler } from "react-hook-form"

export type ArticleType = {
  id: number
  name: string
  image: File[]
  barcode: string
  categoryId: string
  supplierId: string
  description: string
  entry_price: string
  articlePath?: string
  brand: string
  measure: string
  type: string
  updatedAt: string
  createdAt: string
  category: string
  supplier: string
  SupplierId?: string
  CategoryId?: string
  gender: string
}
export type ArticlesType = {
  count: number
  rows: ArticleType[]
}

export type ArticleFormProps = {
  onSubmit: SubmitHandler<ArticleType>
  defaultValues?: ArticleType
  updateArticle?: boolean
}
export type ToolbarArticleItemProps = {
  path: string
  label: string
}
export type ArticleTableProps = {
  dataSource: ArticleType[]
  deleteArticle: (id: number) => void
  editArticle: (article: ArticleType) => void
}
export type ImportArticlesListInputs = {
  categoryId: string
  supplierId: string
  file: File[]
}
export type ImportArticlesFormProps = {
  onSubmit: SubmitHandler<ImportArticlesListInputs>
  submitButtonLabel: string
}

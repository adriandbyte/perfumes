import { ArticleType } from "../../articles/types/articles.types"

export interface InventoryType extends ArticleType {
  ArticleId: number
  article: ArticleType
  existence: number
  salePrice: string
}

export type InventoryTableProps = {
  dataSource: InventoryType[]
  editInventoryItem: (item: InventoryType) => void
}

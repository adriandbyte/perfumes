export type SuppliersType = {
  active: boolean
  country: string
  createdAt: string
  id: number
  name: string
  rfc: string
  updatedAt: string
}
export type NewSupplierInputsType = {
  name: string
  rfc: string
  country: string
  active: false
}
export type SuppliersTableProps = {
  dataSource: SuppliersType[]
  deleteSupplier: (id: number) => void
  editSupplier: (supplier: SuppliersType) => void
}

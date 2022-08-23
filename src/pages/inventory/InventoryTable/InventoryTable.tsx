import React, { useCallback } from "react"
import ReactDataGrid from "@inovua/reactdatagrid-community"
import { CellProps, TypeEditInfo } from "@inovua/reactdatagrid-community/types"
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter"
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter"
import { ArticleType } from "../../articles/types/articles.types"
import { InventoryTableProps, InventoryType } from "../types/Inventory.types"
import ExpandWrapper from "../../../components/ExpandWrapper/ExpandWrapper"

const gridStyle = { minHeight: "100%" }

export default function InventoryTable({
  dataSource,
  editInventoryItem,
}: InventoryTableProps) {
  const columns = React.useMemo(() => getColumns(), [])

  const onEditComplete = useCallback(
    (props: TypeEditInfo & { data?: InventoryType }) => {
      const { value, columnId, data: row } = props
      if (!row) {
        throw new Error("This should never be thrown")
      }
      const key = columnId as keyof ArticleType
      const prevValue = row[key]
      if (prevValue !== value) editInventoryItem({ ...row, [columnId]: value })
    },
    [dataSource]
  )
  return (
    <ExpandWrapper>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        editable
        dataSource={dataSource}
        defaultFilterValue={filterValue}
        onEditComplete={onEditComplete}
        style={gridStyle}
      />
    </ExpandWrapper>
  )
}
const filterValue = [
  { name: "name", operator: "contains", type: "string", value: "" },
  { name: "gender", operator: "inlist", type: "select", value: "" },
  { name: "existence", operator: "gte", type: "number", value: 0 },

  {
    name: "salePrice",
    operator: "inrange",
    type: "number",
    value: { start: 0, end: 2000 },
  },
]
export const getColumns = () => {
  return [
    {
      name: "name",
      header: "Nombre",
      defaultFlex: 2,
      editable: false,
      resizable: true,
    },
    {
      name: "barcode",
      header: "Codigo",
      defaultFlex: 1,
      editable: false,
      resizable: true,
    },

    {
      name: "supplier",
      header: "Provedor",
      defaultFlex: 1,
      editable: false,
      resizable: true,
      render: (cellProps: CellProps) => cellProps.data.supplier.name,
    },

    {
      name: "gender",
      header: "Genero",
      defaultFlex: 1,
      filterEditor: SelectFilter,
      editable: false,
      resizable: false,
      filterEditorProps: {
        placeholder: "All",
        dataSource: [
          { label: "Dama", id: "dama" },
          { label: "Caballero", id: "caballero" },
        ],
      },
    },

    {
      name: "brand",
      header: "Marca",
      defaultFlex: 1,
      editable: false,
      resizable: true,
    },
    {
      name: "existence",
      header: "Existencia",
      filterEditor: NumberFilter,
      defaultFlex: 1,
    },
    {
      name: "salePrice",
      header: "Precio de Venta",
      defaultFlex: 1,
      filterEditor: NumberFilter,
    },
  ]
}

import React, { useCallback } from "react"
import ReactDataGrid from "@inovua/reactdatagrid-community"
import {
  CellProps,
  TypeColumn,
  TypeDataGridProps,
  TypeEditInfo,
} from "@inovua/reactdatagrid-community/types"
import { TableRowContextDelete } from "../../../components/TableRowContextDelete/TableRowContextDelete"
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter"
import { NavLink } from "react-router-dom"
import { ArticleTableProps, ArticleType } from "../types/articles.types"
import ExpandWrapper from "../../../components/ExpandWrapper/ExpandWrapper"

const gridStyle = { minHeight: "100%" }

export default function ArticlesTable({
  dataSource,
  deleteArticle,
  editArticle,
}: ArticleTableProps) {
  const columns = React.useMemo(() => getColumns(), [])
  const renderRowContextMenu: TypeDataGridProps["renderRowContextMenu"] = (
    menuProps,
    { rowProps: { data } }
  ) => {
    menuProps.autoDismiss = true
    menuProps.items = [
      {
        label: <NavLink to={`/article/${data.id}`}>Ver Detalle</NavLink>,
      },
      {
        label: (
          <TableRowContextDelete
            name={data.name}
            onClick={() => deleteArticle(data.id)}
          />
        ),
      },
    ]
  }

  const onEditComplete = useCallback(
    (props: TypeEditInfo & { data?: ArticleType }) => {
      const { value, columnId, data: row } = props
      if (!row) {
        throw new Error("This should never be thrown")
      }
      const key = columnId as keyof ArticleType
      const prevValue = row[key]
      if (prevValue !== value) editArticle({ ...row, [columnId]: value })
    },
    [dataSource]
  )

  return (
    <ExpandWrapper>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        onEditComplete={onEditComplete}
        style={gridStyle}
        defaultFilterValue={filterValue}
        renderRowContextMenu={renderRowContextMenu}
      />
    </ExpandWrapper>
  )
}

const filterValue = [
  { name: "name", operator: "contains", type: "string", value: "" },
  {
    name: "entry_price",
    operator: "inrange",
    type: "number",
    value: { start: 0, end: 2000 },
  },
  { name: "gender", operator: "inlist", type: "select", value: "" },
]
export const getColumns = (): TypeColumn[] => {
  return [
    {
      name: "name",
      header: "Nombre",
      defaultFlex: 2,
      editable: true,
      resizable: true,
    },
    {
      name: "barcode",
      header: "Codigo",
      defaultFlex: 1,
      editable: true,
      resizable: true,
    },
    {
      name: "category",
      header: "Categoria",
      defaultFlex: 1,
      resizable: true,
      editable: false,
      render: (rowData: CellProps) => {
        return <span> {rowData.data.category.name}</span>
      },
    },
    {
      name: "supplier",
      header: "Provedor",
      defaultFlex: 1,
      editable: false,
      resizable: true,
      render: (rowData: CellProps) => {
        return <span> {rowData.data.supplier.name}</span>
      },
    },
    {
      name: "gender",
      header: "Genero",
      defaultFlex: 1,
      resizable: true,
      filterEditorProps: {
        placeholder: "All",
        dataSource: [
          { label: "Dama", id: "dama" },
          { label: "Caballero", id: "caballero" },
        ],
      },
    },
    {
      name: "entry_price",
      header: "Precio",
      defaultFlex: 2,
      editable: true,
      resizable: true,
      filterEditor: NumberFilter,
    },
    {
      name: "brand",
      header: "Marca",
      defaultFlex: 1,
      editable: true,
      resizable: true,
    },
    {
      name: "measure",
      header: "Measure",
      defaultFlex: 1,
      editable: true,
      resizable: true,
      render: ({ value }: CellProps) => (value ? value + " ml" : ""),
    },
    { name: "type", header: "Tipo", defaultFlex: 1, editable: true },
  ]
}

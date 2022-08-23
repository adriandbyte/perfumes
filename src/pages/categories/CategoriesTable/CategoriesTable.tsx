import React, { useCallback } from "react"
import ReactDataGrid from "@inovua/reactdatagrid-community"
import {
  TypeDataGridProps,
  TypeEditInfo,
} from "@inovua/reactdatagrid-community/types"
import { TableRowContextDelete } from "../../../components/TableRowContextDelete/TableRowContextDelete"
import { CategoriesTableProps, CategoriesType } from "../types/categories.types"
import DeleteRecordModal from "../../../components/Modals/DeleteRecordModal"
import ExpandWrapper from "../../../components/ExpandWrapper/ExpandWrapper"
const gridStyle = { minHeight: "100%" }

export default function CategoriesTable({
  dataSource,
  deleteCategory,
  editCategory,
}: CategoriesTableProps) {
  const columns = React.useMemo(() => getColumns(), [])
  const [show, setShow] = React.useState(false)
  const [item, setItem] = React.useState<CategoriesType>({
    id: 0,
    name: "",
    logo_path: "",
  })

  const renderRowContextMenu: TypeDataGridProps["renderRowContextMenu"] = (
    menuProps,
    { rowProps: { data } }
  ) => {
    menuProps.autoDismiss = true
    menuProps.items = [
      {
        label: (
          <TableRowContextDelete
            name={data.name}
            onClick={() => {
              setShow(true)
              setItem(data)
            }}
          />
        ),
      },
    ]
  }

  const onEditComplete = useCallback(
    (props: TypeEditInfo & { data?: CategoriesType }) => {
      const { value, columnId, data: row } = props
      if (!row) {
        throw new Error("This should never be thrown")
      }
      const key = columnId as keyof CategoriesType
      const prevValue = row[key]
      if (prevValue !== value) editCategory({ ...row, [columnId]: value })
    },
    [dataSource]
  )
  return (
    <ExpandWrapper>
      <DeleteRecordModal
        id={item.id}
        show={show}
        setShow={setShow}
        recordName={item.name}
        onDelete={deleteCategory}
      />
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        onEditComplete={onEditComplete}
        style={gridStyle}
        renderRowContextMenu={renderRowContextMenu}
      />
    </ExpandWrapper>
  )
}
export const getColumns = () => {
  return [
    { name: "name", header: "Nombre", editable: true, defaultFlex: 1 },
    { name: "logo_path", header: "Path", editable: true, defaultFlex: 1 },
  ]
}

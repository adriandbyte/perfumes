import React, { useCallback } from "react"
import ReactDataGrid from "@inovua/reactdatagrid-community"

import {
  TypeDataGridProps,
  TypeEditInfo,
} from "@inovua/reactdatagrid-community/types"
import { TableRowContextDelete } from "../../../components/TableRowContextDelete/TableRowContextDelete"
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn"
import { SuppliersTableProps, SuppliersType } from "../types/suppliers.types"
import ExpandWrapper from "../../../components/ExpandWrapper/ExpandWrapper"
import DeleteRecordModal from "../../../components/Modals/DeleteRecordModal"

const gridStyle = { minHeight: "100%" }

export default function SuppliersTable({
  dataSource,
  deleteSupplier,
  editSupplier,
}: SuppliersTableProps) {
  const columns = React.useMemo(() => getColumns(), [])
  const [show, setShow] = React.useState(false)
  const [item, setItem] = React.useState<SuppliersType>({
    active: false,
    country: "",
    createdAt: "",
    id: -1,
    name: "",
    rfc: "",
    updatedAt: "",
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
    (props: TypeEditInfo & { data?: SuppliersType }) => {
      const { value, columnId, data: row } = props
      if (!row) {
        throw new Error("This should never be thrown")
      }
      const key = columnId as keyof SuppliersType
      const prevValue = row[key]
      if (prevValue !== value) editSupplier({ ...row, [columnId]: value })
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
        onDelete={deleteSupplier}
      />
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        editable
        onEditComplete={onEditComplete}
        renderRowContextMenu={renderRowContextMenu}
      />
    </ExpandWrapper>
  )
}
export const getColumns = (): TypeColumns => {
  return [
    { name: "name", header: "Nombre", defaultFlex: 1, editable: true },
    { name: "rfc", header: "RFC", defaultFlex: 1, editable: true },
    {
      name: "active",
      header: "Activo",
      defaultFlex: 1,
      render: ({ value }) => (value ? "Si" : "No"),
    },
    {
      name: "country",
      header: "Pais",
      defaultFlex: 1,
    },
  ]
}

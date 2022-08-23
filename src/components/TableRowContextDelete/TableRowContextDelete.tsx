import React from "react"

type TableRowContextDeleteProps = {
  name: string
  onClick: () => void
}

export const TableRowContextDelete = ({
  name,
  onClick,
}: TableRowContextDeleteProps) => {
  return (
    <div onClick={onClick} className="text-danger flex align-middle w-max">
      <span>
        Borrar <b>{name}</b>
      </span>
    </div>
  )
}

import React from "react"
import { FaFileImport } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { ToolbarArticleItemProps } from "../types/articles.types"

export default function ToolbarArticleItem({
  path,
  label,
}: ToolbarArticleItemProps) {
  return (
    <div className="flex justify-between">
      <FaFileImport className="mt-1 mr-1" />
      <NavLink to={path}>{label}</NavLink>
    </div>
  )
}

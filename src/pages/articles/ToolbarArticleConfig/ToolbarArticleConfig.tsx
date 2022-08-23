import React from "react"
import ToolbarArticleItem from "./ToolbarArticleItem"

const items = [
  { label: "Importar Lista", path: "/articles/import-list" },
  { label: "Buscar artículos nuevos", path: "/articles/find-new-articles" },
  { label: "Comparar precios", path: "/articles/compare-prices" },
]
export default function ToolbarArticleConfig() {
  return (
    <div className="flex justify-start rounded mt-4">
      <ul className="inline-flex w-full ">
        {items.map((item, index) => (
          <li
            key={item.path}
            className={`${
              index > 0 && "ml-2"
            } cursor-pointer  px-4 py-2 font-semibold bg-primary text-white border-b-2 border-blue-400 rounded-t hover:bg-secondary`}
          >
            <ToolbarArticleItem path={item.path} label={item.label} />
          </li>
        ))}
      </ul>
    </div>
  )
}

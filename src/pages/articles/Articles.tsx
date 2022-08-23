import React from "react"
import BaseLayout from "../../layout/BaseLayout"

import AddNewRecordBtn from "../../components/AddNewRecordBtn/AddNewRecordBtn"

import ArticlesTable from "./ArticlesTable/ArticlesTable"

import ToolbarArticleConfig from "./ToolbarArticleConfig/ToolbarArticleConfig"
import useArticle from "./hooks/useArticle"

export default function Articles() {
  const { articles, addArticle, editArticle, deleteArticle } = useArticle()

  return (
    <BaseLayout>
      <span className="font-bold text-3xl">Articulos</span>
      <ToolbarArticleConfig />
      <div className="w-100 flex justify-end py-2">
        <AddNewRecordBtn onClick={addArticle} />
      </div>
      <ArticlesTable
        dataSource={articles}
        deleteArticle={deleteArticle}
        editArticle={editArticle}
      />
    </BaseLayout>
  )
}

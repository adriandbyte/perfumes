import React from "react"
import { useNavigate } from "react-router-dom"
import { NotificationError } from "../../../components/NotificationError/NotificationError"
import { NotificationSuccess } from "../../../components/NotificationSuccess/NotificationSucces"
import {
  deleteArticle,
  fetchArticles,
  updateArticle,
} from "../services/articles.api"
import { ArticleType } from "../types/articles.types"

export default function useArticle() {
  const [articles, setArticles] = React.useState<ArticleType[]>([])
  const navigate = useNavigate()

  const handleNewRecord = () => navigate("/articles/new")

  React.useEffect(() => {
    fetchArticles()
      .then((res) => setArticles(res))
      .catch((err) => console.log(err))
  }, [])

  const handleDeleteArticle = async (id: number) => {
    deleteArticle(id)
      .then((message) => {
        setArticles(articles.filter((a) => a.id !== id))
        NotificationSuccess(message)
      })
      .catch((err) => NotificationError(err))
  }

  const handleEditArticle = (article: ArticleType) => {
    updateArticle(article)
      .then((nA) => {
        console.log(nA)
        setArticles(articles.map((a) => (a.id === nA.id ? nA : a)))
        NotificationSuccess(`Se actualizo el registro correctamente`)
      })
      .catch((err) => NotificationError(err))
  }
  return {
    articles,
    addArticle: handleNewRecord,
    editArticle: handleEditArticle,
    deleteArticle: handleDeleteArticle,
  }
}

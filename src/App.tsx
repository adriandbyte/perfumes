import { Route, Routes } from "react-router-dom"
import RequireAuth from "./components/RequiredAuth/RequiredAuth"
import ArticleDetails from "./pages/articles/ArticleDetails/ArticleDetails"
import Articles from "./pages/articles/Articles"
import CompareArticlesPrices from "./pages/articles/ComparePricesArticles/ComparePricesArticles"
import FindNewArticles from "./pages/articles/FindNewArticles/FindNewArticles"
import ImportArticlesList from "./pages/articles/ImportArticlesList/ImportArticlesList"
import NewArticle from "./pages/articles/NewArticle/NewArticle"
import Categories from "./pages/categories/Categories"
import NewCategory from "./pages/categories/NewCategory/NewCategory"
import Index from "./pages/Index"
import Inventory from "./pages/inventory/Inventory"
import Login from "./pages/login/Login"
import NewSupplier from "./pages/suppliers/NewSupplier/NewSupplier"
import Suppliers from "./pages/suppliers/Suppliers"

const privateRoutes = [
  { path: "/", element: <Index /> },
  { path: "/suppliers", element: <Suppliers /> },
  { path: "/suppliers/new", element: <NewSupplier /> },

  { path: "/categories", element: <Categories /> },
  { path: "/categories/new", element: <NewCategory /> },

  { path: "/articles", element: <Articles /> },
  { path: "/articles/new", element: <NewArticle /> },
  { path: "/article/:id", element: <ArticleDetails /> },
  { path: "/articles/import-list", element: <ImportArticlesList /> },
  { path: "/articles/find-new-articles", element: <FindNewArticles /> },
  { path: "/articles/compare-prices", element: <CompareArticlesPrices /> },

  { path: "/inventory", element: <Inventory /> },
]

const publicRoutes = [{ path: "/login", element: <Login /> }]

function App() {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<RequireAuth>{route.element}</RequireAuth>}
        />
      ))}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}

export default App

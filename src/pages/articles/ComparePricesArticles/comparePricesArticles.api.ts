export async function comparePricesArticles(formData: FormData) {
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/compare/article_prices`,
    {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.message)
      }
      return response.data.newPrices
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

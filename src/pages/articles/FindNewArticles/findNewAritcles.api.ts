export async function findNewArticles(formData: FormData) {
  return fetch(
    `${process.env.REACT_APP_SERVER_PATH}/admin/articles/search/new_list`,
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
      return response.data.newArticles
    })
    .catch(() => {
      throw new Error("Servidor sin conexion favor de intentar mas tarde")
    })
}

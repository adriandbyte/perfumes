export const defaultHeadersWithToken = new Headers({
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token") || "",
})

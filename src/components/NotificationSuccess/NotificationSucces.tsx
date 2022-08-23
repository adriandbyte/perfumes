import { toast, ToastPosition } from "react-toastify"

export function NotificationSuccess(message: string, position?: ToastPosition) {
  toast.success(message, {
    position: position || "top-center",
  })
}

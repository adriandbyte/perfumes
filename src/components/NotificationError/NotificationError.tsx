import { toast, ToastPosition } from "react-toastify"

export function NotificationError(message: string, position?: ToastPosition) {
  toast.error(message, {
    position: position || "top-center",
  })
}

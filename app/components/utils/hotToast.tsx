import { toast, ToastOptions } from "react-hot-toast";

interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  options?: ToastOptions;
}

export const showToast = ({ type, message, options }: ToastProps) => {
  switch (type) {
    case "success":
      toast.success(
        <div className="flex items-center">{message}</div>,
        options
      );
      break;
    case "error":
      toast.error(<div className="flex items-center">{message}</div>, options);
      break;
    case "info":
      toast(<div className="flex items-center">{message}</div>, {
        icon: "ℹ️",
        ...options,
      });
      break;
    default:
      break;
  }
};

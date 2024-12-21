import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../config/toastifyConfig";



// Başarı mesajı için
export const showSuccessToast = (message) => {
  toast.success(message, toastConfig);
};

// Hata mesajı için
export const showErrorToast = (message) => {
  toast.error(message, toastConfig);
};

// Bilgi mesajı için
export const showInfoToast = (message) => {
  toast.info(message, toastConfig);
};

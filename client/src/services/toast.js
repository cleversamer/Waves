import { toast } from "react-toastify";
import config from "config.json";

const toastConfig = {
  position: toast.POSITION.TOP_LEFT,
};

export const showError = (mssg) => {
  mssg = mssg || config.errors.default;
  toast.error(mssg, toastConfig);
};

export const showSuccess = (mssg) => {
  mssg = mssg || config.errors.default;
  toast.success(mssg, toastConfig);
};

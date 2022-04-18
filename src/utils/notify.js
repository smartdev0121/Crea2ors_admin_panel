import { toast as toastr } from "react-toastify";

export const showNotify = (text, type = "success") => {
  if (type === "info") {
    toastr.info(text, "Information");
  } else if (type === "success") {
    toastr.success(text, "Success");
  } else if (type === "warning") {
    toastr.warning(text, "Warning");
  } else if (type === "error") {
    toastr.error(text, "warning");
  }
};

export const alertError = (err, text) => {
  showNotify((err && err.message) || text, "error");
};

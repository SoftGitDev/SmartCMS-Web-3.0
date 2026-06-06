import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function toastNotify(msg: string, type: string) {

  if (type === "success") {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 2000,
    });
  } else if (type === "error") {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 2000,
    });
  } else if (type === "warning") {
    toast.warning(msg, {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
}

export default toastNotify;



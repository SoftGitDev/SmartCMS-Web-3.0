import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
// import info from "../assets/images/info.jpg";
import Confirm from "../assets/images/confirmation.png";

export function SweetAlerts(title?: string, msg?: string, type?: string) {
  if (type === "success") {
    return Swal.fire({
      html: `
            <div style="display: flex;align-items: center;gap: 15px">
                <img
                    src=${success}
                    alt="alerts"
                    style="width: 70px; height: 70px"
                    />
                    <div>
                        <h1 style="text-align: left; font-size: 1rem !important; font-weight: 600 ">${title}</h1>
                        <div style="text-align: left; font-size: 15px; margin-top: 5px">${msg}</div>
                    </div>
            </div>`,
    });
  } else if (type === "error") {
    return Swal.fire({
      html: `
            <div style="display: flex;align-items: center;gap: 15px">
                <img
                src=${error}
                alt="alerts"
                style="width: 70px; height: 70px"
                />
                <div>
                    <h1 style="text-align: left; font-size: 1rem !important; font-weight: 600">${title}</h1>
                    <div style="text-align: left; font-size: 15px; margin-top: 5px">${msg}</div>
                </div>
            </div>`,
    });
  } else if (type === "warning") {
    return Swal.fire({
      html: `
            <div style="display: flex;align-items: center;gap: 15px">
                <img
                src=${Confirm}
                alt="alerts"
                style="width: 70px; height: 70px"
                />
                <div>
                    <h1 style="text-align: left; font-size: 1rem !important; font-weight: 600">${title}</h1>
                    <div style="text-align: left; font-size: 15px; margin-top: 5px">${msg}</div>
                </div>
            </div>`,
    });
  }
}

import Swal from "sweetalert2";

export const fireErrorMessage = () =>
  Swal.fire({
    icon: "error",
    title: "<h3>Sự cố<h3>",
    html: "<p>Chúng tôi gặp phải chút sự cố! Bạn vui lòng thử&nbsp;lại&nbsp;sau.<p>",
    showConfirmButton: false,
    showCloseButton: true,
  });

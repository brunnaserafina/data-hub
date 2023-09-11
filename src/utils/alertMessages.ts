import Swal from "sweetalert2";

export function showSuccessAlert(message: string) {
  Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function showErrorAlert(message: string) {
  Swal.fire({
    position: "bottom-end",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function confirmActionAlert(message: string) {
  return Swal.fire({
    title: "",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
}

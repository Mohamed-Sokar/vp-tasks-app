import Swal from "sweetalert2";

export class Helpers {
  static showMessage = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1500,
    });
  };
}

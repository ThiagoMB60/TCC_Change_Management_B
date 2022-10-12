import Swal from 'sweetalert2'

function alertError(title, text) {
  Swal.fire({ //sweet alert
    title: title,
    text: text,
    icon: 'error',
    confirmButtonText: 'OK'
  });
}
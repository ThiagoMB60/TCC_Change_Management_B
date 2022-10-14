function alertSuccess(text) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1500
  })
}

function alertError(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}


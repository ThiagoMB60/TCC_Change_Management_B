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

function alertConfirmation(title, text, titleConfirmation, textConfirmation, titleAbort, textAbort) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'SIM',
    cancelButtonText: 'NÃO',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        titleConfirmation,
        textConfirmation,
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        titleAbort,
        textAbort,
        'error'
      )
    }
  })
}


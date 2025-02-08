import Swal from 'sweetalert2';

export const swalAlert = (title, message, icon) => {
  const swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary btn-lg'
    },
    buttonsStyling: false
  });
  swal.fire(
    title,
    message,
    icon
  );
}

export const swalToast = (title, icon) => { 
  Swal.fire({
    toast: true,
    icon,
    title,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
}

export const swalConfirm = () => {
  const swal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger mr-3',
      cancelButton: 'btn btn-secondary'
    },
    buttonsStyling: false
  })
  return swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  })
}

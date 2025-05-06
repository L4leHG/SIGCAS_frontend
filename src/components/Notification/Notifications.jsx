import Swal from 'sweetalert2';

const Notification = {
  success: (title, text, autoClose = false) => {
    Swal.fire({
      icon: 'success',
      title: title || '¡Éxito!',
      text: text || 'Operación realizada correctamente.',
      confirmButtonText: autoClose ? undefined : 'Aceptar',
      timer: autoClose ? 2000 : undefined, 
      showConfirmButton: !autoClose,
    });
  },

  error: (title, text, autoClose = false) => {
    Swal.fire({
      icon: 'error',
      title: title || '¡Error!',
      text: text || 'Ocurrió un error inesperado.',
      confirmButtonText: autoClose ? undefined : 'Aceptar',
      timer: autoClose ? 4000 : undefined,
      showConfirmButton: !autoClose,
    });
  },

  warning: (title, text, autoClose = false) => {
    Swal.fire({
      icon: 'warning',
      title: title || 'Advertencia',
      text: text || 'Por favor, verifica esta información.',
      confirmButtonText: autoClose ? undefined : 'Aceptar',
      timer: autoClose ? 4000 : undefined,
      showConfirmButton: !autoClose,
    });
  },

  atention: (title, text, autoClose = false) => {
    Swal.fire({
      icon: 'info',
      title: title || '¡Atención!',
      text: text || 'Por favor, verifica esta información.',
      confirmButtonText: autoClose ? undefined : 'Aceptar',
      timer: autoClose ? 4000 : undefined,
      showConfirmButton: !autoClose,
    });
  },

  confirm: async (title, text, confirmText = 'Aceptar', cancelText = 'Cancelar') => {
    const result = await Swal.fire({
      title: title || '¿Estás seguro?',
      text: text || 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    return result.isConfirmed;
  },
};

export default Notification;
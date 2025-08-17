import Swal from 'sweetalert2'

// Beautiful confirmation dialog
export const showConfirmDialog = (options = {}) => {
  const {
    title = 'Are you sure?',
    text = 'This action cannot be undone!',
    icon = 'warning',
    confirmButtonText = 'Yes, proceed!',
    cancelButtonText = 'Cancel',
    confirmButtonColor = '#dc2626',
    cancelButtonColor = '#6b7280',
    showCancelButton = true,
    reverseButtons = true,
    focusCancel = true
  } = options

  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
    cancelButtonColor,
    reverseButtons,
    focusCancel,
    customClass: {
      popup: 'rounded-lg shadow-xl',
      title: 'text-lg font-semibold text-gray-900',
      content: 'text-gray-600',
      confirmButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200',
      cancelButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200'
    }
  })
}

// Delete confirmation
export const showDeleteConfirm = (itemName, onConfirm) => {
  return showConfirmDialog({
    title: `Delete ${itemName}?`,
    text: `Are you sure you want to delete this ${itemName}? This action cannot be undone.`,
    icon: 'warning',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#dc2626'
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    }
  })
}

// Reset confirmation
export const showResetConfirm = (itemName, onConfirm) => {
  return showConfirmDialog({
    title: `Reset ${itemName}?`,
    text: `Are you sure you want to reset all ${itemName} to default values? This action cannot be undone.`,
    icon: 'question',
    confirmButtonText: 'Yes, reset it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#f59e0b'
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    }
  })
}

// Logout confirmation
export const showLogoutConfirm = (onConfirm) => {
  return showConfirmDialog({
    title: 'Logout?',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    confirmButtonText: 'Yes, logout!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#dc2626'
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    }
  })
}

// Custom confirmation with custom options
export const showCustomConfirm = (options, onConfirm) => {
  return showConfirmDialog(options).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    }
  })
}

// Success dialog
export const showSuccessDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#10b981',
    customClass: {
      popup: 'rounded-lg shadow-xl',
      title: 'text-lg font-semibold text-gray-900',
      content: 'text-gray-600',
      confirmButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200'
    }
  })
}

// Error dialog
export const showErrorDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#dc2626',
    customClass: {
      popup: 'rounded-lg shadow-xl',
      title: 'text-lg font-semibold text-gray-900',
      content: 'text-gray-600',
      confirmButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200'
    }
  })
}

// Info dialog
export const showInfoDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonColor: '#3b82f6',
    customClass: {
      popup: 'rounded-lg shadow-xl',
      title: 'text-lg font-semibold text-gray-900',
      content: 'text-gray-600',
      confirmButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200'
    }
  })
}

// General confirmation dialog
export const showConfirm = (title, text) => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        popup: 'rounded-lg shadow-xl',
        title: 'text-lg font-semibold text-gray-900',
        content: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200',
        cancelButton: 'px-6 py-2 rounded-lg font-medium transition-colors duration-200'
      }
    }).then((result) => {
      resolve(result.isConfirmed)
    })
  })
} 
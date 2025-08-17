import { useToast } from 'vue-toastification'

const toast = useToast()

// Success notifications
export const showSuccess = (message) => {
  toast.success(message, {
    icon: {
      iconClass: 'fas fa-check-circle',
      iconChildren: '',
      iconTag: 'i'
    }
  })
}

// Error notifications
export const showError = (message) => {
  toast.error(message, {
    icon: {
      iconClass: 'fas fa-exclamation-circle',
      iconChildren: '',
      iconTag: 'i'
    }
  })
}

// Warning notifications
export const showWarning = (message) => {
  toast.warning(message, {
    icon: {
      iconClass: 'fas fa-exclamation-triangle',
      iconChildren: '',
      iconTag: 'i'
    }
  })
}

// Info notifications
export const showInfo = (message) => {
  toast.info(message, {
    icon: {
      iconClass: 'fas fa-info-circle',
      iconChildren: '',
      iconTag: 'i'
    }
  })
}

// Confirmation notifications
export const showConfirm = (message, onConfirm, onCancel) => {
  toast.warning(message, {
    timeout: false,
    closeOnClick: false,
    icon: {
      iconClass: 'fas fa-question-circle',
      iconChildren: '',
      iconTag: 'i'
    },
    action: {
      text: 'Yes',
      onClick: (e, toastObject) => {
        onConfirm()
        toastObject.goAway(0)
      }
    },
    action2: {
      text: 'No',
      onClick: (e, toastObject) => {
        onCancel()
        toastObject.goAway(0)
      }
    }
  })
}

// Custom notifications for different actions
export const showCreateSuccess = (itemName) => {
  showSuccess(`${itemName} created successfully!`)
}

export const showUpdateSuccess = (itemName) => {
  showSuccess(`${itemName} updated successfully!`)
}

export const showDeleteSuccess = (itemName) => {
  showSuccess(`${itemName} deleted successfully!`)
}

export const showDeleteConfirm = (itemName, onConfirm) => {
  showConfirm(
    `Are you sure you want to delete this ${itemName}?`,
    onConfirm,
    () => {}
  )
}

export const showActionPending = (action) => {
  showInfo(`${action} in progress...`)
}

export const showActionComplete = (action) => {
  showSuccess(`${action} completed successfully!`)
}

export const showActionFailed = (action, error = '') => {
  showError(`${action} failed! ${error}`)
}

// General toast function that accepts type and message
export const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      showSuccess(message)
      break
    case 'error':
      showError(message)
      break
    case 'warning':
      showWarning(message)
      break
    case 'info':
    default:
      showInfo(message)
      break
  }
} 
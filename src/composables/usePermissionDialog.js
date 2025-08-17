import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { canAccess, getMissingPermissions, getPermissionMessage, hasPermission } from '../utils/permissions'

export function usePermissionDialog() {
  const router = useRouter()
  
  const showPermissionDialog = ref(false)
  const permissionDialogData = ref({
    title: '',
    message: '',
    requiredPermissions: []
  })

  // Check permission and show dialog if needed
  const checkPermission = (feature, action = null) => {
    if (canAccess(feature)) {
      return true
    }

    const missingPermissions = getMissingPermissions(feature)
    const message = getPermissionMessage(feature)
    
    showPermissionDialog.value = true
    permissionDialogData.value = {
      title: 'Access Denied',
      message: `You don't have permission to ${action || message}.`,
      requiredPermissions: missingPermissions
    }
    
    return false
  }

  // Check specific permission
  const checkSpecificPermission = (permission, action = null) => {
    if (hasPermission(permission)) {
      return true
    }

    showPermissionDialog.value = true
    permissionDialogData.value = {
      title: 'Permission Required',
      message: `You don't have permission to ${action || 'perform this action'}.`,
      requiredPermissions: [permission]
    }
    
    return false
  }

  // Check multiple permissions
  const checkPermissions = (permissions, action = null) => {
    const hasAccess = permissions.every(permission => canAccess(permission))
    
    if (hasAccess) {
      return true
    }

    const missingPermissions = permissions.filter(permission => !canAccess(permission))
    
    showPermissionDialog.value = true
    permissionDialogData.value = {
      title: 'Access Denied',
      message: `You don't have permission to ${action || 'access this feature'}.`,
      requiredPermissions: missingPermissions
    }
    
    return false
  }

  // Check action permissions (create, edit, delete, view)
  const checkActionPermission = (action, feature = null) => {
    const actionPermissions = {
      'create': 'canCreate',
      'edit': 'canEdit', 
      'delete': 'canDelete',
      'view': 'canView'
    }
    
    const permission = actionPermissions[action]
    if (!permission) return true
    
    if (hasPermission(permission)) {
      return true
    }

    const actionMessages = {
      'create': 'create new items',
      'edit': 'edit items',
      'delete': 'delete items',
      'view': 'view items'
    }
    
    showPermissionDialog.value = true
    permissionDialogData.value = {
      title: 'Action Denied',
      message: `You don't have permission to ${actionMessages[action]}.`,
      requiredPermissions: [permission]
    }
    
    return false
  }

  // Handle dialog close
  const closePermissionDialog = () => {
    showPermissionDialog.value = false
  }

  // Handle go back action
  const handleGoBack = () => {
    closePermissionDialog()
    router.go(-1)
  }

  return {
    showPermissionDialog,
    permissionDialogData,
    checkPermission,
    checkSpecificPermission,
    checkPermissions,
    checkActionPermission,
    closePermissionDialog,
    handleGoBack
  }
} 
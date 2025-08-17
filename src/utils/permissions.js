import { useAuthStore } from '../stores/auth'

// Check if user has specific permission
export const hasPermission = (permission) => {
  const authStore = useAuthStore()
  const user = authStore.user
  
  if (!user || !user.permissions) {
    return false
  }
  
  return user.permissions[permission] === true
}

// Check if user has any of the required permissions
export const hasAnyPermission = (permissions) => {
  return permissions.some(permission => hasPermission(permission))
}

// Check if user has all required permissions
export const hasAllPermissions = (permissions) => {
  return permissions.every(permission => hasPermission(permission))
}

// Check if user can access a specific feature
export const canAccess = (feature) => {
  const featurePermissions = {
    'dashboard': ['dashboard'],
    'products': ['products'],
    'orders': ['orders'],
    'customers': ['customers'],
    'categories': ['categories'],
    'banners': ['banners'],
    'settings': ['settings'],
    'notifications': ['notifications']
  }
  
  const requiredPermissions = featurePermissions[feature] || []
  return hasAnyPermission(requiredPermissions)
}

// Check if user can perform specific actions
export const canCreate = () => hasPermission('canCreate')
export const canEdit = () => hasPermission('canEdit')
export const canDelete = () => hasPermission('canDelete')
export const canView = () => hasPermission('canView')

// Get user's role
export const getUserRole = () => {
  const authStore = useAuthStore()
  return authStore.user?.role || 'unknown'
}

// Get user's permissions
export const getUserPermissions = () => {
  const authStore = useAuthStore()
  return authStore.user?.permissions || {}
}

// Check if user is admin
export const isAdmin = () => {
  return getUserRole() === 'admin'
}

// Check if user is manager or higher
export const isManagerOrHigher = () => {
  const role = getUserRole()
  return ['admin', 'manager'].includes(role)
}

// Get missing permissions for a feature
export const getMissingPermissions = (feature) => {
  const featurePermissions = {
    'dashboard': ['dashboard'],
    'products': ['products'],
    'orders': ['orders'],
    'customers': ['customers'],
    'categories': ['categories'],
    'banners': ['banners'],
    'settings': ['settings'],
    'notifications': ['notifications']
  }
  
  const requiredPermissions = featurePermissions[feature] || []
  const userPermissions = getUserPermissions()
  
  return requiredPermissions.filter(permission => !userPermissions[permission])
}

// Get permission message for a feature
export const getPermissionMessage = (feature) => {
  const featureMessages = {
    'dashboard': 'Access the dashboard overview',
    'products': 'Manage products and inventory',
    'orders': 'View and manage customer orders',
    'customers': 'Access customer information',
    'categories': 'Manage product categories',
    'banners': 'Manage banners and promotional banners',
    'settings': 'Access system settings and configuration',
    'notifications': 'Manage system notifications'
  }
  
  return featureMessages[feature] || `Access ${feature}`
} 
// Check if user has specific permission
export const hasPermission = (permission, user) => {
  if (!user || !user.permissions) {
    return false
  }
  
  return user.permissions[permission] === true
}

// Check if user has any of the required permissions
export const hasAnyPermission = (permissions, user) => {
  return permissions.some(permission => hasPermission(permission, user))
}

// Check if user has all required permissions
export const hasAllPermissions = (permissions, user) => {
  return permissions.every(permission => hasPermission(permission, user))
}

// Check if user can access a specific feature
export const canAccess = (feature, user) => {
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
  return hasAnyPermission(requiredPermissions, user)
}

// Check if user can perform specific actions
export const canCreate = (user) => hasPermission('canCreate', user)
export const canEdit = (user) => hasPermission('canEdit', user)
export const canDelete = (user) => hasPermission('canDelete', user)
export const canView = (user) => hasPermission('canView', user)

// Get user's role
export const getUserRole = (user) => {
  return user?.role || 'unknown'
}

// Get user's permissions
export const getUserPermissions = (user) => {
  return user?.permissions || {}
}

// Check if user is admin
export const isAdmin = (user) => {
  return getUserRole(user) === 'admin'
}

// Check if user is manager or higher
export const isManagerOrHigher = (user) => {
  const role = getUserRole(user)
  return ['admin', 'manager'].includes(role)
}

// Get missing permissions for a feature
export const getMissingPermissions = (feature, user) => {
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
  const userPermissions = getUserPermissions(user)
  
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
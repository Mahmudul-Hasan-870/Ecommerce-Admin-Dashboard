<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div class="flex flex-col justify-center h-20 px-6 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ settingsStore.settings.siteName }}</h1>
        <p v-if="settingsStore.settings.siteDescription" class="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-tight" style="font-size: 0.625rem;">
          {{ settingsStore.settings.siteDescription }}
        </p>
      </div>
      
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="checkNavigationPermission(item)"
            :class="[
              $route.path === item.href || ($route.path === '/' && item.href === '/')
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200'
            ]"
          >
            <component
              :is="item.icon"
              :class="[
                $route.path === item.href || ($route.path === '/' && item.href === '/') ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white',
                'mr-3 flex-shrink-0 h-6 w-6'
              ]"
            />
            {{ item.name }}
          </router-link>
        </div>
        
        <!-- Logout Section -->
        <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="logout"
            class="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon class="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
            Logout
          </button>
        </div>
      </nav>
    </div>

    <!-- Main content -->
    <div class="pl-64">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between px-6 py-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ currentPageTitle }}</h2>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <div class="relative">
              <button 
                @click="showNotifications = !showNotifications"
                class="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 relative"
              >
                <BellIcon class="h-6 w-6" />
                <span 
                  v-if="notificationsStore.unreadCount > 0"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ notificationsStore.unreadCount > 9 ? '9+' : notificationsStore.unreadCount }}
                </span>
              </button>
              
              <!-- Notifications Dropdown -->
              <div 
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700"
              >
                <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    <button 
                      @click="markAllAsRead"
                      class="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
                
                <div v-if="notificationsStore.notifications.length === 0" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
                
                <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
                  <div 
                    v-for="notification in notificationsStore.notifications" 
                    :key="notification.id"
                    class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    @click="handleNotificationClick(notification)"
                  >
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <div 
                          :class="[
                            'w-2 h-2 rounded-full mt-2',
                            notification.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'
                          ]"
                        ></div>
                      </div>
                      <div class="ml-3 flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ notification.title }}
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {{ notification.message }}
                        </p>
                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {{ formatTime(notification.timestamp) }}
                        </p>
                      </div>
                      <button 
                        @click.stop="markAsRead(notification.id)"
                        class="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                      >
                        <XMarkIcon class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- User menu -->
            <div class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Avatar
                  :src="authStore.user?.avatar"
                  :name="authStore.user?.name || 'Admin'"
                  size="sm"
                />
                <span class="text-gray-700 dark:text-gray-300">{{ authStore.user?.name || 'Admin' }}</span>
              </button>
              
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
              >
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <router-view :key="$route.path" />
      </main>
    </div>

    <!-- Permission Dialog -->
    <PermissionDialog
      :show="showPermissionDialog"
      :title="permissionDialogData.title"
      :message="permissionDialogData.message"
      :required-permissions="permissionDialogData.requiredPermissions"
      @go-back="handleGoBack"
      @contact-admin="handleContactAdmin"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationsStore } from '../stores/notifications'
import { useSettingsStore } from '../stores/settings'
import { usePermissionDialog } from '../composables/usePermissionDialog'
import { showLogoutConfirm } from '../utils/confirm'
import Avatar from '../components/ui/Avatar.vue'
import PermissionDialog from '../components/feature/PermissionDialog.vue'
import { initializeTheme } from '../utils/theme'
import {
  HomeIcon,
  CubeIcon,
  FolderIcon,
  PhotoIcon,
  ShoppingCartIcon,
  UsersIcon,

  CogIcon,
  BellIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const settingsStore = useSettingsStore()

// Permission dialog
const { 
  showPermissionDialog, 
  permissionDialogData, 
  checkPermission, 
  closePermissionDialog, 
  handleGoBack, 
  handleContactAdmin 
} = usePermissionDialog()

const userMenuOpen = ref(false)
const showNotifications = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, permission: 'dashboard' },
  { name: 'Products', href: '/products', icon: CubeIcon, permission: 'products' },
  { name: 'Categories', href: '/categories', icon: FolderIcon, permission: 'categories' },
  { name: 'Banners', href: '/banners', icon: PhotoIcon, permission: 'banners' },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, permission: 'orders' },
  { name: 'Customers', href: '/customers', icon: UsersIcon, permission: 'customers' },

  { name: 'Settings', href: '/settings', icon: CogIcon, permission: 'settings' },
]

const currentPageTitle = computed(() => {
  const currentRoute = navigation.find(item => 
    item.href === router.currentRoute.value.path || 
    (router.currentRoute.value.path === '/' && item.href === '/')
  )
  return currentRoute ? currentRoute.name : 'Dashboard'
})

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return date.toLocaleDateString()
}

const handleNotificationClick = (notification) => {
  if (notification.type === 'low_stock') {
    router.push('/products')
  } else if (notification.type === 'new_order') {
    router.push('/orders')
  }
  markAsRead(notification.id)
}

const markAsRead = async (notificationId) => {
  await notificationsStore.markAsRead(notificationId)
}

const markAllAsRead = async () => {
  await notificationsStore.markAllAsRead()
}

const logout = async () => {
  showLogoutConfirm(async () => {
    await authStore.logout()
    router.push('/login')
  })
}

const checkNavigationPermission = (item) => {
  // Remove permission check for navigation items since admin should have access to all
  // The router guard already handles permission checking
  return true
}

// Auto-refresh notifications every 30 seconds
let notificationInterval

onMounted(async () => {
  // Refresh user permissions to ensure we have the latest permissions
  await authStore.refreshUserPermissions()
  
  await Promise.all([
    notificationsStore.fetchNotifications(),
    settingsStore.fetchSettings()
  ])
  
  // Initialize theme
  initializeTheme(settingsStore.settings)
  
  notificationInterval = setInterval(async () => {
    await notificationsStore.fetchNotifications()
  }, 30000)
})

onUnmounted(() => {
  if (notificationInterval) {
    clearInterval(notificationInterval)
  }
})

// Close notifications dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showNotifications.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 
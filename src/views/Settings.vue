<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your application settings and preferences</p>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="resetSettings"
            class="btn-secondary"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <LoadingSpinner message="Loading settings..." />
    </div>
    
    <div v-else class="space-y-6">
      <!-- General Settings -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">General Settings</h3>
        <form @submit.prevent="updateSettings" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
            <input
              v-model="settings.siteName"
              type="text"
              class="input-field mt-1"
            />
          </div>
          
          <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
            <select v-model="settings.currency" class="input-field mt-1">
              <option value="USD">USD ($) - US Dollar</option>
              <option value="EUR">EUR (€) - Euro</option>
              <option value="GBP">GBP (£) - British Pound</option>
              <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
              <option value="INR">INR (₹) - Indian Rupee</option>
              <option value="JPY">JPY (¥) - Japanese Yen</option>
              <option value="CAD">CAD (C$) - Canadian Dollar</option>
              <option value="AUD">AUD (A$) - Australian Dollar</option>
              <option value="CHF">CHF (CHF) - Swiss Franc</option>
              <option value="CNY">CNY (¥) - Chinese Yuan</option>
              <option value="KRW">KRW (₩) - South Korean Won</option>
              <option value="SGD">SGD (S$) - Singapore Dollar</option>
              <option value="HKD">HKD (HK$) - Hong Kong Dollar</option>
              <option value="NZD">NZD (NZ$) - New Zealand Dollar</option>
              <option value="SEK">SEK (kr) - Swedish Krona</option>
              <option value="NOK">NOK (kr) - Norwegian Krone</option>
              <option value="DKK">DKK (kr) - Danish Krone</option>
              <option value="PLN">PLN (zł) - Polish Złoty</option>
              <option value="CZK">CZK (Kč) - Czech Koruna</option>
              <option value="HUF">HUF (Ft) - Hungarian Forint</option>
              <option value="RUB">RUB (₽) - Russian Ruble</option>
              <option value="TRY">TRY (₺) - Turkish Lira</option>
              <option value="BRL">BRL (R$) - Brazilian Real</option>
              <option value="MXN">MXN ($) - Mexican Peso</option>
              <option value="ZAR">ZAR (R) - South African Rand</option>
              <option value="AED">AED (د.إ) - UAE Dirham</option>
              <option value="SAR">SAR (ر.س) - Saudi Riyal</option>
              <option value="THB">THB (฿) - Thai Baht</option>
              <option value="MYR">MYR (RM) - Malaysian Ringgit</option>
              <option value="IDR">IDR (Rp) - Indonesian Rupiah</option>
              <option value="PHP">PHP (₱) - Philippine Peso</option>
              <option value="VND">VND (₫) - Vietnamese Dong</option>
            </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Description</label>
            <textarea
              v-model="settings.siteDescription"
              rows="2"
              class="input-field mt-1"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone</label>
            <select v-model="settings.timezone" class="input-field mt-1">
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
          
          <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Format</label>
            <select v-model="settings.dateFormat" class="input-field mt-1">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Format</label>
            <select v-model="settings.timeFormat" class="input-field mt-1">
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Items Per Page</label>
            <input
              v-model.number="settings.itemsPerPage"
              type="number"
              min="5"
              max="100"
              class="input-field mt-1"
            />
          </div>
          
          <button type="submit" class="btn-primary">
            Update General Settings
          </button>
        </form>
      </div>


    </div>

    <!-- Theme and Notification Settings -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Theme Settings -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme Settings</h3>
        <form @submit.prevent="updateSettings" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Color</label>
              <input
                v-model="settings.theme.primaryColor"
                type="color"
                class="input-field mt-1 h-10"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Secondary Color</label>
              <input
                v-model="settings.theme.secondaryColor"
                type="color"
                class="input-field mt-1 h-10"
              />
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Enable dark theme</p>
            </div>
            <button
              @click="settings.theme.darkMode = !settings.theme.darkMode"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                settings.theme.darkMode ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  settings.theme.darkMode ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <button type="submit" class="btn-primary">
            Update Theme Settings
          </button>
        </form>
      </div>

      <!-- Notification Settings -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for new orders</p>
            </div>
            <button
              @click="settings.notifications.email = !settings.notifications.email"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                settings.notifications.email ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Receive push notifications for urgent updates</p>
            </div>
            <button
              @click="settings.notifications.push = !settings.notifications.push"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                settings.notifications.push ? 'bg-primary-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
          
          <button 
            @click="updateSettings"
            class="btn-primary mt-4"
          >
            Update Notification Settings
          </button>
        </div>
        </div>
      </div>

      <!-- User Management -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">User Management</h3>
          <button 
            @click="showCreateUserModal = true"
            class="btn-primary"
          >
            Add User
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in users" :key="user._id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <Avatar :name="user.name" size="sm" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                    'bg-red-100 text-red-800': user.role === 'admin',
                    'bg-blue-100 text-blue-800': user.role === 'manager',
                    'bg-green-100 text-green-800': user.role === 'editor',
                    'bg-gray-100 text-gray-800': user.role === 'viewer'
                  }">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                    'bg-green-100 text-green-800': user.isActive,
                    'bg-red-100 text-red-800': !user.isActive
                  }">
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="editUser(user)"
                    class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteUser(user._id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
          </div>
          
    <!-- Create/Edit User Modal -->
    <div v-if="showCreateUserModal || showEditUserModal" class="fixed inset-0 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden" @click.stop>
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{ showEditUserModal ? 'Edit User' : 'Create New User' }}
              </h3>
              <p class="text-primary-100 mt-1">
                {{ showEditUserModal ? 'Update user information and permissions' : 'Create a new user with specific role and permissions' }}
              </p>
            </div>
            <button
              @click="closeUserModal"
              class="text-white hover:text-primary-100 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-8">
          <form @submit.prevent="saveUser" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  required
                  class="input-field"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  required
                  class="input-field"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                <input
                  v-model="newUser.password"
                  type="password"
                  :required="!showEditUserModal"
                  class="input-field"
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone (Optional)</label>
                <input
                  v-model="newUser.phone"
                  type="tel"
                  class="input-field"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <!-- Role Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
              <select v-model="newUser.role" class="input-field" required>
                <option value="">Select a role</option>
                <option value="admin">Administrator - Full access to all features</option>
                <option value="manager">Manager - Manage products, orders, customers</option>
                <option value="editor">Editor - Create and edit content</option>
                <option value="viewer">Viewer - View-only access</option>
                <option value="staff">Staff - Limited access</option>
              </select>
            </div>

            <!-- Permissions -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="flex items-center">
                  <input v-model="newUser.permissions.dashboard" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Dashboard</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.products" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Products</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.orders" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Orders</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.customers" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Customers</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.categories" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Categories</label>
                </div>

                <div class="flex items-center">
                  <input v-model="newUser.permissions.settings" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Settings</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.notifications" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Notifications</label>
                </div>
              </div>
            </div>

            <!-- Action Permissions -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Action Permissions</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="flex items-center">
                  <input v-model="newUser.permissions.canCreate" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Can Create</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.canEdit" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Can Edit</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.canDelete" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Can Delete</label>
                </div>
                <div class="flex items-center">
                  <input v-model="newUser.permissions.canView" type="checkbox" class="mr-2" />
                  <label class="text-sm text-gray-700 dark:text-gray-300">Can View</label>
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Active Status</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Enable or disable user account</p>
              </div>
              <button @click="newUser.isActive = !newUser.isActive" :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors', newUser.isActive ? 'bg-primary-600' : 'bg-gray-200']">
                <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', newUser.isActive ? 'translate-x-6' : 'translate-x-1']" />
            </button>
          </div>
          
            <!-- Modal Actions -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                @click="closeUserModal"
                class="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-primary"
                :disabled="userLoading"
              >
                {{ userLoading ? 'Saving...' : (showEditUserModal ? 'Update User' : 'Create User') }}
          </button>
            </div>
        </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useSettingsStore } from '../stores/settings'
import { useCurrencyStore } from '../stores/currency'
import { showUpdateSuccess, showActionFailed } from '../utils/toast'
import { showResetConfirm } from '../utils/confirm'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import { initializeTheme, updateTheme } from '../utils/theme'
import api from '../utils/axios'
import Avatar from '../components/ui/Avatar.vue'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const currencyStore = useCurrencyStore()

const loading = ref(false)
const userLoading = ref(false)
const showCreateUserModal = ref(false)
const showEditUserModal = ref(false)
const users = ref([])
const newUser = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  isActive: true,
  permissions: {
    dashboard: true,
    products: true,
    orders: true,
    customers: true,
    categories: true,

    settings: false,
    notifications: true,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canView: true
  }
})
const settings = ref({
  siteName: 'Admin Panel',
  siteDescription: 'Modern admin panel for e-commerce',
  currency: 'USD',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  itemsPerPage: 10,
  notifications: {
    email: true,
    push: true
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#6B7280',
    darkMode: false
  },

})

// Load settings on component mount
onMounted(async () => {
  loading.value = true
  try {
  await settingsStore.fetchSettings()
  
  // Update local refs with store data
  settings.value = { ...settingsStore.settings }
  
  // Initialize theme
  initializeTheme(settings.value)
  } catch (error) {
    
  } finally {
    loading.value = false
  }
})

// Watch for theme changes and apply them immediately
watch(() => settings.value.theme, (newTheme) => {
  updateTheme(newTheme)
}, { deep: true })

const updateSettings = async () => {
  const result = await settingsStore.updateSettings(settings.value)
  if (result.success) {
    // Update currency store when currency changes
    if (settings.value.currency !== currencyStore.currency) {
      await currencyStore.updateCurrency(settings.value.currency)
    }
    showUpdateSuccess('Settings')
  } else {
    showActionFailed('Update settings', result.error)
  }
}



const resetSettings = async () => {
  showResetConfirm('settings', async () => {
    const result = await settingsStore.resetSettings()
    if (result.success) {
      settings.value = { ...settingsStore.settings }
      showUpdateSuccess('Settings')
    } else {
      showActionFailed('Reset settings', result.error)
    }
  })
}

// User Management Functions
const fetchUsers = async () => {
  try {
    const response = await api.get('/users')
    users.value = response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    loading.value = false
  }
}

const saveUser = async () => {
  userLoading.value = true
  try {
    let response
    if (showEditUserModal.value) {
      response = await api.put(`/users/${newUser.value._id}`, newUser.value)
    } else {
      response = await api.post('/users', newUser.value)
    }
    
    showUpdateSuccess(showEditUserModal.value ? 'User updated' : 'User created')
    closeUserModal()
    await fetchUsers()
  } catch (error) {
    showActionFailed('Save user', error.response?.data?.message || error.message)
  } finally {
    userLoading.value = false
  }
}

const editUser = (user) => {
  newUser.value = { ...user }
  showEditUserModal.value = true
}

const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await api.delete(`/users/${userId}`)
      showUpdateSuccess('User deleted')
      await fetchUsers()
    } catch (error) {
      showActionFailed('Delete user', error.response?.data?.message || error.message)
    }
  }
}

const closeUserModal = () => {
  showCreateUserModal.value = false
  showEditUserModal.value = false
  newUser.value = {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    isActive: true,
    permissions: {
      dashboard: true,
      products: true,
      orders: true,
      customers: true,
      categories: true,

      settings: false,
      notifications: true,
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canView: true
    }
  }
}

// Load users on component mount
onMounted(async () => {
  loading.value = true
  try {
    await settingsStore.fetchSettings()
    
    // Update local refs with store data
    settings.value = { ...settingsStore.settings }
    
    // Initialize theme
    initializeTheme(settings.value)
    
    // Fetch users
    await fetchUsers()
  } catch (error) {
    
  } finally {
    loading.value = false
  }
})
</script> 
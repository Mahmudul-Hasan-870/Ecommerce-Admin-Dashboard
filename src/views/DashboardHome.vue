<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-6 text-lg text-gray-600 font-medium">Loading dashboard data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="mb-6">
          <svg class="w-16 h-16 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-xl font-medium text-gray-900 mb-3">Error loading dashboard</p>
        <p class="text-base text-red-600 mb-6">{{ error }}</p>
        <button
          @click="fetchDashboardData"
          class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <ShoppingCartIcon class="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalOrders }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon class="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">{{ currencyStore.formatPrice(stats.totalRevenue) }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CubeIcon class="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Products</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalProducts }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <UsersIcon class="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Customers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Recent Orders</h3>
          <router-link to="/orders" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all
          </router-link>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in recentOrders" :key="order._id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{{ order._id.slice(-8) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.userName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ currencyStore.formatPrice(order.total) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800': order.status === 'pending',
                      'bg-blue-100 text-blue-800': order.status === 'processing',
                      'bg-purple-100 text-purple-800': order.status === 'shipped',
                      'bg-green-100 text-green-800': order.status === 'delivered',
                      'bg-red-100 text-red-800': order.status === 'cancelled'
                    }"
                  >
                    {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(order.createdAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Spacing between sections -->
      <div class="h-12"></div>

      <!-- Recent Customers -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Recent Customers</h3>
          <router-link to="/customers" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all
          </router-link>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="customer in recentCustomers" :key="customer._id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <Avatar
                      :src="customer.avatar"
                      :name="customer.name"
                      size="md"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ customer.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      {
                        'bg-green-100 text-green-800': customer.status === 'active',
                        'bg-red-100 text-red-800': customer.status === 'inactive'
                      }
                    ]"
                  >
                    {{ customer.status || 'active' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(customer.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <router-link
                      :to="`/customers`"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      View
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { useProductsStore } from '../stores/products'
import { useCurrencyStore } from '../stores/currency'
import api from '../utils/axios'
import Avatar from '../components/ui/Avatar.vue'
import {
  ShoppingCartIcon,
  CurrencyDollarIcon,
  CubeIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()
const currencyStore = useCurrencyStore()

const loading = ref(true)
const error = ref(null)

const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  totalProducts: 0,
  totalUsers: 0
})

const recentOrders = ref([])
const lowStockProducts = ref([])
const recentCustomers = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const fetchDashboardData = async () => {
  try {
    loading.value = true
    error.value = null
    // Fetch dashboard data
    const response = await api.get('/dashboard/stats')
    const data = response.data
    
    // Set stats
    stats.value = {
      totalOrders: data.stats.totalOrders || 0,
      totalRevenue: data.stats.totalRevenue || 0,
      totalProducts: data.stats.totalProducts || 0,
      totalUsers: data.stats.totalUsers || 0
    }
    
    // Set recent orders, low stock products, and recent customers
    recentOrders.value = data.recentOrders || []
    lowStockProducts.value = data.lowStockProducts || []
    recentCustomers.value = data.recentCustomers || []
    

    
  } catch (err) {

    
    error.value = err.response?.data?.message || 'Failed to fetch dashboard data'
    
    // Set default values on error
    stats.value = {
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      totalUsers: 0
    }
    recentOrders.value = []
    lowStockProducts.value = []
    recentCustomers.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchDashboardData()
})
</script> 
<template>
  <div class="space-y-6">

    
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your customers and their information</p>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="showCreateModal = true"
            class="btn-primary"
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search customers..."
            class="input-field"
            @input="fetchCustomers"
          />
        </div>
        <div class="flex gap-2">
          <select v-model="filters.status" @change="fetchCustomers" class="input-field">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <div v-if="customersStore.loading" class="flex justify-center items-center py-8">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p class="text-sm text-gray-600">Loading customers...</p>
        </div>
      </div>
      
      <div v-else-if="customersStore.error" class="text-center py-8">
        <div class="mb-4">
          <svg class="w-12 h-12 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">Error loading customers</p>
        <p class="text-sm text-red-600 mb-4">{{ customersStore.error }}</p>
        <button
          @click="fetchCustomers"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
      
      <div v-else-if="customersStore.customers.length === 0" class="text-center py-8 text-gray-500">
        <div class="mb-4">
          <svg class="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No customers found</p>
        <p class="text-sm text-gray-600">Get started by adding your first customer</p>
        <button
          @click="showCreateModal = true"
          class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Add First Customer
        </button>
      </div>
      
      <div v-else class="overflow-x-auto">
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
            <tr v-for="customer in customersStore.customers" :key="customer._id">
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
                  {{ customer.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(customer.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editCustomer(customer)"
                    :disabled="customersStore.loading"
                    class="text-primary-600 hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteCustomer(customer._id)"
                    :disabled="customersStore.loading"
                    class="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden" @click.stop>
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{ showEditModal ? 'Edit Customer' : 'Add New Customer' }}
              </h3>
              <p class="text-primary-100 mt-1">
                {{ showEditModal ? 'Update customer information' : 'Create a new customer profile' }}
              </p>
            </div>
            <button
              @click="closeModal"
              class="text-white hover:text-primary-100 transition-colors duration-200 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6">
          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                    placeholder="Enter customer name"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">Phone</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                    placeholder="Enter phone number"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">Status</label>
                  <select v-model="form.status" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Avatar URL</label>
                <input
                  v-model="form.avatar"
                  type="url"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                  placeholder="Enter avatar URL"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Notes</label>
                <textarea
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                  placeholder="Add any notes about this customer"
                ></textarea>
              </div>
            </div>
            
            <!-- Modal Footer -->
            <div class="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="customersStore.loading"
                class="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <svg v-if="customersStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ showEditModal ? 'Update Customer' : 'Create Customer' }}
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
import { useCustomersStore } from '../stores/customers'
import { useAuthStore } from '../stores/auth'
import { showCreateSuccess, showUpdateSuccess, showDeleteSuccess, showActionFailed } from '../utils/toast'
import { showDeleteConfirm } from '../utils/confirm'
import Avatar from '../components/ui/Avatar.vue'

const customersStore = useCustomersStore()
const authStore = useAuthStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingCustomer = ref(null)

const filters = ref({
  search: '',
  status: ''
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  avatar: '',
  status: 'active',
  notes: ''
})



const editCustomer = (customer) => {
  editingCustomer.value = customer
  form.value = { 
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    avatar: customer.avatar || '',
    status: customer.status,
    notes: customer.notes || ''
  }
  showEditModal.value = true
}

const deleteCustomer = async (id) => {
  showDeleteConfirm('customer', async () => {
    try {
      const result = await customersStore.deleteCustomer(id)
      if (result.success) {
        await fetchCustomers()
        showDeleteSuccess('Customer')
      } else {
        showActionFailed('Delete customer', result.error)
      }
    } catch (error) {
      showActionFailed('Delete customer')
    }
  })
}

const handleSubmit = async () => {
  try {
    if (showEditModal.value) {
      const result = await customersStore.updateCustomer(editingCustomer.value._id, form.value)
      if (result.success) {
        closeModal()
        await fetchCustomers()
        showUpdateSuccess('Customer')
      } else {
        showActionFailed('Update customer', result.error)
      }
    } else {
      const result = await customersStore.createCustomer(form.value)
      if (result.success) {
        closeModal()
        await fetchCustomers()
        showCreateSuccess('Customer')
      } else {
        showActionFailed('Create customer', result.error)
      }
    }
  } catch (error) {
    showActionFailed('Save customer')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingCustomer.value = null
  form.value = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    status: 'active',
    notes: ''
  }
}

const fetchCustomers = () => {
  const params = {}
  if (filters.value.search) params.search = filters.value.search
  if (filters.value.status) params.status = filters.value.status
  
  customersStore.updateFilters(filters.value)
  customersStore.fetchCustomers(params)
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

watch(filters, fetchCustomers, { deep: true })

onMounted(async () => {
  try {
    await fetchCustomers()
  } catch (error) {
    // If authentication error, redirect to login
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
  }
})
</script> 
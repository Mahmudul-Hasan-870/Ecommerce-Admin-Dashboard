<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Banners</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your banners and promotional banners</p>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon class="h-4 w-4 mr-2" />
            Add Banner
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <PhotoIcon class="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Banners</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ bannersStore.stats.totalBanners }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Banners</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ bannersStore.stats.activeBanners }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FolderIcon class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Regular Banners</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ bannersStore.stats.regularBanners }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <BriefcaseIcon class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Promotional Banners</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ bannersStore.stats.promotionalBanners }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
            <input
              id="search"
              v-model="filters.search"
              type="text"
              placeholder="Search banners..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              id="type"
              v-model="filters.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Types</option>
              <option value="regular">Regular</option>
              <option value="promotional">Promotional</option>
            </select>
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              id="status"
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Banners Table -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Banners</h3>
          <div class="flex items-center space-x-2">
            <button
              v-if="selectedBanners.length > 0"
              @click="bulkDelete"
              class="px-3 py-1 text-sm text-red-600 hover:text-red-700"
            >
              Delete Selected ({{ selectedBanners.length }})
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <LoadingSpinner v-if="bannersStore.loading" message="Loading banners..." />
        
        <div v-else-if="bannersStore.error" class="text-center py-8">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">Error loading banners</p>
          <p class="text-sm text-red-600 mb-4">{{ bannersStore.error }}</p>
          <button
            @click="fetchBanners"
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
        
        <div v-else-if="bannersStore.banners.length === 0" class="text-center py-8 text-gray-500">
          <div class="mb-4">
            <svg class="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">No banners found</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Get started by adding your first banner</p>
          <button
            @click="showCreateModal = true"
            class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Add First Banner
          </button>
        </div>
        
        <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Banner
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Product
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Created
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="banner in bannersStore.banners" :key="banner._id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :value="banner._id"
                  v-model="selectedBanners"
                  class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <img
                      :src="banner.image"
                      :alt="banner.title"
                      class="h-12 w-12 rounded-lg object-cover"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ banner.title }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    banner.type === 'promotional' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  ]"
                >
                  {{ banner.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    banner.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  ]"
                >
                  {{ banner.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div v-if="banner.productId">
                  <div class="font-medium">{{ banner.productId.name }}</div>
                  <div class="text-gray-500">${{ banner.productId.price }}</div>
                </div>
                <span v-else class="text-gray-400">No product</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ formatDate(banner.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="editBanner(banner)"
                    class="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteBanner(banner._id)"
                    class="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="bannersStore.pagination.total > 0" class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex items-center justify-between">
          <!-- Show pagination only if there are multiple pages -->
          <div v-if="bannersStore.pagination.pages > 1" class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="bannersStore.pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="bannersStore.pagination.page >= bannersStore.pagination.pages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span v-if="bannersStore.pagination.pages > 1">
                  Showing
                  <span class="font-medium">{{ (bannersStore.pagination.page - 1) * bannersStore.pagination.limit + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(bannersStore.pagination.page * bannersStore.pagination.limit, bannersStore.pagination.total) }}</span>
                  of
                  <span class="font-medium">{{ bannersStore.pagination.total }}</span>
                  results
                </span>
                <span v-else>
                  <span class="font-medium">{{ bannersStore.pagination.total }}</span> banner{{ bannersStore.pagination.total !== 1 ? 's' : '' }} found
                </span>
              </p>
            </div>
            <div v-if="bannersStore.pagination.pages > 1">
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="bannersStore.pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="bannersStore.pagination.page >= bannersStore.pagination.pages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <BannerModal
      v-if="showCreateModal || showEditModal"
      :banner="editingBanner"
      :is-edit="showEditModal"
      @close="closeModal"
      @saved="onBannerSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useBannersStore } from '../stores/banners'
import { showToast } from '../utils/toast'
import { showConfirm } from '../utils/confirm'
import BannerModal from '../components/feature/BannerModal.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import {
  PlusIcon,
  PhotoIcon,
  CheckCircleIcon,
  StarIcon,
  BriefcaseIcon,
  FolderIcon
} from '@heroicons/vue/24/outline'

const bannersStore = useBannersStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingBanner = ref(null)
const selectedBanners = ref([])
const filters = ref({
  search: '',
  type: '',
  status: ''
})

// Debounced search
let searchTimeout = null

const selectAll = computed({
  get() {
    return bannersStore.banners.length > 0 && selectedBanners.value.length === bannersStore.banners.length
  },
  set(value) {
    if (value) {
      selectedBanners.value = bannersStore.banners.map(b => b._id)
    } else {
      selectedBanners.value = []
    }
  }
})

onMounted(async () => {
  await Promise.all([
    bannersStore.fetchBanners(),
    bannersStore.fetchBannerStats()
  ])
})

// Auto-filter when filters change (with debouncing for search)
watch(() => filters.value.type, async (newType) => {
  await fetchBanners()
})

watch(() => filters.value.status, async (newStatus) => {
  await fetchBanners()
})

watch(() => filters.value.search, async (newSearch) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(async () => {
    await fetchBanners()
  }, 300)
})

const fetchBanners = async () => {
  const params = { ...filters.value }
  if (!params.search) delete params.search
  if (!params.type) delete params.type
  if (!params.status) delete params.status
  
  await bannersStore.fetchBanners(params)
}

const editBanner = (banner) => {
  editingBanner.value = { ...banner }
  showEditModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingBanner.value = null
}

const onBannerSaved = async () => {
  closeModal()
  await bannersStore.fetchBanners()
  await bannersStore.fetchBannerStats()
  showToast('Banner saved successfully', 'success')
}

const deleteBanner = async (id) => {
  const confirmed = await showConfirm('Are you sure you want to delete this banner?', 'This action cannot be undone.')
  if (!confirmed) return

  const result = await bannersStore.deleteBanner(id)
  if (result.success) {
    await bannersStore.fetchBannerStats()
    showToast('Banner deleted successfully', 'success')
  } else {
    showToast(result.error, 'error')
  }
}

const bulkDelete = async () => {
  const confirmed = await showConfirm(`Are you sure you want to delete ${selectedBanners.value.length} banners?`, 'This action cannot be undone.')
  if (!confirmed) return

  const result = await bannersStore.bulkOperations('delete', selectedBanners.value)
  if (result.success) {
    selectedBanners.value = []
    await bannersStore.fetchBannerStats()
    showToast(result.message, 'success')
  } else {
    showToast(result.error, 'error')
  }
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedBanners.value = bannersStore.banners.map(b => b._id)
  } else {
    selectedBanners.value = []
  }
}

const previousPage = async () => {
  if (bannersStore.pagination.page > 1) {
    await bannersStore.fetchBanners({ ...filters.value, page: bannersStore.pagination.page - 1 })
  }
}

const nextPage = async () => {
  if (bannersStore.pagination.page < bannersStore.pagination.pages) {
    await bannersStore.fetchBanners({ ...filters.value, page: bannersStore.pagination.page + 1 })
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script> 
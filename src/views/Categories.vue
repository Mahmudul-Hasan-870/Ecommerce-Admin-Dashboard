<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your product categories</p>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="checkCreatePermission"
            class="btn-primary"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.active }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Inactive</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.inactive }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Parent</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.parent }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Sub</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.sub }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search categories..."
            class="input-field"
          />
        </div>
        <div class="flex gap-2">
          <select v-model="filters.status" class="input-field">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select v-model="filters.type" class="input-field">
            <option value="">All Types</option>
            <option value="parent">Parent Only</option>
            <option value="sub">Sub Only</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Categories</h3>
          <div class="flex gap-2">
            <button
              v-if="selectedCategories.length > 0"
              @click="bulkAction('activate')"
              class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              Activate
            </button>
            <button
              v-if="selectedCategories.length > 0"
              @click="bulkAction('deactivate')"
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <div v-if="loading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span class="ml-2 text-gray-600">Loading categories...</span>
        </div>
        <div v-else-if="categoriesStore.error" class="flex justify-center items-center py-8">
          <div class="text-red-600 text-center">
            <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p class="text-lg font-medium">{{ categoriesStore.error }}</p>
            <button @click="fetchCategories" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Try Again
            </button>
          </div>
        </div>
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">
                <input
                  v-model="selectAll"
                  @change="toggleSelectAll"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="category in filteredCategories"
              :key="category._id"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  v-model="selectedCategories"
                  :value="category._id"
                  type="checkbox"
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      v-if="category.image"
                      :src="category.image"
                      :alt="category.name"
                      class="h-10 w-10 rounded-lg object-cover"
                    />
                    <div
                      v-else
                      class="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center"
                    >
                      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                    <div class="text-sm text-gray-500">{{ category.slug }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span v-if="category.parent" class="text-gray-600">
                  {{ category.parent.name }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Level {{ category.level }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    category.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ category.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex gap-2">
                  <button
                    @click="editCategory(category)"
                    class="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteCategory(category._id)"
                    class="text-red-600 hover:text-red-900"
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
                {{ showEditModal ? 'Edit Category' : 'Add New Category' }}
              </h3>
              <p class="text-primary-100 mt-1">
                {{ showEditModal ? 'Update category information and settings' : 'Create a new category with all details' }}
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
        <div class="p-8">
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Category name"
                />
              </div>
              
              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Category description"
                ></textarea>
              </div>
              
              <!-- Parent Category -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Parent Category
                </label>
                <select
                  v-model="form.parent"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">No Parent (Main Category)</option>
                  <option
                    v-for="parent in parentCategories"
                    :key="parent._id"
                    :value="parent._id"
                  >
                    {{ parent.name }}
                  </option>
                </select>
              </div>
              
              <!-- Image URL -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  v-model="form.image"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter image URL"
                />
              </div>
              

              
              <!-- Status -->
              <div>
                <label class="flex items-center">
                  <input
                    v-model="form.isActive"
                    type="checkbox"
                    class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Active</span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-end gap-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {{ loading ? 'Saving...' : (showEditModal ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Permission Dialog -->
    <PermissionDialog
      :show="showPermissionDialog"
      :title="permissionDialogData.title"
      :message="permissionDialogData.message"
      :required-permissions="permissionDialogData.requiredPermissions"
      @go-back="handleGoBack"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useCategoriesStore } from '../stores/categories'
import { usePermissionDialog } from '../composables/usePermissionDialog'
import { showConfirmDialog } from '../utils/confirm'
import PermissionDialog from '../components/feature/PermissionDialog.vue'

const categoriesStore = useCategoriesStore()

// Permission dialog
const { 
  showPermissionDialog, 
  permissionDialogData, 
  checkActionPermission, 
  closePermissionDialog, 
  handleGoBack
} = usePermissionDialog()

// Reactive data
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedCategories = ref([])
const selectAll = ref(false)

const filters = ref({
  search: '',
  status: '',
  type: ''
})

const form = ref({
  name: '',
  description: '',
  parent: '',
  image: '',
  isActive: true
})

// Computed properties
const stats = computed(() => categoriesStore.stats)
const loading = computed(() => categoriesStore.loading)
const categories = computed(() => categoriesStore.categories)
const parentCategories = computed(() => categoriesStore.parentCategories)

const filteredCategories = computed(() => {
  let filtered = categories.value

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(cat => 
      cat.name.toLowerCase().includes(search) ||
      cat.slug.toLowerCase().includes(search)
    )
  }

  if (filters.value.status) {
    filtered = filtered.filter(cat => 
      filters.value.status === 'active' ? cat.isActive : !cat.isActive
    )
  }

  if (filters.value.type) {
    if (filters.value.type === 'parent') {
      filtered = filtered.filter(cat => !cat.parent)
    } else if (filters.value.type === 'sub') {
      filtered = filtered.filter(cat => cat.parent)
    }
  }

  return filtered
})

// Permission check functions
const checkCreatePermission = () => {
  if (checkActionPermission('create', 'categories')) {
    showCreateModal.value = true
  }
}

const checkEditPermission = () => {
  return checkActionPermission('edit', 'categories')
}

const checkDeletePermission = () => {
  return checkActionPermission('delete', 'categories')
}

// Methods
const fetchCategories = async () => {
  try {
    const params = {}
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.type === 'parent') params.parent = 'null'
    
    await categoriesStore.fetchCategories(params)
    await categoriesStore.fetchCategoryStats()
  } catch (error) {
    
  }
}

const editCategory = (category) => {
  if (!checkEditPermission()) return
  
  categoriesStore.setSelectedCategory(category)
  
  // Handle parent field correctly
  let parentValue = ''
  if (category.parent) {
    parentValue = category.parent._id || category.parent
  }
  
  form.value = {
    name: category.name,
    description: category.description || '',
    parent: parentValue,
    image: category.image || '',
    isActive: category.isActive
  }
  showEditModal.value = true
}

const deleteCategory = async (id) => {
  if (!checkDeletePermission()) return
  
  const result = await showConfirmDialog({
    title: 'Delete Category',
    text: 'Are you sure you want to delete this category? This action cannot be undone.',
    icon: 'warning',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })
  
  if (result.isConfirmed) {
    await categoriesStore.deleteCategory(id)
  }
}

const bulkAction = async (action) => {
  if (selectedCategories.value.length === 0) return
  
  const result = await showConfirmDialog({
    title: `${action === 'activate' ? 'Activate' : 'Deactivate'} Categories`,
    text: `Are you sure you want to ${action} ${selectedCategories.value.length} categories?`,
    icon: 'question',
    confirmButtonText: `Yes, ${action} them!`,
    cancelButtonText: 'Cancel'
  })
  
  if (result.isConfirmed) {
    try {
      await categoriesStore.bulkUpdate(selectedCategories.value, action)
      
      // Clear selections immediately for better UX
      selectedCategories.value = []
      selectAll.value = false
      
      // Small delay to ensure UI updates
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {

    }
  }
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedCategories.value = filteredCategories.value.map(cat => cat._id)
  } else {
    selectedCategories.value = []
  }
}

const handleSubmit = async () => {
  try {
    // Prepare form data
    const formData = { ...form.value }
    
    // Handle empty parent field
    if (formData.parent === '') {
      formData.parent = null
    }
    
    if (showEditModal.value) {
      const categoryId = categoriesStore.selectedCategory?._id
      if (categoryId) {
        await categoriesStore.updateCategory(categoryId, formData)
      }
    } else {
      await categoriesStore.createCategory(formData)
    }
    
    closeModal()
  } catch (error) {
    
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  categoriesStore.clearSelectedCategory()
  form.value = {
    name: '',
    description: '',
    parent: '',
    image: '',
    isActive: true
  }
}

// Watch for changes
watch(selectedCategories, (newVal) => {
  selectAll.value = newVal.length === filteredCategories.value.length && newVal.length > 0
})

// Lifecycle
onMounted(async () => {
  try {
    await fetchCategories()
  } catch (error) {
    
  }
})
</script> 
<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="close">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ isEdit ? 'Edit Banner' : 'Create New Banner' }}
          </h3>
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveBanner" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter banner title"
            />
          </div>

          <!-- Type -->
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Type <span class="text-red-500">*</span>
            </label>
            <select
              id="type"
              v-model="form.type"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="regular">Regular Banner</option>
              <option value="promotional">Promotional Banner</option>
            </select>
          </div>

          <!-- Image URL -->
          <div>
            <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL <span class="text-red-500">*</span>
            </label>
            <input
              id="image"
              v-model="form.image"
              type="url"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <!-- Image Preview -->
          <div v-if="form.image" class="mt-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image Preview
            </label>
            <div class="relative w-full h-48 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <img
                :src="form.image"
                :alt="form.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              id="status"
              v-model="form.status"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Product -->
          <div>
            <label for="productId" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Associated Product
            </label>
            <select
              id="productId"
              v-model="form.productId"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a product (optional)</option>
              <option v-for="product in productsStore.products" :key="product._id" :value="product._id">
                {{ product.name }} - ${{ product.price }} ({{ product.status }})
              </option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <LoadingSpinner v-if="loading" class="h-4 w-4 mr-2" />
              {{ isEdit ? 'Update Banner' : 'Create Banner' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useBannersStore } from '../stores/banners'
import { useProductsStore } from '../stores/products'
import { showToast } from '../utils/toast'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import LoadingSpinner from './ui/LoadingSpinner.vue'

const props = defineProps({
  banner: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'saved'])

const bannersStore = useBannersStore()
const productsStore = useProductsStore()
const loading = ref(false)

const form = reactive({
  title: '',
  type: 'regular',
  image: '',
  status: 'active',
  productId: ''
})

onMounted(async () => {
  // Fetch products for the dropdown
  await productsStore.fetchProducts({ limit: 100 })
  
  if (props.banner && props.isEdit) {
    // Handle productId - it could be an object (populated) or a string (ID)
    let productId = ''
    if (props.banner.productId) {
      if (typeof props.banner.productId === 'object' && props.banner.productId._id) {
        productId = props.banner.productId._id
      } else if (typeof props.banner.productId === 'string') {
        productId = props.banner.productId
      }
    }
    
    Object.assign(form, {
      title: props.banner.title || '',
      type: props.banner.type || 'regular',
      image: props.banner.image || '',
      status: props.banner.status || 'active',
      productId: productId
    })
  }
})

const saveBanner = async () => {
  loading.value = true
  
  try {
    const bannerData = { ...form }
    
    let result
    if (props.isEdit && props.banner) {
      result = await bannersStore.updateBanner(props.banner._id, bannerData)
    } else {
      result = await bannersStore.createBanner(bannerData)
    }
    
    if (result.success) {
      showToast(
        props.isEdit ? 'Banner updated successfully' : 'Banner created successfully',
        'success'
      )
      emit('saved')
    } else {
      showToast(result.error, 'error')
    }
  } catch (error) {
    showToast('An error occurred while saving the banner', 'error')
  } finally {
    loading.value = false
  }
}

const close = () => {
  emit('close')
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
}
</script> 
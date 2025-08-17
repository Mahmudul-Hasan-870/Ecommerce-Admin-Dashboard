<template>
  <div class="space-y-6">
    <div v-if="successMessage" class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-2 rounded shadow-lg transition-all duration-300">
      {{ successMessage }}
    </div>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your products and inventory</p>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="checkCreatePermission"
            class="btn-primary"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ productsStore.totalProducts }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Products</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ productsStore.activeProducts.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Products</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ featuredProductsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ productsStore.lowStockProducts.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and View Toggle -->
    <div class="card">
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div class="flex flex-col sm:flex-row gap-4 flex-1">
          <div class="flex-1">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search products..."
              class="input-field"
            />
          </div>
          <div class="flex gap-2">
            <select v-model="filters.status" class="input-field">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="viewMode = 'table'"
            :class="[
              'px-3 py-2 rounded-lg border transition-colors duration-200',
              viewMode === 'table'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 6h18M3 14h18M3 18h18"></path>
            </svg>
          </button>
          <button
            @click="viewMode = 'cards'"
            :class="[
              'px-3 py-2 rounded-lg border transition-colors duration-200',
              viewMode === 'cards'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Products Display -->
    <div class="card">
      <LoadingSpinner v-if="productsStore.loading" message="Loading products..." />
      
      <div v-else-if="productsStore.error" class="text-center py-8">
        <div class="mb-4">
          <svg class="w-12 h-12 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">Error loading products</p>
        <p class="text-sm text-red-600 mb-4">{{ productsStore.error }}</p>
        <div class="space-y-2">
          <button
            @click="fetchProducts"
            class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Try Again
          </button>
          <div v-if="productsStore.error.includes('401') || productsStore.error.includes('unauthorized')" class="mt-4">
            <p class="text-sm text-gray-600 mb-2">You may need to log in first.</p>
            <a href="/login" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Go to Login Page
            </a>
          </div>
        </div>
      </div>
      
      <div v-else-if="productsStore.products.length === 0" class="text-center py-8 text-gray-500">
        <div class="mb-4">
          <svg class="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No products found</p>
        <p class="text-sm text-gray-600">Get started by adding your first product</p>
        <button
          @click="checkCreatePermission"
          class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Add First Product
        </button>
      </div>
      
      <!-- Card View -->
      <div v-else-if="viewMode === 'cards'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in productsStore.products"
          :key="product._id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Product Image -->
          <div class="relative h-48 bg-gray-200 dark:bg-gray-700">
            <img
              :src="product.image || 'https://via.placeholder.com/300x200?text=No+Image'"
              :alt="product.name"
              class="w-full h-full object-cover"
              @error="$event.target.src = 'https://via.placeholder.com/300x200?text=No+Image'"
            />
            <!-- Status Badge -->
            <div class="absolute top-2 right-2">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  product.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]"
              >
                {{ product.status }}
              </span>
            </div>
            <!-- Featured Badge -->
            <div v-if="product.featured" class="absolute top-2 left-2">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Featured
              </span>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ truncateDescription(product.description) }}</p>
            
            <!-- Categories -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span v-if="product.category && product.category.name" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {{ product.category.name }}
              </span>
              <span v-if="product.subCategory && product.subCategory.name" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {{ product.subCategory.name }}
              </span>
            </div>
            
            <!-- Price and Stock -->
            <div class="flex items-center justify-between mb-4">
              <div class="text-lg font-bold text-gray-900 dark:text-white">
                {{ currencyStore.formatPrice(product.price) }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Stock: {{ product.stock }}
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex space-x-2">
              <button
                @click="editProduct(product)"
                :disabled="productsStore.loading"
                class="flex-1 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product._id)"
                :disabled="productsStore.loading"
                class="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Table View -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>

              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Main Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sub Category
              </th>

              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variants
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in productsStore.products" :key="product._id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="relative">
                    <Avatar
                      :src="product.image"
                      :name="product.name"
                      size="md"
                      :show-badge="product.images && product.images.length > 0"
                      :badge-count="product.images ? product.images.length : 0"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">{{ truncateDescription(product.description) }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span v-if="product.category && product.category.name" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ product.category.name }}
                </span>
                <span v-else-if="product.category" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Category ID: {{ product.category }}
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span v-if="product.subCategory && product.subCategory.name" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {{ product.subCategory.name }}
                </span>
                <span v-else-if="product.subCategory" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                  Sub Category ID: {{ product.subCategory }}
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ currencyStore.formatPrice(product.price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.stock }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    {
                      'bg-green-100 text-green-800': product.status === 'active',
                      'bg-red-100 text-red-800': product.status === 'inactive'
                    }
                  ]"
                >
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    {
                      'bg-yellow-100 text-yellow-800': product.featured,
                      'bg-gray-100 text-gray-800': !product.featured
                    }
                  ]"
                >
                  {{ product.featured ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div v-if="product.variants && product.variants.length > 0">
                  <!-- Show first variant -->
                  <div class="text-xs text-gray-900 mb-1">
                    {{ product.variants[0].color }} {{ product.variants[0].size }} - {{ currencyStore.formatPrice(product.variants[0].price) }}
                  </div>
                  <!-- Show "+X more" if there are additional variants -->
                  <div v-if="product.variants.length > 1" class="text-xs text-gray-500">
                    +{{ product.variants.length - 1 }} more
                  </div>
                </div>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editProduct(product)"
                    :disabled="productsStore.loading"
                    class="text-primary-600 hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ productsStore.loading ? 'Loading...' : 'Edit' }}
                  </button>
                  <button
                    @click="deleteProduct(product._id)"
                    :disabled="productsStore.loading"
                    class="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ productsStore.loading ? 'Loading...' : 'Delete' }}
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
      <div class="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden" @click.stop>
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{ showEditModal ? 'Edit Product' : 'Add New Product' }}
              </h3>
              <p class="text-primary-100 mt-1">
                {{ showEditModal ? 'Update product information and settings' : 'Create a new product with all details' }}
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
            <div class="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              <!-- Basic Information Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-base font-semibold text-gray-900">Basic Information</h4>
                    <p class="text-xs text-gray-600">Product name, description, and basic details</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Product Name *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Description</label>
                    <input
                      v-model="form.description"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                      placeholder="Product description"
                    />
                  </div>
                </div>
              </div>

              <!-- Category Classification Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-base font-semibold text-gray-900">Category Classification</h4>
                    <p class="text-xs text-gray-600">Organize your product with main and sub categories</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Main Category Selection -->
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <label class="block text-sm font-semibold text-gray-700">Main Category *</label>
                    </div>
                    <div class="relative">
                      <select
                        v-model="form.category"
                        @change="handleCategoryChange"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition-all duration-200 bg-white appearance-none"
                        :disabled="categoriesStore.loading"
                      >
                        <option value="">{{ categoriesStore.loading ? 'Loading categories...' : 'Choose main category' }}</option>
                        <option 
                          v-for="category in parentCategories" 
                          :key="category._id" 
                          :value="category._id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    
                    <!-- Status Indicators -->
                    <div class="space-y-1">
                      <div v-if="parentCategories.length === 0 && !categoriesStore.loading" class="flex items-center text-xs text-red-500">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        No main categories available
                      </div>
                      <div v-if="form.category && subCategories.length > 0" class="flex items-center text-xs text-green-600">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        {{ subCategories.length }} sub-category{{ subCategories.length > 1 ? 'ies' : '' }} available
                      </div>
                      <div v-if="form.category && subCategories.length === 0" class="flex items-center text-xs text-blue-500">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                        No sub-categories for this main category
                      </div>
                    </div>
                  </div>

                  <!-- Sub Category Selection -->
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <label class="block text-sm font-semibold text-gray-700">Sub Category *</label>
                    </div>
                    <div class="relative">
                      <select
                        v-model="form.subCategory"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition-all duration-200 bg-white appearance-none"
                        :disabled="!form.category || subCategories.length === 0"
                      >
                        <option value="">{{ form.category ? (subCategories.length > 0 ? 'Choose sub category' : 'No sub categories') : 'Select main category first' }}</option>
                        <option 
                          v-for="subCategory in subCategories" 
                          :key="subCategory._id" 
                          :value="subCategory._id"
                        >
                          {{ subCategory.name }}
                        </option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    
                    <!-- Status Indicators -->
                    <div class="space-y-1">
                      <div v-if="!form.category" class="flex items-center text-xs text-red-500">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                        Select main category first (required)
                      </div>
                      <div v-if="form.category && subCategories.length === 0" class="flex items-center text-xs text-red-500">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                        No sub-categories available (required)
                      </div>
                      <div v-if="form.subCategory" class="flex items-center text-xs text-green-600">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Sub-category selected
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Pricing & Inventory Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-base font-semibold text-gray-900">Pricing & Inventory</h4>
                    <p class="text-xs text-gray-600">Set price, stock, and inventory details</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Base Price *</label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        v-model="form.price"
                        type="number"
                        step="0.01"
                        required
                        class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Stock Quantity *</label>
                    <input
                      v-model="form.stock"
                      type="number"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                      placeholder="Available stock"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Status *</label>
                    <select v-model="form.status" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Featured</label>
                    <select v-model="form.featured" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white">
                      <option :value="false">No</option>
                      <option :value="true">Yes</option>
                    </select>
                  </div>
                </div>
              </div>



              <!-- Images Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-base font-semibold text-gray-900">Product Images</h4>
                    <p class="text-xs text-gray-600">Add main and additional product images</p>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">Main Image URL</label>
                    <input
                      v-model="form.image"
                      type="url"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                      placeholder="Enter main image URL"
                    />
                  </div>

                  <!-- Additional Images -->
                  <div class="space-y-3">
                    <label class="block text-sm font-semibold text-gray-700">Additional Images</label>
                    <div class="space-y-3">
                      <div v-for="(image, index) in form.images" :key="index" class="flex gap-3">
                        <input
                          v-model="form.images[index]"
                          type="url"
                          class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-200 bg-white"
                          :placeholder="`Additional image ${index + 1} URL`"
                        />
                        <button
                          @click="form.images.splice(index, 1)"
                          type="button"
                          class="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Remove
                        </button>
                      </div>
                      <button
                        @click="form.images.push('')"
                        type="button"
                        class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary-400 hover:text-primary-600 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Image URL
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Variants Section -->
              <div class="bg-gray-50 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-base font-semibold text-gray-900">Product Variants</h4>
                      <p class="text-xs text-gray-600">Add different colors, sizes, and prices</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    @click="addVariant" 
                    class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Variant
                  </button>
                </div>
                
                <div v-if="form.variants.length === 0" class="text-center py-6 text-gray-500">
                  <svg class="w-10 h-10 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v.01"></path>
                  </svg>
                  <p class="text-xs">No variants added yet. Click "Add Variant" to get started.</p>
                </div>
                
                <div v-else class="space-y-4">
                  <div class="grid grid-cols-12 gap-3 text-xs font-semibold text-gray-600 px-4">
                    <div class="col-span-3">Color</div>
                    <div class="col-span-3">Size</div>
                    <div class="col-span-2">Price</div>
                    <div class="col-span-2">Stock</div>
                    <div class="col-span-2">Action</div>
                  </div>
                  
                  <div v-for="(variant, idx) in form.variants" :key="idx" class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div class="grid grid-cols-12 gap-3 items-center">
                      <div class="col-span-3">
                        <input 
                          v-model="variant.color" 
                          type="text" 
                          placeholder="Color" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                        />
                      </div>
                      <div class="col-span-3">
                        <input 
                          v-model="variant.size" 
                          type="text" 
                          placeholder="Size" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                        />
                      </div>
                      <div class="col-span-2">
                        <div class="relative">
                          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                          <input 
                            v-model.number="variant.price" 
                            type="number" 
                            step="0.01" 
                            placeholder="0.00" 
                            class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                          />
                        </div>
                      </div>
                      <div class="col-span-2">
                        <input 
                          v-model.number="variant.stock" 
                          type="number" 
                          placeholder="Stock" 
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                        />
                      </div>
                      <div class="col-span-2">
                        <button 
                          @click="removeVariant(idx)" 
                          type="button" 
                          class="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm flex items-center justify-center gap-1"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                :disabled="productsStore.loading"
                class="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <svg v-if="productsStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ showEditModal ? 'Update Product' : 'Create Product' }}
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
import { ref, onMounted, watch, computed } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCategoriesStore } from '../stores/categories'
import { useAuthStore } from '../stores/auth'
import { useCurrencyStore } from '../stores/currency'
import { usePermissionDialog } from '../composables/usePermissionDialog'
import { showCreateSuccess, showUpdateSuccess, showDeleteSuccess, showActionFailed } from '../utils/toast'
import { showDeleteConfirm } from '../utils/confirm'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import Avatar from '../components/ui/Avatar.vue'
import PermissionDialog from '../components/feature/PermissionDialog.vue'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const currencyStore = useCurrencyStore()

// Permission dialog
const { 
  showPermissionDialog, 
  permissionDialogData, 
  checkActionPermission, 
  closePermissionDialog, 
  handleGoBack
} = usePermissionDialog()

// Computed properties for hierarchical category selection
const parentCategories = computed(() => categoriesStore.parentCategories)
const subCategories = computed(() => {
  if (!form.value.category) return []
  
  return categoriesStore.categories.filter(cat => {
    if (!cat.parent) return false
    // Handle both cases: when parent is an object or just an ID
    const parentId = typeof cat.parent === 'object' ? cat.parent._id : cat.parent
    return parentId === form.value.category
  })
})

// Function to handle category change
const handleCategoryChange = () => {
  form.value.subCategory = ''
}

// Function to get category name by ID
const getCategoryName = (categoryId) => {
  if (!categoryId) return ''
  const category = categoriesStore.categories.find(cat => cat._id === categoryId)
  return category ? category.name : 'Unknown Category'
}

// Function to get category ID from category object or ID
const getCategoryId = (category) => {
  if (!category) return ''
  return typeof category === 'object' ? category._id : category
}

// Function to truncate description to first 2 words
const truncateDescription = (description) => {
  if (!description) return ''
  const words = description.split(' ')
  if (words.length <= 2) return description
  return words.slice(0, 2).join(' ') + '...'
}

// Computed properties for stats
const featuredProductsCount = computed(() => {
  return productsStore.products.filter(product => product.featured).length
})

const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingProduct = ref(null)
const successMessage = ref('')
const viewMode = ref('table') // 'table' or 'cards'

const filters = ref({
  search: '',
  status: ''
})

const form = ref({
  name: '',
  description: '',
  category: '',
  subCategory: '',
  price: '',
  stock: '',
  status: 'active',
  image: '',
  images: [],
  featured: false,
  variants: []
})



const checkCreatePermission = () => {
  if (checkActionPermission('create', 'products')) {
    showCreateModal.value = true
  }
}

const checkEditPermission = () => {
  return checkActionPermission('edit', 'products')
}

const checkDeletePermission = () => {
  return checkActionPermission('delete', 'products')
}

const editProduct = (product) => {
  if (!checkEditPermission()) return
  
  editingProduct.value = product
  
  form.value = { 
    ...product,
    category: getCategoryId(product.category),
    subCategory: getCategoryId(product.subCategory),
    images: product.images || [],
    featured: product.featured || false,
    variants: product.variants || []
  }
  
  showEditModal.value = true
}

const deleteProduct = async (id) => {
  if (!checkDeletePermission()) return
  
  showDeleteConfirm('product', async () => {
    try {
      const result = await productsStore.deleteProduct(id)
      if (result.success) {
        await fetchProducts()
        showDeleteSuccess('Product')
      } else {
        showActionFailed('Delete product', result.error)
      }
    } catch (error) {
      showActionFailed('Delete product')
    }
  })
}

const handleSubmit = async () => {
  try {
    // Client-side validation
    if (!form.value.category) {
      showActionFailed('Create product', 'Main category is required')
      return
    }
    
    if (!form.value.subCategory) {
      showActionFailed('Create product', 'Sub category is required')
      return
    }
    
    if (showEditModal.value) {
      const result = await productsStore.updateProduct(editingProduct.value._id, form.value)
      if (result.success) {
        closeModal()
        await fetchProducts()
        showUpdateSuccess('Product')
      } else {
        showActionFailed('Update product', result.error)
      }
    } else {
      const result = await productsStore.createProduct(form.value)
      if (result.success) {
        closeModal()
        await fetchProducts()
        showCreateSuccess('Product')
      } else {
        showActionFailed('Create product', result.error)
      }
    }
  } catch (error) {
    
    showActionFailed('Save product')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingProduct.value = null
  form.value = {
    name: '',
    description: '',
    category: '',
    subCategory: '',
    price: '',
    stock: '',
    status: 'active',
    image: '',
    images: [],
    featured: false,
    variants: []
  }
}

const fetchProducts = () => {
  const params = {}
  if (filters.value.search) params.search = filters.value.search
  if (filters.value.status) params.status = filters.value.status
  
  productsStore.fetchProducts(params)
}

watch(filters, fetchProducts, { deep: true })

// Watch for categories to be loaded and update form if editing
watch(() => categoriesStore.categories, (newCategories) => {
  if (newCategories.length > 0 && showEditModal.value && editingProduct.value) {
    // Re-set the form with proper category IDs
    form.value.category = getCategoryId(editingProduct.value.category)
    form.value.subCategory = getCategoryId(editingProduct.value.subCategory)
  }
}, { immediate: true })

  onMounted(async () => {
    try {
      const authStore = useAuthStore()
      
      if (!authStore.isAuthenticated) {
        return
      }
      
      await Promise.all([
        fetchProducts(),
        categoriesStore.fetchCategories()
      ])
    } catch (error) {

    }
  })

const addVariant = () => {
  form.value.variants.push({ color: '', size: '', price: '', stock: '' })
}
const removeVariant = (idx) => {
  form.value.variants.splice(idx, 1)
}
</script> 
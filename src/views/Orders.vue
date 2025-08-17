<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your customer orders</p>
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
            placeholder="Search orders..."
            class="input-field"
          />
        </div>
        <div class="flex gap-2">
          <select v-model="filters.status" class="input-field">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            v-model="filters.date"
            type="date"
            class="input-field"
          />
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card">
      <LoadingSpinner v-if="ordersStore.loading" message="Loading orders..." />
      
      <div v-else-if="ordersStore.error" class="text-center py-8">
        <div class="mb-4">
          <svg class="w-12 h-12 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">Error loading orders</p>
        <p class="text-sm text-red-600 mb-4">{{ ordersStore.error }}</p>
        <button
          @click="fetchOrders"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
      
      <div v-else-if="ordersStore.orders.length === 0" class="text-center py-8 text-gray-500">
        <div class="mb-4">
          <svg class="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No orders found</p>
        <p class="text-sm text-gray-600">Orders will appear here when customers place them</p>
      </div>
      
      <div v-else class="overflow-x-auto">
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
                Items
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in ordersStore.orders" :key="order._id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order._id.slice(-8) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Avatar
                    :src="order.customer?.avatar"
                    :name="order.userName"
                    size="sm"
                  />
                  <div class="ml-3">
                    <div class="text-sm text-gray-900">{{ order.userName }}</div>
                    <div class="text-sm text-gray-500">{{ order.userEmail }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center space-x-2">
                  <span>{{ order.items.length }} items</span>
                  <div v-if="orderHasVariants(order)" class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    Variants
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ currencyStore.formatPrice(order.total) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="order.status"
                  @change="updateOrderStatus(order._id, 'status', $event.target.value)"
                  :class="[
                    'text-sm border-0 bg-transparent cursor-pointer',
                    'hover:bg-gray-50 rounded px-2 py-1 transition-colors',
                    {
                      'text-yellow-600': order.status === 'pending',
                      'text-blue-600': order.status === 'processing',
                      'text-purple-600': order.status === 'shipped',
                      'text-green-600': order.status === 'delivered',
                      'text-red-600': order.status === 'cancelled'
                    }
                  ]"
                >
                  <option value="pending" class="text-yellow-600">Pending</option>
                  <option value="processing" class="text-blue-600">Processing</option>
                  <option value="shipped" class="text-purple-600">Shipped</option>
                  <option value="delivered" class="text-green-600">Delivered</option>
                  <option value="cancelled" class="text-red-600">Cancelled</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="order.paymentStatus"
                  @change="updateOrderStatus(order._id, 'paymentStatus', $event.target.value)"
                  :class="[
                    'text-sm border-0 bg-transparent cursor-pointer',
                    'hover:bg-gray-50 rounded px-2 py-1 transition-colors',
                    {
                      'text-yellow-600': order.paymentStatus === 'pending',
                      'text-green-600': order.paymentStatus === 'paid',
                      'text-red-600': order.paymentStatus === 'failed',
                      'text-blue-600': order.paymentStatus === 'refunded',
                      'text-orange-600': order.paymentStatus === 'partially_refunded'
                    }
                  ]"
                >
                  <option value="pending" class="text-yellow-600">Pending</option>
                  <option value="paid" class="text-green-600">Paid</option>
                  <option value="failed" class="text-red-600">Failed</option>
                  <option value="refunded" class="text-blue-600">Refunded</option>
                  <option value="partially_refunded" class="text-orange-600">Partially Refunded</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewOrder(order)"
                  class="text-primary-600 hover:text-primary-900"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div
      v-if="selectedOrder"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      @click="selectedOrder = null"
    >
      <div class="relative mx-auto border w-full max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto" @click.stop>
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-gray-900">
              Order Details - {{ selectedOrder.orderNumber }}
          </h3>
            <button
              @click="selectedOrder = null"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Customer Information -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Customer Information
                  </h4>
                  <button
                    @click="copySection('customer')"
                    class="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    title="Copy entire customer section"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Name:</span>
                    <span class="text-sm text-gray-900">{{ selectedOrder.userName }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Email:</span>
                    <span class="text-sm text-gray-900">{{ selectedOrder.userEmail }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Phone:</span>
                    <span class="text-sm text-gray-900">{{ selectedOrder.customer?.phone || 'N/A' }}</span>
                  </div>
                </div>
            </div>
            
              <!-- Order Information -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Order Information
                  </h4>
                  <button
                    @click="copySection('order')"
                    class="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    title="Copy entire order section"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Order Number:</span>
                    <span class="text-sm text-gray-900 font-mono">{{ selectedOrder.orderNumber }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Status:</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="{
                            'bg-yellow-100 text-yellow-800': selectedOrder.status === 'pending',
                            'bg-blue-100 text-blue-800': selectedOrder.status === 'processing',
                            'bg-purple-100 text-purple-800': selectedOrder.status === 'shipped',
                            'bg-green-100 text-green-800': selectedOrder.status === 'delivered',
                            'bg-red-100 text-red-800': selectedOrder.status === 'cancelled'
                          }">
                      {{ selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Payment Status:</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="{
                            'bg-yellow-100 text-yellow-800': selectedOrder.paymentStatus === 'pending',
                            'bg-green-100 text-green-800': selectedOrder.paymentStatus === 'paid',
                            'bg-red-100 text-red-800': selectedOrder.paymentStatus === 'failed',
                            'bg-blue-100 text-blue-800': selectedOrder.paymentStatus === 'refunded'
                          }">
                      {{ selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Payment Method:</span>
                    <span class="text-sm text-gray-900">{{ selectedOrder.paymentMethod?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Created:</span>
                    <span class="text-sm text-gray-900">{{ formatDate(selectedOrder.createdAt) }}</span>
                  </div>
                </div>
            </div>
            
              <!-- Shipping Information -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Shipping Information
                  </h4>
                  <button
                    @click="copySection('shipping')"
                    class="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    title="Copy entire shipping section"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
              <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Method:</span>
                    <span class="text-sm text-gray-900">{{ selectedOrder.shippingMethod?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Standard' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Charge:</span>
                    <span class="text-sm text-gray-900">{{ currencyStore.formatPrice(selectedOrder.shippingCharge || 0) }}</span>
                  </div>
                  <div v-if="selectedOrder.shippingAddress" class="mt-3">
                    <div class="text-sm text-gray-600 space-y-2">
                      <div class="flex justify-between">
                        <span class="font-medium">Name:</span>
                        <span>{{ selectedOrder.shippingAddress.fullName || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="font-medium">Phone:</span>
                        <span>{{ selectedOrder.shippingAddress.phoneNumber || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="font-medium">Address:</span>
                        <span class="text-right">
                          {{ selectedOrder.shippingAddress.streetAddress || 'N/A' }}<br>
                          {{ selectedOrder.shippingAddress.city || 'N/A' }}, {{ selectedOrder.shippingAddress.state || 'N/A' }}<br>
                          {{ selectedOrder.shippingAddress.postalCode || 'N/A' }}, {{ selectedOrder.shippingAddress.country || 'N/A' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Order Items with Product Details -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    Order Items ({{ selectedOrder.items?.length || 0 }})
                  </h4>
                  
                  <!-- Variant Summary -->
                  <div v-if="hasVariants" class="text-xs text-gray-600 bg-orange-50 px-2 py-1 rounded flex items-center">
                    <svg class="w-3 h-3 mr-1 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ variantCount }} items with color/size variants
                  </div>
                  <button
                    @click="copySection('products')"
                    class="p-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    title="Copy entire products section"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
                <div class="space-y-4">
                  <div
                    v-for="(item, index) in selectedOrder.items"
                    :key="index"
                    class="border border-gray-200 rounded-lg p-3 bg-white"
                  >
                    <!-- Product Header -->
                    <div class="flex items-center justify-between mb-2">
                      <h5 class="font-medium text-gray-900">{{ item.name || item.title || 'Product Name N/A' }}</h5>
                      <span class="text-sm text-gray-500">Qty: {{ item.quantity || item.qty }}</span>
                    </div>
                    
                    <!-- Product Image (if available) -->
                    <div v-if="item.image || item.images" class="mb-2">
                      <img 
                        :src="item.image || item.images?.[0]" 
                        :alt="item.name || item.title"
                        class="w-16 h-16 object-cover rounded border"
                      />
                    </div>
                    
                    <!-- Product Details -->
                    <div class="grid grid-cols-2 gap-2 text-sm">
                      <!-- Variants Section (if color or size exists) -->
                      <div v-if="item.color || item.size" class="col-span-2 mb-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded border-l-4 border-blue-400">
                        <div class="text-xs font-medium text-gray-700 mb-1">Product Variants:</div>
                        <div class="flex flex-wrap gap-2">
                          <div v-if="item.color" class="flex items-center space-x-1">
                            <span class="text-xs text-gray-600">Color:</span>
                            <span class="text-xs bg-gray-100 px-2 py-1 rounded font-medium text-gray-900">{{ item.color }}</span>
                          </div>
                          <div v-if="item.size" class="flex items-center space-x-1">
                            <span class="text-xs text-gray-600">Size:</span>
                            <span class="text-xs bg-blue-100 px-2 py-1 rounded font-medium text-gray-900">{{ item.size }}</span>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Variant information (if it exists) -->
                      <div v-if="item.variant" class="flex justify-between">
                        <span class="font-medium text-gray-600">Variant:</span>
                        <span class="text-gray-900">{{ item.variant }}</span>
                      </div>
                      
                      <!-- MacBook Pro specific fields -->
                      <div v-if="item.storage" class="flex justify-between">
                        <span class="font-medium text-gray-600">Storage:</span>
                        <span class="text-gray-900">{{ item.storage }}</span>
                      </div>
                      <div v-if="item.ram" class="flex justify-between">
                        <span class="font-medium text-gray-600">RAM:</span>
                        <span class="text-gray-900">{{ item.ram }}</span>
                      </div>
                      
                      <!-- Magic Mouse specific fields -->
                      <div v-if="item.type" class="flex justify-between">
                        <span class="font-medium text-gray-600">Type:</span>
                        <span class="text-gray-900">{{ item.type }}</span>
                      </div>
                      <div v-if="item.battery" class="flex justify-between">
                        <span class="font-medium text-gray-600">Battery:</span>
                        <span class="text-gray-900">{{ item.battery }}</span>
                      </div>
                      
                      <!-- Product identifiers -->
                      <div v-if="item.sku" class="flex justify-between">
                        <span class="font-medium text-gray-600">SKU:</span>
                        <span class="text-gray-900 font-mono text-xs">{{ item.sku }}</span>
                      </div>
                      
                      <!-- Common fields -->
                      <div class="flex justify-between">
                        <span class="font-medium text-gray-600">Unit Price:</span>
                        <span class="text-gray-900">{{ currencyStore.formatPrice(item.price || item.cost || 0) }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="font-medium text-gray-600">Total:</span>
                        <span class="text-gray-900 font-semibold">{{ currencyStore.formatPrice(item.total || item.amount || 0) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Financial Summary -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    Financial Summary
                  </h4>
                  <button
                    @click="copySection('financial')"
                    class="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    title="Copy entire financial section"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Subtotal:</span>
                    <span class="text-sm text-gray-900">{{ currencyStore.formatPrice(selectedOrder.subtotal || 0) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm font-medium text-gray-600">Shipping:</span>
                    <span class="text-sm text-gray-900">{{ currencyStore.formatPrice(selectedOrder.shippingCharge || 0) }}</span>
                  </div>
                  <div class="border-t pt-2 mt-2">
                    <div class="flex justify-between">
                      <span class="text-lg font-semibold text-gray-900">Total:</span>
                      <span class="text-lg font-bold text-green-600">{{ currencyStore.formatPrice(selectedOrder.total || 0) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div v-if="selectedOrder.notes" class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Notes
                  </h4>
                  <button
                    @click="copySection('notes')"
                    class="p-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                    title="Copy entire notes section"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-sm text-gray-700">{{ selectedOrder.notes }}</p>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useOrdersStore } from '../stores/orders'
import { useCurrencyStore } from '../stores/currency'
import { showUpdateSuccess, showActionFailed } from '../utils/toast'
import { showConfirmDialog } from '../utils/confirm'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import Avatar from '../components/ui/Avatar.vue'

const ordersStore = useOrdersStore()
const currencyStore = useCurrencyStore()

const selectedOrder = ref(null)

const filters = ref({
  search: '',
  status: '',
  date: ''
})

// Computed properties for variant information
const hasVariants = computed(() => {
  if (!selectedOrder.value?.items) return false
  return selectedOrder.value.items.some(item => item.color || item.size)
})

const variantCount = computed(() => {
  if (!selectedOrder.value?.items) return 0
  return selectedOrder.value.items.filter(item => item.color || item.size).length
})

// Function to check if an order has variants
const orderHasVariants = (order) => {
  if (!order?.items) return false
  return order.items.some(item => item.color || item.size)
}

const viewOrder = (order) => {
  selectedOrder.value = order
}

const updateOrderStatus = async (orderId, field, value) => {
  const fieldName = field === 'status' ? 'Order Status' : 'Payment Status'
  const fieldValue = field === 'status' ? value : value
  
  showConfirmDialog({
    title: `Update ${fieldName}?`,
    text: `Are you sure you want to change the ${fieldName.toLowerCase()} to "${fieldValue}"?`,
    icon: 'question',
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3b82f6'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const result = await ordersStore.updateOrderStatus(orderId, field, value)
        if (result.success) {
          // Only show the backend message, no duplicate frontend message
          if (result.message) {
            showUpdateSuccess(result.message)
          }
          // Refresh orders to get updated data
          fetchOrders()
        } else {
          showActionFailed(`Update ${fieldName.toLowerCase()}`, result.error)
        }
      } catch (error) {
        showActionFailed(`Update ${fieldName.toLowerCase()}`)
      }
    }
  })
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showUpdateSuccess('Copied to clipboard')
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    showUpdateSuccess('Copied to clipboard')
  }
}

const copySection = async (sectionType) => {
  let text = ''
  
  switch (sectionType) {
    case 'customer':
      text = `Customer Information:\n` +
             `Name: ${selectedOrder.value.userName}\n` +
             `Email: ${selectedOrder.value.userEmail}\n` +
             `Phone: ${selectedOrder.value.customer?.phone || 'N/A'}`
      break
    case 'order':
      text = `Order Information:\n` +
             `Order Number: ${selectedOrder.value.orderNumber}\n` +
             `Status: ${selectedOrder.value.status}\n` +
             `Payment Status: ${selectedOrder.value.paymentStatus}\n` +
             `Payment Method: ${selectedOrder.value.paymentMethod || 'N/A'}\n` +
             `Created: ${formatDate(selectedOrder.value.createdAt)}`
      break
    case 'shipping':
      if (selectedOrder.value.shippingAddress) {
        text = `Shipping Information:\n` +
               `Name: ${selectedOrder.value.shippingAddress.fullName || 'N/A'}\n` +
               `Phone: ${selectedOrder.value.shippingAddress.phoneNumber || 'N/A'}\n` +
               `Address: ${selectedOrder.value.shippingAddress.streetAddress || 'N/A'}, ${selectedOrder.value.shippingAddress.city || 'N/A'}, ${selectedOrder.value.shippingAddress.state || 'N/A'}, ${selectedOrder.value.shippingAddress.postalCode || 'N/A'}, ${selectedOrder.value.shippingAddress.country || 'N/A'}`
      }
      break
    case 'products':
      text = `Product Items:\n`
      selectedOrder.value.items?.forEach((item, index) => {
        text += `\n${index + 1}. ${item.name || item.title || 'Product Name N/A'}\n` +
                `   Quantity: ${item.quantity || item.qty}\n` +
                `   Unit Price: ${currencyStore.formatPrice(item.price || item.cost || 0)}\n` +
                `   Total: ${currencyStore.formatPrice(item.total || item.amount || 0)}`
        if (item.sku) text += `\n   SKU: ${item.sku}`
        if (item.color) text += `\n   Color: ${item.color}`
        if (item.size) text += `\n   Size: ${item.size}`
        if (item.variant) text += `\n   Variant: ${item.variant}`
        if (item.storage) text += `\n   Storage: ${item.storage}`
        if (item.ram) text += `\n   RAM: ${item.ram}`
        if (item.type) text += `\n   Type: ${item.type}`
        if (item.battery) text += `\n   Battery: ${item.battery}`
      })
      break
    case 'financial':
      text = `Financial Summary:\n` +
             `Subtotal: ${currencyStore.formatPrice(selectedOrder.value.subtotal || 0)}\n` +
             `Shipping: ${currencyStore.formatPrice(selectedOrder.value.shippingCharge || 0)}\n` +
             `Total: ${currencyStore.formatPrice(selectedOrder.value.total || 0)}`
      break
    case 'notes':
      if (selectedOrder.value.notes) {
        text = `Notes:\n${selectedOrder.value.notes}`
      }
      break
  }
  
  if (text) {
    await copyToClipboard(text)
  }
}

const fetchOrders = () => {
  const params = {}
  if (filters.value.search) params.search = filters.value.search
  if (filters.value.status) params.status = filters.value.status
  if (filters.value.date) params.date = filters.value.date
  
  ordersStore.fetchOrders(params)
}

watch(filters, fetchOrders, { deep: true })

onMounted(() => {
  fetchOrders()
})
</script> 
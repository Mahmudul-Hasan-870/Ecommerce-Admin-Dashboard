<template>
  <div v-if="show" class="fixed inset-0 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
    <div class="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden" @click.stop>
      <!-- Modal Header -->
      <div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold text-white">Access Denied</h3>
              <p class="text-red-100 text-sm">You don't have permission to access this feature</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
            </svg>
          </div>
          
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ title }}
          </h3>
          
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {{ message }}
          </p>



          <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
            <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Your Current Role:</h4>
            <div class="flex items-center justify-center">
              <span :class="[
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                {
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': userRole === 'admin',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': userRole === 'manager',
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': userRole === 'editor',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': userRole === 'viewer',
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200': userRole === 'staff'
                }
              ]">
                {{ userRole }}
              </span>
            </div>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="flex justify-center">
          <button
            @click="goBack"
            class="btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Access Denied'
  },
  message: {
    type: String,
    default: 'You don\'t have the required permissions to access this feature.'
  },
  requiredPermissions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'goBack'])

const authStore = useAuthStore()

const userRole = computed(() => authStore.user?.role || 'unknown')



const goBack = () => {
  emit('goBack')
}
</script> 
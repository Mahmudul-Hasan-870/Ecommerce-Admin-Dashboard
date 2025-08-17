<template>
  <div class="flex items-center">
    <div v-if="src && src !== 'https://via.placeholder.com/40x40'" class="relative">
      <img
        :src="src"
        :alt="name"
        :class="[
          'rounded-full object-cover',
          sizeClasses[size]
        ]"
        @error="handleImageError"
      />
      <div v-if="showBadge && badgeCount > 0" class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {{ badgeCount }}
      </div>
    </div>
    <div v-else class="relative">
      <div
        :class="[
          'rounded-full flex items-center justify-center text-white font-semibold',
          sizeClasses[size],
          getRandomBackgroundColor(name)
        ]"
      >
        {{ getInitial(name) }}
      </div>
      <div v-if="showBadge && badgeCount > 0" class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {{ badgeCount }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  badgeCount: {
    type: Number,
    default: 0
  }
})

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
}

const backgroundColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500'
]

const getInitial = (name) => {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

const getRandomBackgroundColor = (name) => {
  if (!name) return backgroundColors[0]
  
  // Use the name to generate a consistent color for the same person
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const index = Math.abs(hash) % backgroundColors.length
  return backgroundColors[index]
}

const handleImageError = () => {
  // If image fails to load, we'll show the initial instead
  // This is handled by the v-if condition above
}
</script> 
import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  }),

  getters: {
    totalProducts: (state) => state.products.length,
    activeProducts: (state) => state.products.filter(p => p.status === 'active'),
    lowStockProducts: (state) => state.products.filter(p => p.stock < 10)
  },

  actions: {
    async fetchProducts(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/products', { params })
        this.products = response.data.products
        this.pagination = response.data.pagination || { page: 1, limit: 10, total: this.products.length }
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch products'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      this.loading = true
      this.error = null
      
      try {
        // Handle multiple images
        if (productData.images && productData.images.length > 0) {
          // If images is an array of files, convert to URLs
          if (productData.images[0] instanceof File) {
            // In a real app, you would upload these files to a server
            // For now, we'll use placeholder URLs
            productData.images = productData.images.map((_, index) => 
              `https://via.placeholder.com/400x400?text=Image+${index + 1}`
            )
          }
        }
        
        const response = await api.post('/products', productData)
        this.products.unshift(response.data)
        return { success: true, product: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create product'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id, productData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.put(`/products/${id}`, productData)
        const index = this.products.findIndex(p => p._id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        return { success: true, product: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update product'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.loading = true
      this.error = null
      
      try {
        await api.delete(`/products/${id}`)
        this.products = this.products.filter(p => p._id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete product'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async getProduct(id) {
      try {
        const response = await api.get(`/products/${id}`)
        return { success: true, product: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch product'
        return { success: false, error: this.error }
      }
    }
  }
}) 
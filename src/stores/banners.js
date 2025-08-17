import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useBannersStore = defineStore('banners', {
  state: () => ({
    banners: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    },
    stats: {
      totalBanners: 0,
      activeBanners: 0,
      inactiveBanners: 0,
      regularBanners: 0,
      promotionalBanners: 0
    }
  }),

  getters: {
    totalBanners: (state) => state.banners.length,
    activeBanners: (state) => state.banners.filter(b => b.status === 'active'),
    inactiveBanners: (state) => state.banners.filter(b => b.status === 'inactive'),
    regularBanners: (state) => state.banners.filter(b => b.type === 'regular'),
    promotionalBanners: (state) => state.banners.filter(b => b.type === 'promotional'),
    bannersByType: (state) => (type) => state.banners.filter(b => b.type === type)
  },

  actions: {
    async fetchBanners(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/banners', { params })
        this.banners = response.data.banners
        this.pagination = response.data.pagination || { page: 1, limit: 10, total: this.banners.length }
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch banners'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchBannerStats() {
      try {
        const response = await api.get('/banners/stats/overview')
        this.stats = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch banner stats'
        return { success: false, error: this.error }
      }
    },

    async createBanner(bannerData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/banners', bannerData)
        this.banners.unshift(response.data)
        return { success: true, banner: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create banner'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateBanner(id, bannerData) {
      this.loading = true
      this.error = null
      
      try {
        // Validate ID format
        if (!id || typeof id !== 'string' || id.trim() === '') {
          throw new Error('Invalid banner ID')
        }
        
        // Validate banner data
        if (!bannerData || typeof bannerData !== 'object') {
          throw new Error('Invalid banner data')
        }
        
        const response = await api.put(`/banners/${id.trim()}`, bannerData)
        const index = this.banners.findIndex(b => b._id === id)
        if (index !== -1) {
          this.banners[index] = response.data
        }
        return { success: true, banner: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to update banner'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async deleteBanner(id) {
      this.loading = true
      this.error = null
      
      try {
        // Validate ID format
        if (!id || typeof id !== 'string' || id.trim() === '') {
          throw new Error('Invalid banner ID')
        }
        
        await api.delete(`/banners/${id.trim()}`)
        this.banners = this.banners.filter(b => b._id !== id)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to delete banner'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async bulkOperations(operation, bannerIds) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/banners/bulk', { operation, bannerIds })
        
        // Refresh banners after bulk operation
        await this.fetchBanners()
        
        return { success: true, message: response.data.message }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to perform bulk operation'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async getBanner(id) {
      try {
        // Validate ID format
        if (!id || typeof id !== 'string' || id.trim() === '') {
          throw new Error('Invalid banner ID')
        }
        
        const response = await api.get(`/banners/${id.trim()}`)
        return { success: true, banner: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to fetch banner'
        return { success: false, error: this.error }
      }
    },

    async getActiveBannersByType(type) {
      try {
        const response = await api.get(`/banners/active/${type}`)
        return { success: true, banners: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch active banners'
        return { success: false, error: this.error }
      }
    }
  }
}) 
import { defineStore } from 'pinia'
import api from '../utils/axios'
import { showCreateSuccess, showUpdateSuccess, showDeleteSuccess, showActionFailed } from '../utils/toast'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    categoryTree: [],
    selectedCategory: null,
    loading: false,
    error: null,
    stats: {
      total: 0,
      active: 0,
      inactive: 0,
      parent: 0,
      sub: 0
    }
  }),

  getters: {
    activeCategories: (state) => state.categories.filter(cat => cat.isActive),
    parentCategories: (state) => state.categories.filter(cat => !cat.parent),
    subCategories: (state) => state.categories.filter(cat => cat.parent),
    getCategoryById: (state) => (id) => state.categories.find(cat => cat._id === id),
    getCategoryPath: (state) => (categoryId) => {
      const category = state.categories.find(cat => cat._id === categoryId)
      if (!category) return []
      
      const path = [category]
      let current = category
      
      while (current.parent) {
        const parent = state.categories.find(cat => cat._id === current.parent._id || cat._id === current.parent)
        if (parent) {
          path.unshift(parent)
          current = parent
        } else {
          break
        }
      }
      
      return path
    }
  },

  actions: {
    // Fetch all categories
    async fetchCategories(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/categories', { params })
        this.categories = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch categories'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Fetch category tree
    async fetchCategoryTree(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/categories/tree', { params })
        this.categoryTree = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch category tree'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Fetch single category
    async fetchCategory(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get(`/categories/${id}`)
        this.selectedCategory = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch category'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Create category
    async createCategory(categoryData) {
      this.loading = true
      this.error = null
      try {
        await api.post('/categories', categoryData)
        showCreateSuccess('Category')
        await this.fetchCategories()
        await this.fetchCategoryStats()
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create category'
        showActionFailed('Create Category', this.error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Update category
    async updateCategory(id, categoryData) {
      this.loading = true
      this.error = null
      try {
        await api.put(`/categories/${id}`, categoryData)
        showUpdateSuccess('Category')
        await this.fetchCategories()
        await this.fetchCategoryStats()
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update category'
        showActionFailed('Update Category', this.error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Delete category
    async deleteCategory(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/categories/${id}`)
        showDeleteSuccess('Category')
        await this.fetchCategories()
        await this.fetchCategoryStats()
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete category'
        showActionFailed('Delete Category', this.error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Bulk operations
    async bulkUpdate(ids, action, data = {}) {
      this.loading = true
      this.error = null
      try {
        await api.post('/categories/bulk', { ids, action, data })
        showUpdateSuccess('Categories')
        await this.fetchCategories()
        await this.fetchCategoryStats()
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to perform bulk operation'
        showActionFailed('Bulk Update', this.error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Fetch category statistics
    async fetchCategoryStats() {
      try {
        const response = await api.get('/categories/stats')
        this.stats = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch category statistics'
        return { success: false, error: this.error }
      }
    },

    // Clear selected category
    clearSelectedCategory() {
      this.selectedCategory = null
    },

    // Set selected category
    setSelectedCategory(category) {
      this.selectedCategory = category
    }
  }
}) 
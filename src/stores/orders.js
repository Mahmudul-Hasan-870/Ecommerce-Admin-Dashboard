import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    }
  }),

  getters: {
    totalOrders: (state) => state.orders.length,
    pendingOrders: (state) => state.orders.filter(o => o.status === 'pending'),
    deliveredOrders: (state) => state.orders.filter(o => o.status === 'delivered'),
    totalRevenue: (state) => state.orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0)
  },

  actions: {
    async fetchOrders(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/orders', { params })
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch orders'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(id, field, value) {
      this.loading = true
      this.error = null
      
      try {
        // Use the correct API endpoints based on the field
        let endpoint = `/orders/${id}`
        let data = { [field]: value }
        
        // For status updates, use the specific status endpoint
        if (field === 'status') {
          endpoint = `/orders/${id}/status`
          data = { status: value }
        }
        // For payment status updates, use the specific payment status endpoint
        else if (field === 'paymentStatus') {
          endpoint = `/orders/${id}/paymentStatus`
          data = { paymentStatus: value }
        }
        
        const response = await api.put(endpoint, data)
        const index = this.orders.findIndex(o => o._id === id)
        if (index !== -1) {
          this.orders[index] = response.data
        }
        // Return the success status and the order data
        return { success: true, order: response.data, message: response.data.message }
      } catch (error) {
        this.error = error.response?.data?.message || `Failed to update order ${field}`
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async getOrder(id) {
      try {
        const response = await api.get(`/orders/${id}`)
        return { success: true, order: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch order'
        return { success: false, error: this.error }
      }
    },

    async getOrderStats() {
      try {
        const response = await api.get('/orders/stats/overview')
        return { success: true, stats: response.data }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch order stats'
        return { success: false, error: this.error }
      }
    }
  }
}) 
import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  }),

  getters: {
    lowStockNotifications: (state) => 
      state.notifications.filter(n => n.type === 'low_stock'),
    newOrderNotifications: (state) => 
      state.notifications.filter(n => n.type === 'new_order'),
    highPriorityNotifications: (state) => 
      state.notifications.filter(n => n.priority === 'high')
  },

  actions: {
    async fetchNotifications() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/notifications')
        this.notifications = response.data.notifications
        this.unreadCount = response.data.unreadCount
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch notifications'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async markAsRead(notificationId) {
      try {
        const notification = this.notifications.find(n => n.id === notificationId)
        
        if (notification) {
          // Send request to mark as read with notification details
          await api.patch(`/notifications/${notificationId}/read`, {
            type: notification.type,
            relatedId: notification.id,
            relatedModel: notification.type === 'low_stock' ? 'Product' : 'Order'
          })
        } else {
          // If notification not found in local state, just send the request
          await api.patch(`/notifications/${notificationId}/read`)
        }
        
        // Remove from local state
        this.notifications = this.notifications.filter(n => n.id !== notificationId)
        this.unreadCount = Math.max(0, this.unreadCount - 1)
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to mark notification as read'
        return { success: false, error: this.error }
      }
    },

    async markAllAsRead() {
      try {
        // Send current notifications to mark them as dismissed
        await api.patch('/notifications/mark-all-read', {
          notifications: this.notifications
        })
        
        this.notifications = []
        this.unreadCount = 0
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to mark all notifications as read'
        return { success: false, error: this.error }
      }
    }
  }
}) 
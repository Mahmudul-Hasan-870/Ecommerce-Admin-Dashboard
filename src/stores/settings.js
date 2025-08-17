import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      siteName: 'Admin Panel',
      siteDescription: 'Modern admin panel for e-commerce',
      currency: 'USD',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      itemsPerPage: 10,
          notifications: {
      email: true,
      push: true
    },
      theme: {
        primaryColor: '#00473E',
        secondaryColor: '#6B7280',
        darkMode: false
      }
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchSettings() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/settings')
        this.settings = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch settings'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateSettings(settingsData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.put('/settings', settingsData)
        this.settings = { ...this.settings, ...settingsData }
        return { success: true, message: 'Settings updated successfully' }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update settings'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async updateSetting(key, value) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.put(`/settings/${key}`, { value })
        this.settings[key] = value
        return { success: true, message: 'Setting updated successfully' }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update setting'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async resetSettings() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/settings/reset')
        this.settings = response.data
        return { success: true, message: 'Settings reset to default' }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to reset settings'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    }
  }
}) 
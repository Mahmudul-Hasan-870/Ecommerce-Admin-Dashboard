import { defineStore } from 'pinia'
import api from '../utils/axios'
import { setAuthToken } from '../utils/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || 'user'
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/auth/login', credentials)
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        // Set default auth header
        setAuthToken(token)
        
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setAuthToken(null)
    },

    async checkAuth() {
      if (!this.token) return false
      
      try {
        const response = await api.get('/auth/me')
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        return true
      } catch (error) {
        this.logout()
        return false
      }
    },

    async refreshUserPermissions() {
      if (!this.token) return false
      
      try {
        const response = await api.get('/auth/me')
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to refresh permissions'
        return { success: false, error: this.error }
      }
    },

    async updateProfile(profileData) {
      try {
        const response = await api.put('/auth/profile', profileData)
        this.user = response.data
        return { success: true }
      } catch (error) {
        this.error = error.response?.data?.message || 'Update failed'
        return { success: false, error: this.error }
      }
    }
  }
}) 
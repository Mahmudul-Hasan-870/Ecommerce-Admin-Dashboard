import { defineStore } from 'pinia'
import api from '../utils/axios'

export const useCustomersStore = defineStore('customers', {
  state: () => ({
    customers: [],
    loading: false,
    error: null,
    filters: {
      search: '',
      status: ''
    }
  }),

  getters: {
    // Filter customers based on search and status
    filteredCustomers: (state) => {
      return state.customers.filter(customer => {
        const matchesSearch = !state.filters.search || 
          customer.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          customer.email.toLowerCase().includes(state.filters.search.toLowerCase())
        
        const matchesStatus = !state.filters.status || customer.status === state.filters.status
        
        return matchesSearch && matchesStatus
      })
    }
  },

  actions: {
    // Fetch all customers from the server
    async fetchCustomers(filters = {}) {
      this.loading = true
      this.error = null
      
      try {
        const params = new URLSearchParams()
        if (filters.search) params.append('search', filters.search)
        if (filters.status) params.append('status', filters.status)
        
        const response = await api.get(`/customers?${params.toString()}`)
        
        if (response.data.success) {
          this.customers = response.data.customers
        } else {
          this.error = response.data.message || 'Failed to fetch customers'
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to fetch customers'
        // Set empty array to prevent undefined errors
        this.customers = []
        
        // If authentication error, redirect to login
        if (error.response?.status === 401) {
          window.location.href = '/login'
        }
      } finally {
        this.loading = false
      }
    },

    // Create a new customer
    async createCustomer(customerData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/customers', customerData)
        
        if (response.data.success) {
          this.customers.push(response.data.customer)
          return { success: true, customer: response.data.customer }
        } else {
          this.error = response.data.message || 'Failed to create customer'
          return { success: false, error: response.data.message }
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create customer'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Update an existing customer
    async updateCustomer(customerId, customerData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.put(`/customers/${customerId}`, customerData)
        
        if (response.data.success) {
          const index = this.customers.findIndex(c => c._id === customerId)
          if (index !== -1) {
            this.customers[index] = response.data.customer
          }
          return { success: true, customer: response.data.customer }
        } else {
          this.error = response.data.message || 'Failed to update customer'
          return { success: false, error: response.data.message }
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update customer'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Delete a customer
    async deleteCustomer(customerId) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.delete(`/customers/${customerId}`)
        
        if (response.data.success) {
          this.customers = this.customers.filter(c => c._id !== customerId)
          return { success: true }
        } else {
          this.error = response.data.message || 'Failed to delete customer'
          return { success: false, error: response.data.message }
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete customer'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Get customer by ID
    getCustomerById(customerId) {
      return this.customers.find(c => c._id === customerId)
    },

    // Update filters
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
    }
  }
}) 
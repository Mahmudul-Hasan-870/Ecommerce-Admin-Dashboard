import api from './axios'

// Initialize auth headers on app startup
export function initializeAuth() {
  const token = localStorage.getItem('token')
  if (token) {
    // The api instance already handles token in the request interceptor
    // No need to manually set headers here
  }
}

// Set auth token
export function setAuthToken(token) {
  // The api instance handles token automatically in the request interceptor
  // This function is kept for compatibility but doesn't need to do anything
  // since the token is read from localStorage in the interceptor
}

// Check if user is authenticated
export function isAuthenticated() {
  const token = localStorage.getItem('token')
  return !!token
}

// Get current user
export function getCurrentUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
} 
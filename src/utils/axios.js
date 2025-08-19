import axios from 'axios'

// Determine base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.PROD && !import.meta.env.DEV) {
    // Production: Use direct API URL
    return 'https://ecommerce-backend-api-server-production.up.railway.app/api'
  } else {
    // Development & Preview: Use proxy
    return '/api'
  }
}

// Create axios instance
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
export const axiosInstance = api 
import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    currency: 'USD',
    symbol: '$',
    loading: false,
    error: null
  }),

  getters: {
    // Get currency symbol based on currency code
    currencySymbol: (state) => {
      const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'BDT': '৳',
        'INR': '₹',
        'JPY': '¥',
        'CAD': 'C$',
        'AUD': 'A$',
        'CHF': 'CHF',
        'CNY': '¥',
        'KRW': '₩',
        'SGD': 'S$',
        'HKD': 'HK$',
        'NZD': 'NZ$',
        'SEK': 'kr',
        'NOK': 'kr',
        'DKK': 'kr',
        'PLN': 'zł',
        'CZK': 'Kč',
        'HUF': 'Ft',
        'RUB': '₽',
        'TRY': '₺',
        'BRL': 'R$',
        'MXN': '$',
        'ZAR': 'R',
        'AED': 'د.إ',
        'SAR': 'ر.س',
        'THB': '฿',
        'MYR': 'RM',
        'IDR': 'Rp',
        'PHP': '₱',
        'VND': '₫'
      }
      return symbols[state.currency] || '$'
    },

    // Format amount with currency symbol
    formatAmount: (state) => (amount) => {
      const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'BDT': '৳',
        'INR': '₹',
        'JPY': '¥',
        'CAD': 'C$',
        'AUD': 'A$',
        'CHF': 'CHF',
        'CNY': '¥',
        'KRW': '₩',
        'SGD': 'S$',
        'HKD': 'HK$',
        'NZD': 'NZ$',
        'SEK': 'kr',
        'NOK': 'kr',
        'DKK': 'kr',
        'PLN': 'zł',
        'CZK': 'Kč',
        'HUF': 'Ft',
        'RUB': '₽',
        'TRY': '₺',
        'BRL': 'R$',
        'MXN': '$',
        'ZAR': 'R',
        'AED': 'د.إ',
        'SAR': 'ر.س',
        'THB': '฿',
        'MYR': 'RM',
        'IDR': 'Rp',
        'PHP': '₱',
        'VND': '₫'
      }
      const symbol = symbols[state.currency] || '$'
      
      // Handle null, undefined, or invalid amounts
      if (amount === null || amount === undefined || isNaN(amount)) {
        return `${symbol}0.00`
      }
      
      // Parse and format the amount
      const parsedAmount = parseFloat(amount)
      if (isNaN(parsedAmount)) {
        return `${symbol}0.00`
      }
      
      return `${symbol}${parsedAmount.toFixed(2)}`
    },

    // Get currency name
    currencyName: (state) => {
      const names = {
        'USD': 'US Dollar',
        'EUR': 'Euro',
        'GBP': 'British Pound',
        'BDT': 'Bangladeshi Taka',
        'INR': 'Indian Rupee',
        'JPY': 'Japanese Yen',
        'CAD': 'Canadian Dollar',
        'AUD': 'Australian Dollar',
        'CHF': 'Swiss Franc',
        'CNY': 'Chinese Yuan',
        'KRW': 'South Korean Won',
        'SGD': 'Singapore Dollar',
        'HKD': 'Hong Kong Dollar',
        'NZD': 'New Zealand Dollar',
        'SEK': 'Swedish Krona',
        'NOK': 'Norwegian Krone',
        'DKK': 'Danish Krone',
        'PLN': 'Polish Złoty',
        'CZK': 'Czech Koruna',
        'HUF': 'Hungarian Forint',
        'RUB': 'Russian Ruble',
        'TRY': 'Turkish Lira',
        'BRL': 'Brazilian Real',
        'MXN': 'Mexican Peso',
        'ZAR': 'South African Rand',
        'AED': 'UAE Dirham',
        'SAR': 'Saudi Riyal',
        'THB': 'Thai Baht',
        'MYR': 'Malaysian Ringgit',
        'IDR': 'Indonesian Rupiah',
        'PHP': 'Philippine Peso',
        'VND': 'Vietnamese Dong'
      }
      return names[state.currency] || 'US Dollar'
    }
  },

  actions: {
    // Initialize currency from settings
    async initCurrency() {
      try {
        const settingsStore = useSettingsStore()
        await settingsStore.fetchSettings()
        
        if (settingsStore.settings.currency) {
          this.currency = settingsStore.settings.currency
        }
      } catch (error) {
        // Handle error silently
      }
    },

    // Update currency
    async updateCurrency(newCurrency) {
      try {
        this.loading = true
        this.error = null
        
        const settingsStore = useSettingsStore()
        // Update the currency in settings
        const updatedSettings = { ...settingsStore.settings, currency: newCurrency }
        const result = await settingsStore.updateSettings(updatedSettings)
        
        if (result.success) {
          this.currency = newCurrency
          return { success: true }
        } else {
          this.error = result.error
          return { success: false, error: this.error }
        }
      } catch (error) {
        this.error = error.message || 'Failed to update currency'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    // Format price with current currency
    formatPrice(price) {
      return this.formatAmount(price)
    },

    // Format multiple prices
    formatPrices(prices) {
      return prices.map(price => this.formatPrice(price))
    }
  }
}) 
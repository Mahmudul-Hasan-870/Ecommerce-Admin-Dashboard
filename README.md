# 🛍️ E-commerce Admin Dashboard

A modern, feature-rich e-commerce administration dashboard built with Vue.js 3, Pinia, and Tailwind CSS. This application provides comprehensive management capabilities for online stores including products, orders, customers, categories, and more.

![Vue.js](https://img.shields.io/badge/Vue.js-3.3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.1.6-yellow?style=for-the-badge&logo=pinia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4.9-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Authentication & Permissions](#-authentication--permissions)
- [Components](#-components)
- [Stores](#-stores)
- [Views](#-views)
- [Styling](#-styling)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login System** - JWT-based authentication with token management
- **Role-Based Access Control** - Granular permissions for different user roles
- **Session Management** - Automatic token refresh and secure logout
- **Route Protection** - Protected routes based on authentication and permissions

### 📊 Dashboard & Analytics
- **Real-time Statistics** - Orders, revenue, products, and customer metrics
- **Recent Activity** - Latest orders, low stock alerts, and customer registrations
- **Performance Charts** - Visual representation of business metrics
- **Quick Actions** - Fast access to common administrative tasks

### 🛍️ Product Management
- **Product CRUD Operations** - Create, read, update, and delete products
- **Inventory Management** - Stock tracking and low stock notifications
- **Category Organization** - Hierarchical product categorization
- **Bulk Operations** - Mass product updates and management
- **Product Variants** - Support for different product configurations
- **Media Management** - Product image and file handling

### 📦 Order Management
- **Order Processing** - Complete order lifecycle management
- **Status Tracking** - Real-time order status updates
- **Customer Details** - Comprehensive order information
- **Payment Integration** - Payment status and transaction details
- **Order History** - Complete order audit trail

### 👥 Customer Management
- **Customer Profiles** - Detailed customer information and history
- **Order History** - Complete customer purchase records
- **Customer Analytics** - Purchase patterns and preferences
- **Communication Tools** - Customer interaction management

### 🏷️ Category Management
- **Hierarchical Categories** - Nested category structures
- **Category Statistics** - Product counts and performance metrics
- **Bulk Operations** - Mass category updates and management
- **SEO Optimization** - Category metadata and descriptions

### 🖼️ Banner Management
- **Marketing Banners** - Promotional content management
- **Banner Scheduling** - Time-based banner display
- **Media Upload** - Image and content management
- **Performance Tracking** - Banner effectiveness metrics

### ⚙️ System Settings
- **User Management** - Admin user creation and role assignment
- **Permission Configuration** - Granular access control setup
- **System Preferences** - Application configuration options
- **Currency Management** - Multi-currency support

## 🛠️ Tech Stack

### Frontend Framework
- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Vue Router 4** - Official router for Vue.js applications
- **Pinia** - Intuitive, type-safe store for Vue.js

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Vue Toastification** - Toast notification system

### Development Tools
- **Vite** - Next-generation frontend build tool
- **PostCSS** - CSS post-processor
- **Autoprefixer** - CSS vendor prefixing

### Data Visualization
- **Chart.js** - Flexible JavaScript charting library
- **Vue Chart.js** - Vue.js wrapper for Chart.js

### HTTP Client
- **Axios** - Promise-based HTTP client for browser and Node.js

### Utilities
- **Date-fns** - Modern JavaScript date utility library
- **SweetAlert2** - Beautiful, responsive, customizable replacement for JavaScript's popup boxes

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── base/           # Base UI components
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   └── BaseTable.vue
│   │   ├── feature/        # Feature-specific components
│   │   │   ├── BannerModal.vue
│   │   │   └── PermissionDialog.vue
│   │   ├── ui/             # UI components
│   │   │   ├── Avatar.vue
│   │   │   └── LoadingSpinner.vue
│   │   └── ...             # Other components
│   ├── composables/        # Vue 3 composables
│   │   └── usePermissionDialog.js
│   ├── router/             # Vue Router configuration
│   │   └── index.js
│   ├── stores/             # Pinia stores
│   │   ├── auth.js         # Authentication store
│   │   ├── banners.js      # Banner management store
│   │   ├── categories.js   # Category management store
│   │   ├── currency.js     # Currency management store
│   │   ├── customers.js    # Customer management store
│   │   ├── notifications.js # Notification store
│   │   ├── orders.js       # Order management store
│   │   ├── products.js     # Product management store
│   │   └── settings.js     # Settings store
│   ├── utils/              # Utility functions
│   │   ├── auth.js         # Authentication utilities
│   │   ├── axios.js        # HTTP client configuration
│   │   ├── confirm.js      # Confirmation dialogs
│   │   ├── permissions.js  # Permission utilities
│   │   ├── theme.js        # Theme management
│   │   └── toast.js        # Toast notifications
│   ├── views/              # Page components
│   │   ├── Dashboard.vue   # Main dashboard layout
│   │   ├── DashboardHome.vue # Dashboard home page
│   │   ├── Login.vue       # Login page
│   │   ├── Products.vue    # Products management page
│   │   ├── Categories.vue  # Categories management page
│   │   ├── Orders.vue      # Orders management page
│   │   ├── Customers.vue   # Customers management page
│   │   ├── Banners.vue     # Banners management page
│   │   └── Settings.vue    # Settings page
│   ├── App.vue             # Root component
│   ├── main.js             # Application entry point
│   └── style.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://ecommerce-backend-api-server-production.up.railway.app/api
   VITE_APP_NAME=E-commerce Admin
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## ⚙️ Configuration

### Vite Configuration
The project uses Vite for fast development and building. Configuration is in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://ecommerce-backend-api-server-production.up.railway.app',
        changeOrigin: true
      }
    }
  }
})
```

### Tailwind CSS Configuration
Tailwind CSS is configured in `tailwind.config.js` with custom color schemes and responsive breakpoints.

### PostCSS Configuration
PostCSS is configured with Autoprefixer for cross-browser compatibility.

## 💻 Usage

### Authentication
1. Navigate to the login page
2. Enter your credentials
3. Upon successful authentication, you'll be redirected to the dashboard
4. Your session will be maintained using JWT tokens

### Dashboard Navigation
- **Dashboard Home** - Overview and statistics
- **Products** - Product management and inventory
- **Categories** - Category organization
- **Orders** - Order processing and management
- **Customers** - Customer information and analytics
- **Banners** - Marketing banner management
- **Settings** - System configuration and user management

### Key Features Usage

#### Product Management
- **Add Product**: Click "Add Product" button and fill in the form
- **Edit Product**: Click the edit icon on any product row
- **Delete Product**: Use the delete button with confirmation
- **Bulk Operations**: Select multiple products for mass updates
- **Search & Filter**: Use the search bar and status filters

#### Order Management
- **View Orders**: Browse all orders with status indicators
- **Update Status**: Change order status through the interface
- **Order Details**: Click on orders to view complete information
- **Customer Information**: Access customer details from orders

#### Category Management
- **Create Categories**: Add new product categories
- **Hierarchical Structure**: Organize categories in parent-child relationships
- **Category Statistics**: View product counts and performance metrics

## 🔌 API Integration

### HTTP Client Configuration
The application uses Axios for API communication, configured in `src/utils/axios.js`:

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### API Endpoints
The application integrates with the following API endpoints:

- **Authentication**: `/auth/login`, `/auth/me`, `/auth/profile`
- **Products**: `/products`, `/products/{id}`
- **Categories**: `/categories`, `/categories/{id}`
- **Orders**: `/orders`, `/orders/{id}`
- **Customers**: `/customers`, `/customers/{id}`
- **Banners**: `/banners`, `/banners/{id}`
- **Settings**: `/settings`, `/users`

### Error Handling
Comprehensive error handling is implemented throughout the application:
- Network errors are caught and displayed to users
- Validation errors are shown inline
- Authentication errors trigger automatic logout
- API rate limiting is handled gracefully

## 🔐 Authentication & Permissions

### JWT Authentication
- **Token Storage**: JWT tokens are stored in localStorage
- **Automatic Refresh**: Tokens are automatically refreshed before expiration
- **Secure Logout**: Complete session cleanup on logout

### Permission System
The application implements a granular permission system:

```javascript
// Permission checking example
import { canAccess } from '@/utils/permissions'

// Check if user can access a feature
if (canAccess('products')) {
  // Show products management
}
```

### Role-Based Access Control
- **Admin**: Full access to all features
- **Manager**: Limited access based on assigned permissions
- **User**: Basic access to view-only features

## 🧩 Components

### Base Components
- **BaseButton**: Reusable button component with variants
- **BaseInput**: Form input component with validation
- **BaseTable**: Data table component with sorting and pagination

### Feature Components
- **BannerModal**: Banner creation and editing modal
- **PermissionDialog**: Permission management dialog
- **LoadingSpinner**: Loading state indicator
- **Avatar**: User avatar display component

### Component Architecture
Components follow Vue.js 3 Composition API best practices:
- Props for data input
- Emits for event communication
- Slots for content projection
- Composables for shared logic

## 📦 Stores (Pinia)

### Store Architecture
Each feature has its own Pinia store for state management:

```javascript
// Example store structure
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  
  getters: {
    totalProducts: (state) => state.products.length
  },
  
  actions: {
    async fetchProducts() {
      // API call logic
    }
  }
})
```

### Store Features
- **State Management**: Centralized application state
- **Actions**: Async operations and API calls
- **Getters**: Computed state values
- **Persistence**: State persistence across page reloads

## 🎨 Views

### Dashboard Views
- **Dashboard.vue**: Main layout with navigation
- **DashboardHome.vue**: Overview with statistics and recent activity

### Management Views
- **Products.vue**: Complete product management interface
- **Categories.vue**: Category organization and management
- **Orders.vue**: Order processing and tracking
- **Customers.vue**: Customer information and analytics
- **Banners.vue**: Marketing banner management
- **Settings.vue**: System configuration and user management

### View Features
- **Responsive Design**: Mobile-first responsive layouts
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time form validation
- **Search & Filtering**: Advanced data filtering capabilities

## 🎨 Styling

### Design System
- **Color Palette**: Consistent color scheme throughout the application
- **Typography**: Hierarchical text styling with Tailwind CSS
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable UI component patterns

### Responsive Design
- **Mobile First**: Mobile-optimized layouts
- **Breakpoints**: Responsive breakpoints for different screen sizes
- **Touch Friendly**: Optimized for touch devices

### Dark Mode Support
The application includes dark mode support with:
- **Theme Toggle**: User-controlled theme switching
- **CSS Variables**: Dynamic theme color management
- **Persistent Preferences**: Theme preference storage

## 🚀 Development

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Vue SFC**: Single File Component validation
- **TypeScript**: Type checking (if configured)

### Development Tools
- **Vue DevTools**: Vue.js debugging and inspection
- **Pinia DevTools**: State management debugging
- **Hot Module Replacement**: Instant code updates
- **Source Maps**: Debugging support

## 🏗️ Building for Production

### Build Process
1. **Optimization**: Code splitting and tree shaking
2. **Minification**: JavaScript and CSS minification
3. **Asset Optimization**: Image and font optimization
4. **Bundle Analysis**: Bundle size analysis and optimization

### Build Commands
```bash
# Production build
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run analyze
```

### Deployment
The application can be deployed to various platforms:
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Server**: Nginx, Apache, Express.js

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow Vue.js style guide
- Use ESLint and Prettier
- Write meaningful commit messages
- Include documentation for new features

### Testing
- Unit tests for components and utilities
- Integration tests for features
- End-to-end tests for critical user flows

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Pinia Team** - For the excellent state management solution
- **Vite Team** - For the fast build tool

## 📞 Support

For support and questions:
- **Issues**: Create an issue on GitHub
- **Documentation**: Check the project wiki
- **Community**: Join our Discord server

---

**Built with ❤️ using Vue.js 3, Pinia, and Tailwind CSS** 
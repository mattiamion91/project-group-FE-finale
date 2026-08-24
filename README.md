# Project Group FE Finale

Frontend of the e-commerce application developed with React and Vite.

## 📋 Description

This project represents the frontend of a complete e-commerce application, developed using:
- **React** for building the user interface
- **Vite** as bundler and development server
- **React Router** for route management
- **Bootstrap** and **Bootstrap Icons** for styling and icons
- **Axios** for HTTP calls to the backend
- **React Context** (via `GlobalContext`) for global state management

The application includes typical e-commerce features:
- Navigation between products by category/region
- Product detail view
- Shopping cart
- Wishlist
- Checkout
- Search functionality

## 🛠️ Technologies Used

- **Frontend**: React 19, JavaScript (ES modules)
- **Styling**: CSS, Bootstrap 5.3
- **Icons**: Bootstrap Icons, React Icons
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite 7.3
- **Code Quality**: ESLint with React plugins

## 📁 Project Structure

```
src/
├── components/         # Reusable components (Header, Footer, ProductCard, etc.)
├── context/            # Context API for global state (GlobalContext)
├── layouts/            # Page layouts (DefaultLayout)
├── pages/              # Application pages (Home, Product, Cart, etc.)
├── img/                # Image resources
├── App.jsx             # Main component with routes and provider
├── main.jsx            # Application entry point
├── App.css             # Global styles
└── index.css           # Base styles
```

## ⚙️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-group-FE-finale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be generated in the `dist/` folder

5. **Preview the production build**
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

- `npm run dev` - Starts the development server with Vite
- `npm run build` - Builds the application for production
- `npm run lint` - Runs ESLint to check the code
- `npm run preview` - Local preview of the production build

## 🧩 Main Features

- **Home Page**: Promotional banner and featured products
- **Product Page**: Detailed view of a single product
- **Region Page**: Browse products by geographic region
- **Region Product Page**: Products filtered by region
- **Cart Page**: Shopping cart management (add, remove, modify quantity)
- **Wishlist Page**: List of products saved by users
- **Checkout Page**: Purchase procedure with order summary
- **Search Page**: Product search by keyword functionality
- **Not Found Page**: Custom 404 page for invalid routes
- **Header/Footer**: Layout components shared across all pages
- **Loader**: Loading indicator during API calls
- **SearchBar**: Reusable search component

## 🔗 Backend Connection

This frontend communicates with an Express/Node.js backend (not included in this repository) via HTTP calls using Axios. Calls are configured to point to the backend's development/production URL.

For local development, ensure the backend is running and correctly configure proxies or base URLs in API calls.

## 📝 Coding Guidelines

- **Import**: Use ES modules (`import/export`)
- **Indentation**: Tabs, width 2
- **Semicolons**: Yes
- **Quotes**: Single
- **Naming**:
  - camelCase for variables and functions
  - PascalCase for React components
  - snake_case for possible constants or configurations
- **Error handling**: Use try/catch for asynchronous operations
- **Asynchrony**: Prefer `async/await` over `.then()/.catch()`

## 🐳 Note on Docker and Environment

This repository contains only the frontend. To run the full application you need to:
1. Also clone the backend repository (Express/Node.js with MySQL)
2. Configure environment variables for database connection
3. Start both services (frontend and backend)
4. Ensure frontend API calls point to the correct backend

## 👥 Authors

Project developed by the FE group for the final course.

---

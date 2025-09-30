# 🛒 Full-Stack E-commerce Application

A modern, full-stack E-commerce application built with **React + TypeScript** frontend and **.NET 9.0** backend API.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- .NET 9.0 SDK
- SQL Server LocalDB (comes with Visual Studio)

### Development Setup

1. **Start both servers with one command:**
   ```powershell
   .\start-dev.ps1
   ```

   Or manually:

2. **Start .NET API:**
   ```bash
   cd EcommerceApi
   dotnet run
   ```

3. **Start React App (in new terminal):**
   ```bash
   cd project
   npm run dev
   ```

### 🌐 Access Points
- **React App**: http://localhost:5173
- **API**: https://localhost:7000
- **API Documentation**: https://localhost:7000/swagger

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Icons**: Lucide React

### Backend (.NET 9.0)
- **Framework**: ASP.NET Core Web API
- **Database**: Entity Framework Core with SQL Server
- **ORM**: Entity Framework Core
- **Documentation**: Swagger/OpenAPI

## 📁 Project Structure

```
E-commerce/
├── project/                 # React Frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/      # React contexts
│   │   └── services/       # API service layer
│   └── package.json
├── EcommerceApi/           # .NET Backend
│   ├── Controllers/        # API controllers
│   ├── Models/            # Data models
│   ├── Data/              # DbContext
│   └── Program.cs
└── start-dev.ps1          # Development startup script
```

## 🛠️ Features

### Frontend Features
- ✅ Modern React with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Shopping cart functionality
- ✅ Wishlist management
- ✅ Product browsing and filtering
- ✅ User authentication context
- ✅ Chat bot integration
- ✅ Exit intent popup

### Backend Features
- ✅ RESTful API with .NET 9.0
- ✅ Entity Framework Core with SQL Server
- ✅ Product management
- ✅ Shopping cart API
- ✅ Order management
- ✅ CORS configuration for React app
- ✅ Swagger API documentation

## 🚀 Deployment Options

### Easy Hosting (Frontend)
1. **Vercel** (Recommended)
   - Push to GitHub
   - Connect to Vercel
   - Auto-deploys!

2. **Netlify**
   - Push to GitHub
   - Connect to Netlify
   - Auto-deploys!

3. **GitHub Pages**
   - Already configured with GitHub Actions

### Backend Hosting
1. **Azure App Service**
2. **AWS Elastic Beanstalk**
3. **DigitalOcean App Platform**
4. **Railway**

## 🔧 Development Commands

```bash
# Frontend
cd project
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd EcommerceApi
dotnet restore       # Restore packages
dotnet run           # Start API server
dotnet build         # Build API
```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Cart
- `GET /api/cart/{userId}` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove from cart
- `DELETE /api/cart/clear/{userId}` - Clear cart

### Orders
- `GET /api/orders/{userId}` - Get user's orders
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order

## 🎯 Next Steps

1. **Add Authentication**: Implement user registration/login
2. **Payment Integration**: Add Stripe/PayPal integration
3. **Image Upload**: Add product image management
4. **Email Notifications**: Order confirmation emails
5. **Admin Panel**: Product management interface
6. **Search & Filters**: Advanced product search
7. **Reviews & Ratings**: Customer feedback system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

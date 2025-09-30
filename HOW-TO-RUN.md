# 🚀 How to Run Your E-commerce App

## ✅ **FIXED! No More Directory Errors**

I've created multiple ways to run your app so you'll never get that error again!

## 🎯 **Choose Your Method:**

### **Method 1: Simple (Recommended)**
```bash
npm run dev
```
**This now works from the root directory!** ✅

### **Method 2: One-Click Start (Windows)**
Double-click: `start.bat`

### **Method 3: One-Click Start (Mac/Linux)**
```bash
./start.sh
```

### **Method 4: PowerShell Script**
```powershell
.\start-dev.ps1
```

### **Method 5: Manual (if you prefer)**
```bash
# Terminal 1 - API
cd EcommerceApi
dotnet run

# Terminal 2 - React
cd project  
npm run dev
```

## 🌐 **Access Your App:**
- **React App**: http://localhost:5173
- **API**: https://localhost:7000
- **API Docs**: https://localhost:7000/swagger

## 🔧 **Available Commands:**
```bash
npm run dev          # Start React app
npm run dev:api      # Start .NET API only
npm run dev:all      # Start both (PowerShell)
npm run install:all  # Install all dependencies
npm run build:frontend # Build React for production
npm run build:api    # Build .NET API
```

## ❌ **Never Do This Again:**
- Don't run `npm run dev` from the root directory without the new package.json
- Always use the commands above

## ✅ **What I Fixed:**
1. ✅ Created root `package.json` with proper scripts
2. ✅ Added batch files for easy startup
3. ✅ Created shell scripts for cross-platform support
4. ✅ Added comprehensive documentation

**Your app will now start correctly every time!** 🎉

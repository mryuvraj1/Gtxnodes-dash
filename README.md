<div align="center">

# ☁️ SKYFORGe

## Open-Source Premium Hosting Platform

![SKYFORGe Banner](https://via.placeholder.com/1200x400/0b0b0b/00ffa6?text=SKYFORGe+-+Premium+Hosting+Platform)

**Production-ready Hosting & Billing Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)

**Made By: MrYuvraj** | [Discord: mryuvraj2](https://discord.gg/PBwNskfvyD)

</div>

---

## 📋 Table of Contents

- [🌟 What Makes SKYFORGe Special](#-what-makes-skyforge-special)
- [✨ Complete Features List](#-complete-features-list)
- [🖥️ Supported Operating Systems](#️-supported-operating-systems)
- [📋 System Requirements](#-system-requirements)
- [🚀 Installation Guide](#-installation-guide)
- [🔧 Environment Variables](#-environment-variables)
- [🔐 Firewall Configuration](#-firewall-configuration)
- [🔄 Update & Maintenance](#-update--maintenance)
- [📞 Support](#-support)

---

## 🌟 What Makes SKYFORGe Special?

| Feature | Description |
|---------|-------------|
| 🎮 **Game Server Hosting** | Minecraft, VPS, VDS with instant deployment |
| 💰 **Automated Billing** | Razorpay integration with auto-invoice generation |
| 🌍 **Live Currency Converter** | 10+ currencies with auto-update every hour |
| 👑 **Full Admin Panel** | Complete control over users, plans, orders, and settings |
| 🎨 **Modern UI/UX** | Dark theme, glassmorphism, glow effects, fully responsive |
| 🔧 **TypeSafe Code** | Full TypeScript implementation (no `any` types) |
| 🐳 **Docker Ready** | One-command deployment with docker-compose |
| 📱 **Mobile First** | Fully responsive hamburger menu on mobile |
| 💾 **Dynamic Settings** | Change logo, name, email without touching code |
| 📊 **Real-time Analytics** | Dashboard stats with live updates |
| 🧩 **Modular Architecture** | Easy to extend and customize |
| 🔒 **Secure by Default** | JWT auth, bcrypt hashing, Razorpay webhook verification |

---

## ✨ Complete Features List

### 🎮 **Hosting Services**
- Minecraft Hosting (Budget & Premium Plans)
- Cloud VPS (Budget, Performance, Premium tiers)
- Cloud VDS (Dedicated CPU & RAM)
- Domain Registration (100+ TLDs with GST)

### 💰 **Billing & Payments**
- Razorpay Payment Gateway Integration
- Automatic PDF Invoice Generation
- Order Management System (Pending, Paid, Delivered, Cancelled)
- Live Currency Converter (10+ currencies with auto hourly updates)
- Discount & Offer Management

### 👑 **Admin Panel**
- Dashboard Analytics (Total Users, Orders, Revenue, Paid Orders)
- User Management (View, Edit, Delete, Promote/Demote, Manual Create)
- Plan Management (CRUD with RAM, CPU, Storage, Backups, Databases)
- Category & Subcategory Management
- Offer/Banner Management
- Dynamic Page Builder (Create custom pages from admin panel)
- FAQ Management
- Settings Panel (Change Site Name, Logo, Email, Phone, Dashboard Name)
- Admin Password Change

### 👤 **User Dashboard**
- Profile Management (Update name, avatar)
- Order History with Status Tracking
- Invoice Download (PDF)
- Active Services Overview

### 🎨 **Design System**
- Modern Dark Theme (#0b0b0b)
- Primary Color: #00ffa6 (Neon Green)
- Secondary Color: #ff3b3b (Neon Red)
- Glow Buttons with Hover Effects
- Glassmorphism Cards
- Smooth Page Transitions
- Fully Responsive (Mobile, Tablet, Desktop)

### 🔧 **Technical Highlights**
- Full TypeScript (Frontend + Backend)
- JWT Authentication with Role-Based Access
- bcrypt Password Hashing
- MongoDB with Mongoose ODM
- Razorpay Webhook Signature Verification
- Docker Multi-container Setup (MongoDB, Backend, Frontend, Nginx)
- Production Ready Configuration
- Environment Variable Support

---

## 🖥️ Supported Operating Systems

| OS | Version | Support Level |
|---|---------|---------------|
| 🐧 **Ubuntu** | 20.04, 22.04, 24.04 | ✅ Full Support |
| 🐧 **Debian** | 11, 12 | ✅ Full Support |
| 🐧 **CentOS** | 7, 8, 9 | ✅ Full Support |
| 🐧 **Rocky Linux** | 8, 9 | ✅ Full Support |
| 🐧 **AlmaLinux** | 8, 9 | ✅ Full Support |
| 🍎 **macOS** | Ventura+, Sonoma+ | ✅ Development Only |
| 🪟 **Windows** | 10, 11 (WSL2) | ⚠️ Via WSL2 |
| 🐳 **Docker** | Any OS with Docker | ✅ Best Experience |

---

## 📋 System Requirements

### Minimum Requirements (Development)
| Component | Requirement |
|-----------|-------------|
| CPU | 2 vCores |
| RAM | 4 GB |
| Storage | 10 GB SSD |
| Node.js | 20.x |
| MongoDB | 7.x |
| npm | 10.x |

### Recommended Requirements (Production)
| Component | Requirement |
|-----------|-------------|
| CPU | 4 vCores |
| RAM | 8 GB |
| Storage | 50 GB SSD |
| Node.js | 20.x LTS |
| MongoDB | 7.x |
| Docker | 24.x+ |

---

## 🚀 Installation Guide

### Method 1: Docker (Recommended for Production)

**Supported on: Ubuntu, Debian, CentOS, Rocky Linux, AlmaLinux**

```bash
# 1. Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 2. Clone repository
git clone https://github.com/yourusername/SKYFORGe-Premium-Dashboard.git
cd SKYFORGe-Premium-Dashboard

# 3. Create .env files
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Edit .env files with your values
nano server/.env

# 5. Start all services
docker-compose up -d

# 6. Check status
docker-compose ps

# 7. View logs
docker-compose logs -f

# 8. Stop services
docker-compose down
```

# Manual Installation (Ubuntu/debian)
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install MongoDB 7.x
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# 4. Install PM2 (Process Manager)
sudo npm install -g pm2

# 5. Clone and setup
git clone https://github.com/yourusername/SKYFORGe-Premium-Dashboard.git
cd SKYFORGe-Premium-Dashboard

# 6. Setup backend
cd server
npm install
npm run build
cp .env.example .env
nano .env  # Edit with your values
pm2 start dist/index.js --name skyforge-backend

# 7. Setup frontend
cd ../client
npm install
npm run build

# 8. Install and configure Nginx
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/skyforge

# Copy Nginx configuration (see below)
sudo ln -s /etc/nginx/sites-available/skyforge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

# Manual Installation (Centos/RHEL/Rocky/Alma)
```
# 1. Update system
sudo dnf update -y

# 2. Install Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# 3. Install MongoDB
sudo tee /etc/yum.repos.d/mongodb-org-7.repo << 'EOF'
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
EOF
sudo dnf install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# 4. Install PM2
sudo npm install -g pm2

# 5. Clone and setup
git clone https://github.com/yourusername/SKYFORGe-Premium-Dashboard.git
cd SKYFORGe-Premium-Dashboard

# 6. Setup backend
cd server
npm install
npm run build
cp .env.example .env
nano .env
pm2 start dist/index.js --name skyforge-backend

# 7. Setup frontend
cd ../client
npm install
npm run build

# 8. Install Nginx
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
``` 

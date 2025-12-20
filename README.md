# Blood Bridge - Blood Donation Management System

## 🩸 Project Overview

**Blood Bridge** is a comprehensive blood donation management platform designed to connect blood donors with those in urgent need. The application facilitates seamless coordination between donors, volunteers, and administrators to save lives through efficient blood donation management.

## 🌐 Live URL
[Blood Bridge Live Site](https://blood-bridge-2099.netlify.app/)

## 📋 Purpose

The primary purpose of Blood Bridge is to:
- Create a centralized platform for blood donation requests and responses
- Enable quick search and matching of blood donors based on location and blood type
- Streamline the blood donation process through real-time status tracking
- Build a community of verified donors committed to saving lives
- Provide administrators and volunteers with tools to manage donation campaigns effectively

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure user registration and login system
- Role-based access control (Admin, Donor, Volunteer)
- Firebase authentication integration
- JWT token-based API protection

### 👥 User Management
- **For Donors:**
  - Create and manage personal donation requests
  - Update donation status (pending → inprogress → done/canceled)
  - Track donation history and impact
  - Search for other donors by blood type and location
  
- **For Volunteers:**
  - View all donation requests
  - Update donation status for coordination
  - Access dashboard statistics
  
- **For Admins:**
  - Complete user management (block/unblock users)
  - Role management (promote users to volunteer/admin)
  - Monitor all donation requests and statistics
  - View total funding and user metrics

### 🩸 Donation Request System
- Create detailed blood donation requests with hospital and location information
- Real-time status tracking (pending, inprogress, done, canceled)
- Donor information display when request is in progress
- Edit and delete functionality for request creators
- Filtering and pagination for easy navigation

### 🔍 Smart Search
- Advanced search by blood group, district, and upazila
- Real-time donor availability status
- Location-based donor matching

### 📊 Dashboard Features
- Role-specific dashboards with relevant statistics
- Recent donation requests overview
- Responsive sidebar navigation
- Profile management with edit functionality

### 💰 Funding System (Bonus Feature)
- Stripe payment integration for monetary donations
- Funding history tracking
- Total funds display on admin dashboard

### 🎨 UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Modern gradient backgrounds and animations
- Smooth page transitions with React Router
- Interactive hover effects and card animations
- Toast notifications for user feedback
- SweetAlert2 modals for confirmations
- Swiper carousel for banner sections

## 📦 NPM Packages Used

### Core Dependencies
- **react** (^19.2.0) - JavaScript library for building user interfaces
- **react-dom** (^19.2.0) - React package for DOM rendering
- **react-router** (^7.10.1) - Declarative routing for React applications

### Styling & UI
- **tailwindcss** (^4.1.18) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.18) - Tailwind CSS integration for Vite
- **react-icons** (^5.5.0) - Popular icon library for React
- **swiper** (^12.0.3) - Modern mobile touch slider

### Backend & API
- **axios** (^1.13.2) - Promise-based HTTP client
- **firebase** (^12.6.0) - Backend services (Authentication, Hosting)

### User Experience
- **react-toastify** (^11.0.5) - Elegant toast notifications
- **sweetalert2** (^11.26.10) - Beautiful, responsive popup boxes

## 🚀 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blood-bridge.git
cd blood-bridge
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend:** React 19, Tailwind CSS 4
- **Routing:** React Router v7
- **Authentication:** Firebase Authentication
- **Backend:** Node.js, Express.js, MongoDB
- **Payment:** Stripe Integration
- **Deployment:** Firebase Hosting / Vercel

## 👨‍💻 Developer

**Your Name**  
📧 Email: hasnatbin1@gmail.com  
🔗 GitHub: [Hasnat-Sayed](https://github.com/Hasnat-Sayed)


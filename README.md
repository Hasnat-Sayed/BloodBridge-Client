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

- **Authentication:** Register and login with Firebase; avatar upload via imgBB; new users are `donor` and `active` by default
- **Role-based dashboards:** Separate sidebar dashboards for Admin, Donor and Volunteer
- **Donation requests:** Create, edit, delete and view requests; status flow `pending → inprogress → done / canceled`
- **My Requests table:** Status filter and pagination
- **Donate flow:** Donor confirms from the details page, which moves the request to `inprogress`
- **Search donors:** Public search by blood group, district and upazila
- **Admin tools:** Block/unblock users, make volunteer/admin, manage all requests, view stats
- **Volunteer access:** View all requests and update status only
- **Funding:** Stripe payments with a funding history table
- **Profile page:** View and edit profile (email is read-only), synced with Firebase
- **Protected APIs:** Firebase ID token verified on private routes
- **Responsive UI:** Works on mobile, tablet and desktop



## 🛠️ Tech Stack

- **Frontend:** React 19, React Router 7, Tailwind CSS 4, DaisyUI
- **Backend:** Node.js, Express.js, MongoDB
- **Auth:** Firebase Authentication + Firebase Admin (token verification)
- **Payment:** Stripe Checkout
- **Hosting:** Netlify (client), Vercel (server)



## 📦 Dependencies

**Client**
`react`, `react-dom`, `react-router`, `tailwindcss`, `@tailwindcss/vite`, `daisyui`, `firebase`, `axios`, `react-icons`, `react-toastify`, `sweetalert2`, `swiper`

**Server**
`express`, `mongodb`, `cors`, `dotenv`, `stripe`, `firebase-admin`

## 🚀 Run Locally

### 1. Clone the repositories
```bash
git clone https://github.com/Hasnat-Sayed/BloodBridge-Client.git
git clone https://github.com/Hasnat-Sayed/BloodBridge-Server.git
```

### 2. Run the server
```bash
cd BloodBridge-Server
npm install
```
Create a `.env` file:
```env
PORT=5000
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
STRIPE_KEY=your_stripe_secret_key
FB_SERVICE_KEY=your_firebase_service_account_json_in_base64
SITE_DOMAIN=http://localhost:5173
```
Start it:
```bash
node index.js
```

### 3. Run the client
```bash
cd BloodBridge-Client
npm install
```
Create a `.env` file:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id
VITE_imgbb_key=your_imgbb_api_key
```
Point the API base URL to your local server (in `useAxiosSecure` and `useAxios`):
```js
baseURL: 'http://localhost:5000'
```
Start it:
```bash
npm run dev
```
The app runs at `http://localhost:5173`.

> To get an admin account, register normally and change the user's `role` to `admin` directly in the MongoDB `user` collection.

## 🔗 Links

- **Live Site:** https://blood-bridge-2099.netlify.app/
- **Server API:** https://bloodbridge-puce.vercel.app/
- **Client Repo:** https://github.com/Hasnat-Sayed/BloodBridge-Client
- **Server Repo:** https://github.com/Hasnat-Sayed/BloodBridge-Server
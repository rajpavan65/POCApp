# POC React Native App

A proof-of-concept mobile app with user signup, product management, and checkout.

## Tech Stack
- **Backend**: Node.js, Express, SQLite, JWT
- **App**: React Native (CLI, no Expo)

## Prerequisites
- Node.js 20+
- Android Studio with emulator (for Android)
- Xcode (for iOS, macOS only)

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
Server runs on http://localhost:3000

### 2. Mobile App Setup
```bash
cd POCApp
npm install

# Start Metro bundler
npx react-native start

# In another terminal, run on Android
npx react-native run-android
```

## Features
- ✅ User Signup & Login
- ✅ Add Product
- ✅ Product Listing
- ✅ Checkout & Order Placement
- ✅ JWT Authentication
- ✅ SQLite Database

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/signup | No | Register user |
| POST | /api/auth/login | No | Login |
| GET | /api/products | No | List products |
| POST | /api/products | Yes | Add product |
| POST | /api/orders | Yes | Place order |

## Project Structure
```
POC App/
├── backend/          # Node.js API
│   ├── server.js
│   ├── database.js
│   ├── routes/
│   └── middleware/
└── POCApp/           # React Native App
    ├── App.js
    └── src/
        ├── screens/
        ├── components/
        ├── services/
        └── navigation/
```

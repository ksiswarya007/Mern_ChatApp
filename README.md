# 💬 Mern_ChatApp — MERN Stack Real-Time Chat App

A full-stack real-time chat application built with the MERN stack and Socket.IO. Mern_ChatApp allows users to register, login, chat instantly, update profiles, and share images — all with a sleek, modern UI.

---

## 🚀 Features

- ⚡ Real-time 1-on-1 chat using **Socket.IO**
- 🆕 User **signup**, **login**, and **logout**
- 🔐 JWT-based **authentication & protected routes**
- 👤 **Profile editing** — name, bio, profile picture
- 🖼️ **Photo sharing** in chat (uploaded to Cloudinary)
- 🗂️ View all **shared media** with each user
- 👁️ Message **seen/unseen** indicator
- 💬 Clean and responsive **chat UI**
- 📱 **Mobile-friendly** design

---

## 🛠️ Tech Stack

**Frontend**: React.js, React Router, Context API, Axios, Socket.IO Client, Tailwind CSS  
**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Socket.IO, Cloudinary

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Mern_ChatApp.git
cd Mern_ChatApp
```
### 2. Setup Backend
   
```
cd server
npm install
```
## <h6>Create a .env file inside /server and add:</h6>

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
### <h6>Start the backend server:</h6>
```
npm run server
```

### 3. Setup Frontend
```
cd client
npm install
npm run dev
```
---
## 🧠 Core Concepts

⚡ Socket.IO handles real-time message transfer

🔐 AuthContext protects frontend routes and manages user state

☁️ Cloudinary handles image uploads securely

🧾 MongoDB models store user data and messages

👁️ Seen/Unseen logic updates live per user interaction

📱 Responsive UI works on both desktop and mobile screens

---

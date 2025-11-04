# PayTM-Project

 💸 MiniPay — Full Stack Banking Application

A full-stack wallet application that allows users to sign up, sign in, view their balance, and securely transfer money to other users.
Built using React + TypeScript + Tailwind CSS on the frontend and Node.js + Express + MongoDB on the backend.

🚀 **Features**

🔐 Authentication

Secure Sign up and Sign in using JWT tokens

Passwords stored securely using hashing (bcrypt)

Persistent login with token stored in local storage

💰 Account Management

View current account balance

Transfer money between users

Transaction handled atomically using MongoDB sessions

🧠 Tech Stack
Layer	Technologies Used
Frontend	React, TypeScript, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JWT (JSON Web Token)

📂 Project Structure
Backend
backend/
├── dist/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── account/
│   │   │   └── account.js
│   │   └── user/
│   │       └── user.js
│   ├── db.js
│   └── index.js

Frontend
frontend/paytm-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Appbar.tsx
│   │   ├── Balance.tsx
│   │   ├── BottomWarning.tsx
│   │   ├── Button.tsx
│   │   ├── Heading.tsx
│   │   ├── InputBox.tsx
│   │   ├── SubHeading.tsx
│   │   └── Users.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── SendMoney.tsx
│   │   ├── Signin.tsx
│   │   └── Signup.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css

⚙️ Installation and Setup
1. Clone the repository
git clone https://github.com/Yogesh-0811/PayTM-Project.git

2. Setup Backend
cd backend
npm install

Install Required Dependencies

If not already installed, make sure you have the following packages:

npm install express cors mongoose jsonwebtoken bcrypt zod

Development Dependencies (optional)

If you’re using TypeScript or Nodemon for development:

npm install --save-dev nodemon typescript @types/express @types/cors @types/jsonwebtoken @types/bcrypt

Create a .env file in the backend root:

MONGO_URI = your MongoDB URI
JWT_SECRET=your_jwt_secret
PORT=3000

Start Backend Server
npm run dev


or if you’re using plain Node:

node index.js


Your backend should now run at
👉 http://localhost:3000

3. Setup Frontend
cd frontend
npm install
(intall tailwindcss react-router-dom axios)
npm run dev


Frontend runs by default at:
👉 http://localhost:5173

🔗 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/v1/user/signup	Create a new user
POST	/api/v1/user/signin	Login user and return JWT token
Account Routes
Method	Endpoint	Description
GET	/api/v1/account/balance	Get current user balance
POST	/api/v1/account/transfer	Transfer money to another user
🛡️ Security

All protected routes use authMiddleware to validate JWT tokens.

MongoDB transactions ensure atomic money transfer.

Sensitive data such as passwords are hashed before storage.

🧑‍💻 How It Works

User signs up or signs in using their credentials.

The server returns a JWT token stored in local storage.

The dashboard displays balance and allows money transfers.

Transfers are validated and processed using MongoDB sessions.

🪄 UI Preview

Built using Tailwind CSS for a clean and responsive interface.

Sign Up / Sign In: Simple forms with validation

Dashboard: Displays balance and transfer form

Notifications: Alerts on success/failure

🧰 Tools Used

Visual Studio Code

MongoDB Compass

Postman for API testing

Vite for fast frontend build

🧠 Key Concepts Implemented

React Hooks (useState, useEffect, useNavigate)

Axios for API communication

Middleware authentication with JWT

MongoDB transactions with session.startTransaction()

Tailwind CSS for responsive styling

🖼️ Screenshots

Signup & Signin Page

Dashboard showing balance and users

Send Money Page with validation alerts


<img width="1919" height="929" alt="Screenshot 2025-11-04 212428" src="https://github.com/user-attachments/assets/c53e0621-7248-495e-b80a-a55a0f7c26bc" />

<img width="1919" height="926" alt="Screenshot 2025-11-04 212339" src="https://github.com/user-attachments/assets/7dcb7a18-7a42-4850-a1b1-43603a2d1b37" />


<img width="1919" height="928" alt="Screenshot 2025-11-04 212740" src="https://github.com/user-attachments/assets/8a15659e-d6dd-4c1b-9236-2d57129b498b" />

<img width="1888" height="351" alt="Screenshot 2025-11-04 212716" src="https://github.com/user-attachments/assets/043b4885-677d-407a-8683-3a9cd7df5091" />

<img width="1919" height="1033" alt="Screenshot 2025-11-04 212755" src="https://github.com/user-attachments/assets/6f304a16-f0fe-46fc-b505-17f2d5b67552" />

<img width="1919" height="542" alt="Screenshot 2025-11-04 212807" src="https://github.com/user-attachments/assets/87a5c397-e557-42e4-ae3b-3f8b6d28c2ab" />

🧑‍🏫 Future Improvements

✅ Add transaction history

✅ Add user search by username

✅ Add profile and logout functionality

⏳ Integrate email verification

🧾 License

This project is open-source and available under the MIT License.



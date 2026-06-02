# Backend Node API

A scalable and structured Node.js backend application built with Express.js. This project provides RESTful APIs with authentication, database integration, middleware handling, and organized project architecture for modern web and mobile applications.

## 🚀 Features

* Express.js server setup
* RESTful API architecture
* Authentication & Authorization
* MongoDB database integration
* Environment variable configuration
* Middleware support
* Error handling system
* Modular folder structure
* CRUD Operations
* JWT Token Authentication
* Secure API endpoints

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* dotenv
* bcrypt

## 📁 Project Structure

```bash
backend_node/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── uploads/
├── .env
├── package.json
├── server.js
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/zaenimaung1/backend_node.git
```

### Navigate to the project directory

```bash
cd backend_node
```

### Install dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

### Users

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/users     | Get all users  |
| GET    | /api/users/:id | Get user by ID |
| PUT    | /api/users/:id | Update user    |
| DELETE | /api/users/:id | Delete user    |

> Update these routes according to your project.

## 🔐 Authentication

Protected routes require a JWT token:

```http
Authorization: Bearer YOUR_TOKEN
```

## 📦 Scripts

```bash
npm start      # Run production server
npm run dev    # Run development server
```

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Zar Ni Maung**

GitHub: https://github.com/zaenimaung1

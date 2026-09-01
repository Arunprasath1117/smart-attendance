# Smart Attendance System

A Node.js-based smart attendance system with project filtering capabilities. This system allows employees to check in/out, and managers to track attendance with advanced filtering options.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Project Management**: Create and manage projects with team members
- **Attendance Tracking**: Check-in/Check-out functionality with automatic hour calculation
- **Advanced Filtering**: Filter attendance records by project, date range, status, department, and hours worked
- **Role-based Access**: Admin, Manager, and Employee roles

## Installation

1. Clone the repository
```bash
git clone https://github.com/Arunprasath1117/smart-attendance.git
cd smart-attendance
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/smart-attendance
JWT_SECRET=your-secret-key-here
PORT=5000
```

4. Start MongoDB
```bash
mongod
```

5. Start the server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Attendance
- `POST /api/attendance/check-in` - Check in to a project
- `POST /api/attendance/check-out` - Check out from a project
- `GET /api/attendance/records` - Get attendance records with filters

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID

### Filters
- `POST /api/filters/attendance` - Advanced attendance filtering

## Usage Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "employee"
  }'
```

### Check In
```bash
curl -X POST http://localhost:5000/api/attendance/check-in \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "PROJECT_ID"
  }'
```

### Get Attendance Records
```bash
curl -X GET "http://localhost:5000/api/attendance/records?projectId=PROJECT_ID&status=present" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
smart-attendance/
├── models/
│   ├── User.js
│   ├── Attendance.js
│   └── Project.js
├── routes/
│   ├── auth.js
│   ├── attendance.js
│   ├── projects.js
│   └── filters.js
├── middleware/
│   └── auth.js
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## License

ISC

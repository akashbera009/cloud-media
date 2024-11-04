
# Welcome to Cloud-Media  
Cloud-Media is my first MERN stack project, featuring secure user authentication and an image gallery for each user.

## Features
- **User Registration**: Secure password hashing using bcrypt.
- **JWT Authentication**: For protected routes and secure login.
- **File Storage**: Users can upload and manage their files.
- **File View**: Each user can view only their uploaded files.

## Table of Contents
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)



## Project Structure
The project consists of the following components:
- **Models**: User model for managing user data and authentication.
- **Routes**: User authentication routes for registration, login, and image management.
- **Controllers**: Handles the logic for user registration, login, and image uploads.

---

## Technologies Used
- **React** (18.x)
- **Node.js** (16.x)
- **Express** (4.x)
- **MongoDB** (original)
- **Mongoose** (for MongoDB object modeling)
- **bcrypt** (for password hashing)
- **jsonwebtoken** (for JWT authentication)
- **multer** (for handling file uploads)
- **dotenv** (for environment variable management)
---

## Installation
Follow these steps to run the project on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cloud-media.git
cd cloud-media
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory with the following:
```plaintext
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1h
MONGODB_URI=your_mongo_db_uri
```

### 4. Run the application
```bash
npm start
```

Navigate to `http://localhost:8000` to view the backend application.
&
Navigate to `http://localhost:3000` to view the frontened application.


## Contributors

- Akash Bera - [Developer](https://www.linkedin.com/in/akash-bera-5a3009250/)

```

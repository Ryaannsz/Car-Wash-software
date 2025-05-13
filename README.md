# 🚿 Lava Jato Software

A modern full-stack application to manage a car wash business. This platform allows you to register clients, cars, and services performed, making the workflow of car wash operations easier and more efficient.

---

## 📋 Features

- Client registration and management
- Car and vehicle data registration
- Service tracking (e.g., washing, waxing, polishing)
- Status management (in progress, completed, etc.)
- Dashboard with a clean and responsive interface
- Fully containerized backend with Docker

---

## 🛠️ Technologies Used

### Backend
- Java 17
- Spring Boot
- Maven 4.0.0
- JPA / Hibernate
- PostgreSQL (optional, if connected)
- Docker

### Frontend
- React
- React Router
- Tailwind CSS
- Axios / Fetch API
- Docker Compose (for serving frontend)

## 📁 Project Structure
```
lava-jato-software/
├── backend/ # Spring Boot backend
│ ├── src/ # Java code and resources
│ ├── pom.xml # Maven configuration
│ └── Dockerfile # Backend Dockerfile
│
├── frontend/ # React frontend
│ ├── src/ # React components and assets
│ ├── package.json # React app config
│ └── docker-compose.yml # Frontend orchestration (optional backend included)
│
└── README.md # Project documentation
```

## 🐳 Running the Project

### 🔧 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) MySQL running locally if not containerized

---

### ▶️ Running the Backend

1. Navigate to the backend directory:

```bash
   cd backend/eshop
```
Make sure the Dockerfile is present, then run:

```bash
docker build -t lavajato-backend .
docker run -p 8080:8080 lavajato-backend
```

The backend will be available at: http://localhost:8080

## ▶️ Running the Frontend
Navigate to the frontend directory:

```bash
cd frontend/eshop/eshop
```
Make sure the docker-compose.yml is configured to serve the React app (e.g., with Nginx or Node):

Example structure:

```
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    command: npm start
```

Run the app with:

```bash
docker-compose up --build
```
Access the frontend at: http://localhost:3000

## 🔐 Environment Variables
Backend may expect environment variables such as:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/lavajato
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
```
These can be passed via a .env file or directly in the Docker environment section.

## ✍️ Author
Ryan Carvalho Bernardo

## 📜 License
This project is licensed under the MIT License.


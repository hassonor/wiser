# 🏨 Wiser - Hotel Reservation Microservices Platform

<div align="center">

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![NestJS](https://img.shields.io/badge/nestjs-%5E10.0.0-ea2845)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-latest-green)

**Production-grade hotel reservation system built with NestJS microservices**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Microservices](#-microservices)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Google Cloud Platform](#-google-cloud-platform-gcp-deployment)
- [Kubernetes](#-kubernetes-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Wiser** is a comprehensive hotel reservation platform demonstrating **enterprise-grade microservices architecture** using NestJS. The project showcases modern backend development practices including dependency injection, event-driven communication, database per service pattern, and cloud-native deployment.

### Why Wiser?

- ✅ **NestJS Best Practices**: Modules, services, controllers, guards, interceptors
- ✅ **Cloud-Native**: Designed for Google Cloud Platform with Kubernetes
- ✅ **Production-Ready**: Authentication, validation, error handling, logging
- ✅ **Scalable Architecture**: Independent services, horizontal scaling
- ✅ **CI/CD Pipeline**: Automated builds and deployments with CloudBuild
- ✅ **Educational**: Clean code, comprehensive documentation, real-world patterns

---

## ✨ Features

### Core Functionality
- 🔐 **Authentication & Authorization**: JWT-based auth with passport.js
- 🏨 **Reservation Management**: Create, update, cancel hotel bookings
- 💳 **Payment Processing**: Payment integration with Stripe
- 📧 **Notification System**: Email notifications for bookings, cancellations
- 📊 **Admin Dashboard**: Manage reservations, users, hotels

### Technical Features
- 🎯 **Microservices Architecture**: Independent, deployable services
- 🔄 **Event-Driven Communication**: RabbitMQ/NATS for async messaging
- 💾 **Database Per Service**: MongoDB with Mongoose
- 🐳 **Containerized**: Docker for local development
- ☸️ **Kubernetes-Ready**: Helm charts for production deployment
- 🚀 **GCP Integration**: Cloud Build, Artifact Registry, GKE

---

## 🛠 Tech Stack

### Backend Framework
- **NestJS** 10.x - Progressive Node.js framework
- **TypeScript** 5.x - Type-safe development
- **Node.js** 20.x - Runtime environment

### Microservices
| Service | Responsibility | Database |
|---------|---------------|----------|
| **Reservations** | Booking management | MongoDB |
| **Auth** | Authentication & authorization | MongoDB |
| **Payments** | Payment processing | MongoDB |
| **Notifications** | Email/SMS alerts | MongoDB |

### Infrastructure
- **Database**: MongoDB with Mongoose ODM
- **Message Broker**: RabbitMQ / NATS
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Kubernetes with Helm
- **Cloud Platform**: Google Cloud Platform (GCP)
  - Google Artifact Registry
  - Google Kubernetes Engine (GKE)
  - Cloud Build for CI/CD

### Testing
- **Unit Tests**: Jest
- **E2E Tests**: Supertest
- **Integration Tests**: Testcontainers

---

## 🏗 Architecture

### High-Level System Architecture

```
┌────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│          (Web App, Mobile App, Admin Panel)            │
└─────────────────────┬──────────────────────────────────┘
                      │ HTTPS/REST
                      ▼
┌────────────────────────────────────────────────────────┐
│                   API Gateway                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐       │
│  │  Auth    │─▶│   Rate   │─▶│   Routing    │       │
│  │  Guard   │  │  Limit   │  │   Logic      │       │
│  └──────────┘  └──────────┘  └──────────────┘       │
└───────────────────┬────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
   │  Auth   │ │Reserva- │ │Payments │ │ Notif   │
   │ Service │ │  tions  │ │ Service │ │ Service │
   │         │ │ Service │ │         │ │         │
   └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘
        │           │           │           │
        └───────────┴───────────┴───────────┘
                    │
              ┌─────┴─────┐
              ▼           ▼
        ┌──────────┐ ┌──────────┐
        │ RabbitMQ │ │ MongoDB  │
        │ (Events) │ │(Per Svc) │
        └──────────┘ └──────────┘
```

### Microservices Communication

1. **Synchronous**: REST API for immediate responses
2. **Asynchronous**: RabbitMQ/NATS for events (booking confirmation, payments)
3. **Database Per Service**: Each service owns its data

---

## 🚀 Quick Start

Get Wiser running locally in **5 minutes**:

### Prerequisites

- **Node.js** >= 20.x
- **Docker** & **Docker Compose**
- **Git**

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/hassonor/wiser.git
cd wiser

# 2. Install dependencies
npm install

# 3. Start MongoDB and RabbitMQ via Docker
docker-compose up -d

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Run database migrations (if any)
npm run migration:run

# 6. Start all microservices in development mode
npm run start:dev

# Access the API at http://localhost:3000
```

### Verification

```bash
# Health check
curl http://localhost:3000/health

# Test authentication
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 📁 Project Structure

```
wiser/
├── apps/                          # Microservices
│   ├── reservations/              # Reservation service
│   │   ├── src/
│   │   │   ├── dto/               # Data transfer objects
│   │   │   ├── entities/          # Database entities
│   │   │   ├── reservations.controller.ts
│   │   │   ├── reservations.service.ts
│   │   │   ├── reservations.module.ts
│   │   │   └── main.ts
│   │   ├── test/
│   │   └── Dockerfile
│   │
│   ├── auth/                      # Authentication service
│   │   ├── src/
│   │   │   ├── strategies/        # Passport strategies (JWT, local)
│   │   │   ├── guards/            # Auth guards
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── main.ts
│   │   └── Dockerfile
│   │
│   ├── payments/                  # Payment service
│   └── notifications/             # Notification service
│
├── libs/                          # Shared libraries
│   ├── common/                    # Common utilities
│   │   ├── database/              # Database connection
│   │   ├── decorators/            # Custom decorators
│   │   ├── filters/               # Exception filters
│   │   ├── interceptors/          # Logging, transform
│   │   └── guards/                # Shared guards
│   └── config/                    # Configuration module
│
├── k8s/                           # Kubernetes manifests
│   └── wiser/                     # Helm chart
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── reservations/
│           │   ├── deployment.yaml
│           │   └── service.yaml
│           ├── auth/
│           └── payments/
│
├── .cursorrules                   # AI coding standards
├── .github/
│   ├── dependabot.yml            # Automated dependency updates
│   └── workflows/                 # CI/CD pipelines
│
├── cloudbuild.yaml               # Google Cloud Build config
├── docker-compose.yaml           # Local development
├── nest-cli.json                 # NestJS configuration
├── package.json                  # Dependencies
└── README.md
```

---

## 🔧 Microservices

### Reservations Service
**Manages hotel bookings**

**Endpoints**:
```
POST   /reservations              # Create booking
GET    /reservations              # List all bookings
GET    /reservations/:id          # Get booking details
PATCH  /reservations/:id          # Update booking
DELETE /reservations/:id          # Cancel booking
```

**Events Published**:
- `reservation.created`
- `reservation.updated`
- `reservation.cancelled`

### Auth Service
**JWT-based authentication**

**Endpoints**:
```
POST   /auth/register            # User registration
POST   /auth/login               # User login
POST   /auth/refresh             # Refresh access token
GET    /auth/profile             # Get user profile
```

**Guards**:
- `JwtAuthGuard` - Protect routes with JWT
- `LocalAuthGuard` - Email/password authentication

### Payments Service
**Stripe integration**

**Endpoints**:
```
POST   /payments/charge          # Process payment
POST   /payments/refund          # Refund payment
GET    /payments/:id             # Get payment details
```

### Notifications Service
**Email/SMS notifications**

**Events Consumed**:
- `reservation.created` → Send confirmation email
- `reservation.cancelled` → Send cancellation email
- `payment.completed` → Send receipt

---

## 💻 Development

### Running Individual Services

```bash
# Start specific service
npm run start:dev reservations

# Build for production
npm run build reservations

# Run tests
npm run test reservations
npm run test:e2e reservations
```

### Environment Variables

Each service requires environment variables:

```env
# Reservations Service
MONGODB_URI=mongodb://localhost:27017/reservations
RABBITMQ_URL=amqp://localhost:5672
JWT_SECRET=your-secret-key
PORT=3001

# Auth Service
MONGODB_URI=mongodb://localhost:27017/auth
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
PORT=3002

# Payments Service
STRIPE_SECRET_KEY=sk_test_...
MONGODB_URI=mongodb://localhost:27017/payments
PORT=3003
```

### Code Generation

```bash
# Generate new module
nest g module users apps/reservations

# Generate service
nest g service users apps/reservations

# Generate controller
nest g controller users apps/reservations
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov
```

### E2E Tests

```bash
# Run E2E tests for a service
npm run test:e2e reservations
```

### Integration Tests

```bash
# Uses Testcontainers for real MongoDB
npm run test:integration
```

---

## 🚢 Deployment

### Docker Compose (Local/Staging)

```bash
# Build and start all services
docker-compose up --build

# Scale a service
docker-compose up --scale reservations=3

# View logs
docker-compose logs -f reservations

# Stop all
docker-compose down
```

---

## ☁️ Google Cloud Platform (GCP) Deployment

### 1. Enable Required APIs

```bash
# Enable Container Registry and Artifact Registry
gcloud services enable containerregistry.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 2. Create Artifact Registry Repository

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Create repository for each service
gcloud artifacts repositories create reservations \
  --repository-format=docker \
  --location=us-central1 \
  --description="Reservations service images"

# Repeat for auth, payments, notifications
```

### 3. Build & Push Docker Images

```bash
# Authenticate Docker
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build and push (example for reservations)
cd apps/reservations/
docker build -t reservations -f ./Dockerfile ../../
docker tag reservations us-central1-docker.pkg.dev/YOUR_PROJECT/reservations/production
docker push us-central1-docker.pkg.dev/YOUR_PROJECT/reservations/production
```

### 4. Automated CI/CD with Cloud Build

Create `cloudbuild.yaml` at project root:

```yaml
steps:
  # Build reservations service
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'us-central1-docker.pkg.dev/$PROJECT_ID/reservations/production'
      - '-f'
      - './apps/reservations/Dockerfile'
      - '.'

  # Push reservations service
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'us-central1-docker.pkg.dev/$PROJECT_ID/reservations/production'

  # Repeat for other services...

images:
  - 'us-central1-docker.pkg.dev/$PROJECT_ID/reservations/production'
  - 'us-central1-docker.pkg.dev/$PROJECT_ID/auth/production'
  - 'us-central1-docker.pkg.dev/$PROJECT_ID/payments/production'
  - 'us-central1-docker.pkg.dev/$PROJECT_ID/notifications/production'
```

**Set up Cloud Build Trigger**:
1. Go to Cloud Build → Triggers
2. Connect your GitHub repository
3. Create trigger to run on push to `main` branch
4. Use `cloudbuild.yaml` as build configuration

---

## ☸️ Kubernetes Deployment

### Local Kubernetes Setup

```bash
# Enable Kubernetes in Docker Desktop
# Settings → Kubernetes → Enable Kubernetes

# Install Helm
brew install helm  # macOS
choco install helm # Windows

# Verify installation
kubectl version
helm version
```

### Create Helm Chart

```bash
# Create Helm chart
cd k8s/
helm create wiser

# Create deployments for each service
kubectl create deployment reservations \
  --image=us-central1-docker.pkg.dev/PROJECT/reservations/production \
  --dry-run=client -o yaml > ./wiser/templates/reservations/deployment.yaml

# Create services
kubectl create service clusterip reservations \
  --tcp=3001:3001 \
  --dry-run=client -o yaml > ./wiser/templates/reservations/service.yaml

# Repeat for other services
```

### Deploy to Kubernetes

```bash
# Install/upgrade the Helm chart
helm upgrade --install wiser ./k8s/wiser \
  --set reservations.image=us-central1-docker.pkg.dev/PROJECT/reservations/production \
  --set auth.image=us-central1-docker.pkg.dev/PROJECT/auth/production

# Check deployment status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/reservations

# Scale deployment
kubectl scale deployment reservations --replicas=3
```

### Google Kubernetes Engine (GKE)

```bash
# Create GKE cluster
gcloud container clusters create wiser-cluster \
  --zone=us-central1-a \
  --num-nodes=3 \
  --machine-type=n1-standard-2

# Get credentials
gcloud container clusters get-credentials wiser-cluster --zone=us-central1-a

# Deploy using Helm
helm upgrade --install wiser ./k8s/wiser

# Set up Ingress for external access
kubectl apply -f k8s/ingress.yaml
```

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following `.cursorrules`
4. Write/update tests
5. Run linter: `npm run lint`
6. Commit: `git commit -m "feat: add amazing feature"`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/) - A progressive Node.js framework
- Inspired by production hotel booking platforms
- Created for educational purposes to demonstrate microservices architecture

---

<div align="center">

**Made with ❤️ by [Or Hasson](https://github.com/hassonor)**

⭐ Star this repo if you find it helpful!

</div>

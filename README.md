# Airbnb Clone API

A backend API for an Airbnb-inspired accommodation platform, built with NestJS and MongoDB.

> **Work in Progress**
>
> This project is actively under development. Features, architecture, and APIs may change as new functionality is implemented and the system evolves.

## Overview

The goal of this project is to build a production-oriented backend for an Airbnb-style platform while exploring practical backend engineering concepts such as authentication, authorization, file storage, API design, validation, database modeling, pagination, filtering, and scalable application architecture.

The project is being developed incrementally, with features and architectural improvements added over time.

## Tech Stack

* **NestJS**
* **TypeScript**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **Swagger / OpenAPI**
* **class-validator**
* **class-transformer**
* **AWS S3** for object storage
* **Jest / Supertest** for testing

## Project Status & Features

The project is intentionally being developed incrementally. Here is the current status:

### ✅ Implemented

* Authentication and JWT-based authorization
* User management & Role-based access control
* Country and city management
* Property/unit management
* Configurable storage driver with AWS S3 file upload support
* MongoDB data modeling with Mongoose
* Request validation using DTOs
* Pagination and filtering
* Swagger API documentation

### 🔄 In Progress

* Automated testing (Unit & E2E)
* Booking and reservation workflows

### 📅 Planned (Roadmap)

* Booking consistency and concurrency handling
* Idempotent operations & Transactional workflows
* Advanced authorization rules
* Performance and database optimization

## Getting Started

### Requirements

* Node.js (v18 or higher)
* npm or yarn
* MongoDB (Local or Atlas)

### Installation

Clone the repository:

```bash
git clone https://github.com/YousseifNady/airbnb-clone-api.git
cd airbnb-clone-api
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Update the environment variables in `.env`. Key variables include:
* `APP_PORT` - The port the API will run on.
* `MONGODB_URI` - Your MongoDB connection string.
* `JWT_SECRET` - Secret key for token generation.
* `AWS_S3_*` - AWS credentials for file uploads (if configured).

### Run the application

Development:

```bash
npm run start:dev
```

The API will start using the configured `APP_PORT`.

### API Documentation

Swagger documentation is available at:

```text
/api/docs
```

when the application is running.

## Testing

Run unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run tests with coverage:

```bash
npm run test:cov
```

## Development

The project is actively evolving. Architectural decisions may change as new requirements are introduced and existing parts of the system are refined.

The focus is not only on implementing CRUD functionality, but also on applying backend engineering practices that are relevant to real-world applications.

## License

This project is currently a personal learning and portfolio project and is under active development.

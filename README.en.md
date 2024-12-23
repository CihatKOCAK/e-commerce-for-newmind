# E-Commerce for NewMind Project

[For Turkish](README.md)

This project is an e-commerce platform developed for NewMind. It provides a system where users can view and purchase products, follow campaigns, and manage their carts. Additionally, it includes features such as product and campaign management for admin users.

The project consists of four different services: **backend**, **invoice-service**, **payment-service**, and **frontend**. These services can be run together using Docker and Docker Compose.

**Note:** Titles marked with ** direct you to the page containing the respective subheadings.

## Table of Contents

- [Setup](#setup)
- [Microservices Architecture **](microservices/README.md)
- [Backend Documentation **](backend/README.md)
- [Frontend Documentation - Screenshots **](frontend/README.md)
- [Postman Collection](#postman-collection)
- [Env Files](#env-files)

## Setup

### Requirements

- Node.js -v20.0.0
- Docker
- Docker Compose

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/CihatKOCAK/e-commerce-for-newmind.git
    cd e-commerce-for-newmind
    ```

2. Start the Docker containers:
    ```sh
    docker-compose up --build
    ```

3. The backend, invoice-service, payment-service, and frontend services will run at `http://localhost:3000`, `http://localhost:3001`, `http://localhost:3002`, and `http://localhost:3003` respectively.

## Postman Collection
You can find the Postman Collection (json) file [here](./ReadMeAssets/ecommerce.postman_collection.json).

## Env Files

- `backend/.env`
    ```env
    DEFAULT_ADMIN_EMAIL=admin@example.com
    DEFAULT_ADMIN_PASSWORD=securepassword123
    DEFAULT_ADMIN_USERNAME=admin
    JWT_SECRET=secretWord
    PORT=3000
    MONGO_URI=mongodb://mongo:27017/e-commerce
    KAFKA_HOST=kafka:9092
    ```
- `microservices/invoice-service/.env`
    ```env
    MONGO_URI=mongodb://mongo:27017/invoice
    ```
- `microservices/payment-service/.env`
    ```env
    MONGO_URI=mongodb://mongo:27017/payment
    ```
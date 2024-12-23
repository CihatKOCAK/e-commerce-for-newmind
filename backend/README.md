# Backend Dokümantasyonu

[For English](README.en.md)

Proje içerisinde yer alan **backend** servisi, kullanıcıların ve ürünlerin yönetimini sağlar.

## İçindekiler

- [API Dokümantasyonu](#API-Dokümantasyonu)
- [TechnoStack](#TechnoStack)
- [Dosya Yapısı](#Dosya-Yapısı)
- [Env Dosyası](#Env-Dosyası)

## API Dokümantasyonu

Postman Collection (json) dosyasını [buradan](../ReadMeAssets/ecommerce.postman_collection.json) indirebilirsiniz. Gerekli dummy verileri requestlerde mevcuttur. 

## TechnoStack
- Node.js
    - Express.js
    - mongoose
    - redis
    - winston
    - multer
    - bcrypt
    - jsonwebtoken
    - kafkajs
    - socket.io
    - cors
- Express.js
- MongoDB
- Redis
- Kafka
- Docker

## Dosya Yapısı
```sh
backend/
├── .env
├── .gitignore
├── config/
│   ├── database.js
│   ├── kafka.js
│   ├── logger.js
│   ├── multerConfig.js
│   └── redis.js
├── controllers/
│   ├── adminController.js
│   ├── basketController.js
│   ├── campaignController.js
│   ├── categoryController.js
│   ├── productController.js
│   ├── paymentController.js
│   └── userController.js
├── Dockerfile
├── index.js
├── logs/
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
├── models/
│   ├── basket.js
│   ├── campaign.js
│   ├── category.js
│   ├── product.js
│   └── user.js
├── package.json
├── routes/
│   ├── adminRoutes.js
│   ├── basketRoutes.js
│   ├── campaignRoutes.js
│   ├── categoryRoutes.js
│   ├── index.js
│   ├── productRoutes.js
│   ├── paymentRoutes.js
│   ├── userRoutes.js
│   └── uploadRoutes.js
├── services/
│   ├── kafka
│   │   ├── events
│   │   │ └── paymentCompaltedHandler.js
│   │   ├── client.js
│   │   ├── consumer.js
│   │   ├── connectKafka.js
│   │   ├── topics.js
│   │   └── producer.js
│   ├── adminService.js
│   ├── basketService.js
│   ├── campaignService.js
│   ├── categoryService.js
│   ├── productService.js
│   ├── fileUploadService.js
│   ├── initService.js # ilk kurulum için gerekli verileri ekler 'admin
│   └── userService.js
├── utils/
│   ├── logger.js
│   └── validator.js
```

## Env Dosyası
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


[Main README'ye dön](../README.md)
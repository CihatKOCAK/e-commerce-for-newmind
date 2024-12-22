# E Commerce for NewMind Projesi

[For English](README.en.md)

Bu proje, NewMind için geliştirilmiş bir e-ticaret platformudur. Proje, kullanıcıların ürünleri görüntüleyip satın alabileceği, kampanyaları takip edebileceği ve sepetlerini yönetebileceği bir sistem sunar. Ayrıca, admin kullanıcılar için ürün ve kampanya yönetimi gibi özellikler de içerir.

Proje, **backend**, **invoice-service**, **payment-service** ve **frontend** olmak üzere dört farklı servisten oluşur. Bu servisler, Docker ve Docker Compose kullanılarak bir arada çalıştırılabilir.

**Not:**  ** işaretleriyle işaretlenmiş olan başlıklar, bu başlık altındaki alt başlıkların olduğu sayfaya yönlendirir. 

## İçindekiler

- [Kurulum](#kurulum)
- [Microservices Yapısı **](microservices/README.md)
- [Backend Dokümantasyonu **](backend/README.md)
- [Frontend Dokümantasyonu - Screenshots **](frontend/README.md)
- [Postman Collection](#Postman-Collection)
- [Env Dosyaları](#Env-Dosyaları)

## Kurulum

### Gereksinimler

- Node.js -v20.0.0
- Docker
- Docker Compose

### Adımlar

1. Depoyu klonlayın:
    ```sh
    git clone https://github.com/CihatKOCAK/e-commerce-for-newmind.git
    cd e-commerce-for-newmind
    ```

2. Docker konteynerlerini başlatın:
    ```sh
    docker-compose up --build
    ```

3. Backend, invoice-service, payment-service ve frontend servisleri sırasıyla `http://localhost:3000`, `http://localhost:3001`, `http://localhost:3002`,  ve `http://localhost:3003` adreslerinde çalışacaktır.

## Postman Collection
Postman Collection (json) dosyasını [buradan](./ReadMeAssets/ecommerce.postman_collection.json) ulabilirsiniz.

## Env Dosyaları

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
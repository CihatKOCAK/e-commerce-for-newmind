# Node.js için uygun temel imajı seçiyoruz
FROM node:16

# Uygulamanın çalışacağı dizini oluşturuyoruz
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# Bağımlılıkları yüklüyoruz
RUN npm install

# Uygulama dosyalarını kopyalıyoruz
COPY . .

# Uygulama çalıştırmak için gerekli portu açıyoruz
EXPOSE 3002

# Uygulamayı başlatıyoruz
CMD ["npm", "run", "dev"]

# Base image olarak Node.js kullan
FROM node:20

# Uygulamanın çalışma dizini
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Gerekli paketleri yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamanın çalışacağı portu belirt
EXPOSE 3003

# Uygulamayı başlat
CMD ["npm", "start"]
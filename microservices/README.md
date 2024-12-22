# Payment Process Flow

[For English](README.en.md)

Bu doküman, ödeme işlemi sırasında gerçekleşen adımları ve sistemin nasıl çalıştığını açıklamaktadır.

## Akış Diyagramı Adımları

### Frontend:
1. Kullanıcı ödeme isteğini başlatır.
2. Frontend, backend'e ödeme isteği gönderir ve socket üzerinden ödeme durumunu dinlemeye başlar.

### Backend:
1. Ödeme isteğini alır.
2. Kafka'ya `"payment-request"` başlıklı bir mesaj gönderir.

### Payment Service:
1. Kafka'dan `"payment-request"` mesajını yakalar.
2. Ödemeyi işler.
3. İşlem tamamlandığında, backend'e Kafka üzerinden `"payment-completed"` mesajı gönderir.

### Backend:
1. Kafka'dan `"payment-completed"` mesajını yakalar.
2. Kullanıcıya başarı durumunu bildirir ve socket üzerinden frontend'e ödeme tamam mesajı gönderir.
3. Kafka'ya `"invoice-start"` başlıklı bir mesaj gönderir.

### Invoice Service:
1. Kafka'dan `"invoice-start"` mesajını yakalar.
2. Fatura oluşturma işlemini gerçekleştirir.
3. Başarılı bir şekilde tamamlandığında, Kafka'ya `"invoice-completed"` mesajı gönderir.

### Backend:
1. Kafka'dan `"invoice-completed"` mesajını yakalar. _(Not OK durumu için hata işleme ya da bildirim yapılabilir.)_

---

## Sistem Akışı

- **Frontend** üzerinden başlayan ödeme isteği, **Backend** aracılığıyla **Payment Service** ve **Invoice Service** mikro servislerine iletilir.
- Kafka, bu mikro servisler arasında mesajlaşmayı sağlar.
- Ödeme ve fatura işlemleri tamamlandığında, kullanıcı **Socket** üzerinden bilgilendirilir.

[Main README'ye dön](../README.md)
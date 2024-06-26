﻿# Book Hub

**Book Hub**'a hoş geldiniz! Bu proje, Ahmet Özkan Şahin tarafından geliştirilen bir Full Stack uygulamasıdır.

## Hakkında

Bu proje, modern web teknolojilerini kullanarak kullanıcı dostu ve ölçeklenebilir bir kitap kulübü uygulaması oluşturmayı amaçlamaktadır.

## Yazar

- **Ad:** Ahmet Özkan Şahin
- **Üniversite:** İstinye Üniversitesi
- **Bölüm:** Bilgisayar Mühendisliği (Son Sınıf)
- **Rol:** Full Stack Developer

## Kullanılan Teknolojiler

- **Frontend:**
  - React.js


- **Backend:**
  - Node.js
  - Fastify


- **Veritabanı:**
  - PostgreSQL


- **Diğer Araçlar:**
  - GitHub
  - Azure Blob Storage (Dosya yüklemeleri için)

## Kurulum

Proje dosyalarını klonlayın:
```bash
git clone https://github.com/Aozsah/Book-Hub.git
cd Book-Hub

Gerekli bağımlılıkları yüklemek için client ve server dizinlerine ayrı terminallerde girin ve aşağıdaki komutları çalıştırın:

**Client:**
```bash
cd client
npm install
npm start


**Server:**
```bash
cd server
npm install
npm start

**.env Dosyası**
Projenin kök dizininde bir .env dosyası oluşturmanız gerekmektedir. Bu dosya aşağıdaki başlıkları içermelidir:
DB_HOST
DB_PORT
DB_USER
DB_PASS
DB_NAME
PORT
JWT_SECRET
AZURE_STORAGE_ACCOUNT_NAME
AZURE_STORAGE_ACCOUNT_KEY
AZURE_STORAGE_STEELIFY_CONTAINER_NAME




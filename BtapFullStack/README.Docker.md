# Hướng dẫn chạy ứng dụng với Docker

## Cấu trúc Docker
- **MongoDB**: Container chạy cơ sở dữ liệu (port 27017)
- **Backend**: Container chạy Express API (port 5000)
- **Frontend**: Container chạy React với Vite (port 3000)

## Yêu cầu
- Docker Desktop đã cài đặt và đang chạy
- Docker Compose v3.8 trở lên

## Cách chạy

### 1. Chạy toàn bộ ứng dụng (MongoDB + Backend + Frontend)
```bash
docker-compose up -d
```

### 2. Xem logs
```bash
# Xem tất cả logs
docker-compose logs -f

# Xem log riêng từng service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 3. Dừng ứng dụng
```bash
docker-compose down
```

### 4. Dừng và xóa volumes (xóa dữ liệu MongoDB)
```bash
docker-compose down -v
```

### 5. Rebuild khi có thay đổi code
```bash
docker-compose up -d --build
```

### 6. Chỉ chạy MongoDB (nếu muốn chạy BE/FE local)
```bash
cd backend
docker-compose up -d
```

## Truy cập ứng dụng
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## Lưu ý
- Dữ liệu MongoDB được lưu trong thư mục `backend/mongodbdata`
- Backend tự động kết nối đến MongoDB container qua network nội bộ
- Frontend connect đến backend qua localhost:5000
- Thay đổi code sẽ tự động reload (hot-reload) nhờ volumes mount

## Troubleshooting

### Backend không kết nối được MongoDB
```bash
# Kiểm tra MongoDB đã chạy chưa
docker-compose ps

# Restart backend
docker-compose restart backend
```

### Port đã được sử dụng
Sửa port trong `docker-compose.yml` nếu port 3000, 5000, hoặc 27017 đã bị chiếm

### Xóa toàn bộ và chạy lại từ đầu
```bash
docker-compose down -v
docker-compose up -d --build
```

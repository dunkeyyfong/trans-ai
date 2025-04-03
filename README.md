# Các Lệnh chạy khi mới clone source code về

yarn run in-package

yarn run build && yarn run build:back

# Hướng dẫn để chạy lên docker

Đầu tiên, vào vscode, phần extension tải Docker về (trên máy cũng phải tải Docker)

Bật Docker trên máy lên

Nếu máy có yếu, thì khi bật máy lên sẽ có phần `Reopen in container`, ấn nó

ở file `docker-compose.yml`, ấn chuột phải và chọn các thứ sau

- db
- prisma-studio
- server-be
- server-fe

Danh sách các cổng localhost:

- ở FE dùng cổng 8080 (http://localhost:8080)
- ở BE dùng cổng 8085 (http://localhost:8085)
- ở db dùng cổng 3306 (Cổng này không truy cập được. Phải sử dụng prisma studio hoặc phpmyadmin)
- ở prisma studio dùng cổng 5553 (http://localhost:5553)
- ở phpmyadmin dùng cổng 9000 (http://localhost:9000) - tài khoản: root - mật khẩu: root

Hãy nhớ toàn bộ cổng này và chỉ cần chạy docker là xong, không phải chạy bất cứ lệnh gì như yarn run dev hay gì cả.

# Server

Khi thay đổi bất cứ điều gì trong schema.prisma, phải chạy lệnh

```
npx prisma migrate dev --name {thay_đổi gì_đó}
```

Ví dụ: Thêm trường title vào model History

```js
model History {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  content   String?
  title     String? //Đây
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Thì phải chạy như sau

```bash
npx prisma migrate dev --name update-history-title
```

Nhớ phải `cd server` trước khi chạy lệnh đó.

- Nếu có xảy ra lỗi này

```
dunkeyyfong@dunkeyyongsMini server % npx prisma migrate dev --name update-history-title
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MySQL database "transai" at "transai_db:3306"

Error: P1001: Can't reach database server at `transai_db:3306`

Please make sure your database server is running at `transai_db:3306`.
```

Thì vào file `.env`

chỉnh phần `transai_db:3306` thành `localhost:3306`. Chạy xong thì phải nhớ đổi lại từ `localhost:3306` thành `transai_db:3306`

## Hướng dẫn push docker image
docker buildx build --platform linux/amd64 --target production -t dunkeyyfong/kotoba:v1 . --push

## Tài liệu đặc tả hệ thông 
https://drive.google.com/file/d/1j0OGfwGl4HFmdM5mQlwl3NqNeHlCJCf_/view?usp=drive_link
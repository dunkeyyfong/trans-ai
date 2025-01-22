# Các Lệnh chạy khi mới clone source code về

yarn run in-package

yarn run build && yarn run build:back

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

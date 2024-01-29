# Giới thiệu về Moonshine Todo-app
![Logo](./assets/sunrise.png)

Chức năng của __Moonshine__ :
1. Hiển thị một câu trích dẫn có thể truyền cảm hứng, hiển thị thời gian hiện tại và hình nền ngẫu nhiên.
2. Lên kế hoạch cho các ngày.
3. Gửi lời nhắc cho bạn bè và đồng nghiệp về các công việc thông qua SMS và Email.
4. App có sẵn ở mọi nơi.

## Ảnh màn hình

![Thời gian hiện tại](./assets/Screenshot%202023-04-06%20at%201.01.25%20PM.png)
![Trung tâm thông báo của Moonshine](./assets/Screenshot%202023-04-07%20at%2011.40.35%20AM.png)
![Gửi email qua Moonshine](./assets/Screenshot%202023-04-07%20at%2011.31.40%20AM.png)
![Cập nhật todo và gửi lời nhắc sms](./assets/Screenshot%202023-04-07%20at%2011.34.46%20AM.png)

# Chạy web trên localhost

Trong đường dẫn thư mục front-end, sử dụng lệnh:

```bash
npm install
```
hoặc
```bash
npm i
```
Lệnh này sẽ cài đặt các package cần thiết cho project.  


```bash
npm start
```
Chạy ứng dụng ở môi trường develop

Mở [http://localhost:3000](http://localhost:3000) để xem trên trình duyệt

Dưới đây là kết quả khi chạy ứng dụng Moonshine ở localhost 

![Moonshine chạy trên localhost](./assets/Screenshot%202023-04-07%20at%2011.28.09%20AM.png)

# Biến môi trường

Để chạy project này, bạn cần thêm những biến môi trường sau vào file `.env`

`REACT_APP_NOVU_ID_FROM_ADMIN_PANEL`: Lấy từ trang quản lí novu

# Công nghệ sử dụng

## Client-side 
Novu, React, Redux, DotEnv, Axios, JWTEncode, Moment, React-Icons,...

## Server-side
Novu, Node, Express, MongoDB, Mongoose, BCrypt, JSONWebToken,...

## Triển khai
- Front-End: Vercel
- Back-End: Render

# Thông tin thêm
Repo này chỉ chứa code phần front-end và code phần back-end nằm [ở đây](https://github.com/hienhienn/todo-app-be) 

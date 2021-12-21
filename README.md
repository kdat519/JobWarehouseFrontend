# Job Warehouse (Front-end)

- Sử dụng:
    - Xây dựng UI: [React](https://reactjs.org/)
    - Điều hướng website: [React Router](https://reactrouter.com/)
    - Tạo form input: [Formik](https://formik.org/), [React Hook Form](https://react-hook-form.com/)
    - Style UI, hiệu ứng: [Bootstrap](https://getbootstrap.com/), [Framer Motion](https://www.framer.com/motion/), [sweetalert2](https://sweetalert2.github.io/)
- Quản lý package bằng [npm](https://www.npmjs.com/)
- Build bằng [Create React App](https://create-react-app.dev/)

## Get start

```bash
# Khởi tạo
npm install

# Chạy
npm start

# Build
npm run build
```

Đặt biến môi trường `REACT_APP_API_URL` là đường dẫn đến API trong file `.env`.

## Git workflow

Tách branch `feature/feature-name` từ branch `dev`, làm xong thì merge lại vào `dev`. \
Chuẩn bị release version tiếp theo thì tách branch `release/v-#` từ branch `dev`, hoàn thiện thì merge vào `master`

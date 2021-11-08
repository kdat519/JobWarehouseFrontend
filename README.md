# Job Warehouse (Front-end)

- Sử dụng:
    - Xây dựng UI: [React](https://reactjs.org/)
    - Điều hướng website: [React Router](https://reactrouter.com/)
    - Tạo form input: [Formik](https://formik.org/)
    - Style UI: [Bootstrap](https://getbootstrap.com/)
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

## Git workflow

Tách branch `feature/feature-name` từ branch `dev`, làm xong thì merge lại vào `dev`. \
Chuẩn bị release version tiếp theo thì tách branch `release/v-#` từ branch `dev`, hoàn thiện thì merge vào `master`

import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './styles.css';
import { useAuth } from "../../components/auth/AuthProvider";

export default function Login() {
    const auth = useAuth();
    const { login } = auth;


    const validationSchema = Yup.object().shape({
      email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
      password: Yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  return (
    <div className="card-body card">
        <h2 className="title">Đăng nhập</h2>
        <Link to="/register" className="link">Chưa có tài khoản? Đăng ký</Link>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
            <label>Email</label>
            <input name="email" 
              type="text" {...register('email')}
              placeholder="Nhập email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
            <label>Mật khẩu</label>
            <input name="password" 
              type="password" {...register('password')} 
              placeholder="Nhập mật khẩu"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="form-group">
        <button id="submit" type="submit" className="btn btn-primary">Đăng nhập</button>
        </div>

        </form>
    </div>
  );
}

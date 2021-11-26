import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './styles.css';

export default function Login() {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card-body">
        <h1 card-body>Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group col">
            <label>Email</label>
            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group col">
            <label>Mật khẩu</label>
            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="form-group">
        <button type="submit" className="btn btn-primary mr-1">Đăng nhập</button>
        </div>

        <Link to="/register">Đã có tài khoản? Đăng ký</Link>
        </form>
    </div>
  );
}

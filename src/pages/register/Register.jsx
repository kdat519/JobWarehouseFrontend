import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './styles.css';

export default function Register() {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card-body">
        <h1>Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group col">
            <label><input {...register('role')} type="radio" value="jobSeeker" />Tìm việc</label>
            <label><input {...register('role')} type="radio" value="employer" />Tuyển dụng</label>
        </div>
            
        <div className="form-group col">
            <label>Tên</label>
            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.name?.message}</div>
        </div>


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
        <div className="form-group col">
            <label>Xác nhận mật khẩu</label>
            <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>

        <div className="form-group">
        <button type="submit" className="btn btn-primary mr-1">Đăng ký</button>
        </div>


        <Link to="/login">Chưa có tài khoản? Đăng nhập</Link>
        </form>
    </div>
  );
}







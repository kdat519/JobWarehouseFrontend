import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './styles.css';
import { useAuth } from "../../components/auth/AuthProvider";


export default function Register() {
    const auth = useAuth();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Tên là bắt buộc'),
        email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
        password: Yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng nhau')
        .required('Xác nhận mật khẩu là bắt buộc'),
        address: Yup.string().required('Địa chỉ là bắt buộc'),
        phonenumber: Yup.string().required('Số điện thoại là bắt buộc'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

  const onSubmit = (data) => {
    auth.register(data);
  };

  return (
    <div className="card-body register__card">
        <h2 className="title">Đăng ký</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group col" id="role">
            <label><input {...register('role')} type="radio" value="jobseeker" defaultChecked/>Tìm việc</label>
            <label><input {...register('role')} type="radio" value="employer" />Tuyển dụng</label>
        </div>
            
        <div className="form-group col">
            <label>Tên</label>
            <input name="name" type="text" {...register('name')} 
            placeholder="Nhập tên"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.name?.message}</div>
        </div>


        <div className="form-group col">
            <label>Email</label>
            <input name="email" type="text" {...register('email')} 
            placeholder="Nhập email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>


        <div className="form-group col">
            <label>Mật khẩu</label>
            <input name="password" type="password" {...register('password')} 
            placeholder="Nhập mật khẩu"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group col">
            <label>Xác nhận mật khẩu</label>
            <input name="confirmPassword" type="password" {...register('confirmPassword')} 
            placeholder="Nhập lại mật khẩu"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>

        <div className="form-group col">
            <label>Địa chỉ</label>
            <input name="address" type="text" {...register('address')} 
            placeholder="Nhập địa chỉ"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.address?.message}</div>
        </div>

        <div className="form-group col">
            <label>Số điện thoại</label>
            <input name="phonenumber" type="text" {...register('phonenumber')} 
            placeholder="Nhập số điện thoại"
            className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.phonenumber?.message}</div>
        </div>

        <div className="form-group">
        <button id="submit" type="submit" className="btn btn-primary mr-1">Đăng ký</button>
        </div>
        
        </form>
        <div className="text-danger">{auth.error}</div>
        <div className="link"><Link to="/login">Đã có tài khoản? Đăng nhập</Link></div>
    </div>
  );
}







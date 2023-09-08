import { Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { localUserServ } from '../../service/localService';
import { userService } from '../../service/userService';
import { setLoginUser } from '../../toolkit/userSlice';


const LoginPage = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);

    let fillForm = () => {
        let info = localUserServ.get();
        if (info != null) {
            return info
        } else {
            return { username: "", passwords: "" }
        }
    }


    const onFinish = (values) => {
        userService.loginUser(values)
            .then((res) => {
                if (res.data.maLoaiNguoiDung === 'quantri') {
                    message.success("Đăng nhập thành công");
                    dispatch(setLoginUser(res.data));
                    localUserServ.set(res.data)
                    setTimeout(() => {
                        window.location.href = '/admin-lich-chieu'
                    }, 1500);
                } else {
                    message.error("Đăng nhập thất bại. Chỉ có quản trị viên mới được đăng nhập")
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setErrorMessage('Sai tài khoản hoặc mật khẩu')
                    message.error('Sai tài khoản hoặc mật khẩu!')
                } else if (err.response && err.response.status === 403) {
                    setErrorMessage('Đăng nhập thất bại. Chỉ có quản trị viên mới được đăng nhập')
                    message.error('Đăng nhập thất bại. Chỉ có quản trị viên mới được đăng nhập!')
                } else {
                    setErrorMessage('Lỗi không xác định!');
                    message.error('Lỗi không xác định!');
                }
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed', errorInfo);
    }

    return (
        <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10">
                    <div className="text-center">
                        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Đăng nhập</h1>
                        <p className="text-gray-500 dark:text-gray-400">Đăng Nhập Tài Khoản Quản Trị Viên</p>
                    </div>
                    <div className="m-7">
                        <Form initialValues={{
                            remember: true,
                            username: fillForm().username,
                            passwords: fillForm().passwords,
                        }} name="login" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tài khoản!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="you@company.com" />
                            </Form.Item>
                            <Form.Item
                                name="passwords"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Your Password" />
                            </Form.Item>
                            <Form.Item>
                                <button type="primary" htmlType="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">Đăng nhập</button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>
            <div className="fixed bottom-5 w-full text-center text-gray-400">
                Crafted with ♡ by <a className="text-blue-500" target="_blank" href="https://web3templates.com/components/">Web3Templates</a>
            </div>
        </div>
    )
}

export default LoginPage

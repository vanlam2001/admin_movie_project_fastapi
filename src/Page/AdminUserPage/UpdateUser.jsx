import { Button, Form, Input, message } from 'antd'
import { LockOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../service/adminService';
import { checkEmail, checkPassword, repeatPassword } from './Validation';

const UpdateUser = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);


    const onFinish = (values) => {
        const data = {
            username: values.username,
            confirm_password: values.confirm_password,
            password: values.password,
            full_name: values.full_name,
            phone_number: values.phone_number,
            email: values.email
        }
        let isValidation = checkPassword(values.password) && repeatPassword(values.password, values.confirm_password) && checkEmail(values.email)
        if (isValidation) {
            adminService.putUpdateUser(data, values.username)
                .then((res) => {
                    console.log(res)
                    message.success('Cập nhật thành công!');
                    navigate('/admin-users')
                })

                .catch((err) => {
                    if (err.response && err.response.status === 404) {
                        setErrorMessage('Không tìm thấy người dùng');
                    } else {
                        setErrorMessage(err.response.data);
                    }
                    message.error('Không tìm thấy người dùng!');
                    console.log(err)
                })
        } else {
            message.error('Vui lòng kiểm tra lại!');
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-xl text-amber-400 font-bold leading-tight tracking-tight md:text-2xl'>
                Cập nhật người dùng
            </h1>
            <Form
                className='!mt-4'
                method="post"
                encType="multipart/form-data"
                form={form}
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 450,
                    width: '100%'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={false}>
                <Form.Item
                    label="Nhập lại tên người dùng"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Mật khẩu của bạn' />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirm_password"
                    rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Mật khẩu của bạn' />
                </Form.Item>

                <Form.Item
                    label="Họ tên mới"
                    name="full_name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="SĐT mới"
                    name="phone_number"
                    rules={[{ required: true, message: 'Vui lòng nhập SĐT!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Email mới'
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className='text-center'
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button type="primary"
                        htmlType="submit"
                        className='text-white bg-amber-400'
                    >
                        Cập nhật người dùng mới
                    </Button>
                </Form.Item>

            </Form>

        </div>
    )
}

export default UpdateUser
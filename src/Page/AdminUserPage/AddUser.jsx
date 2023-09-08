import React from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { adminService } from '../../service/adminService';
const { Option } = Select;
import { checkEmail, checkPassword, repeatPassword } from './Validation';

const AddUser = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();



    const onFinish = (values) => {


        const data = {
            username: values.username,
            password: values.password,
            confirm_password: values.confirm_password,
            passwordNhapLai: values.passwordNhapLai,
            phone_number: values.phone_number,
            email: values.email,
            full_name: values.full_name,
            maLoaiNguoiDung: values.maLoaiNguoiDung,
            tenLoai: values.tenLoai
        }
        let isValidation = checkPassword(values.password) && repeatPassword(values.password, values.confirm_password) && checkEmail(values.email)
        if (isValidation) {
            adminService.postAddUser(data)
                .then((res) => {
                    console.log(res)
                    message.success('Thêm thành công')
                    navigate('/admin-users')
                })
                .catch((err) => {
                    message.error(err.response.data)
                    console.log(err)
                })
        } else {
            message.error('Vui lòng kiểm tra lại!');
        }

    }
    const onFinishFailed = (errInfo) => {
        console.log('Failed', errInfo)
    }
    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl'>
                Thêm người dùng
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
                    label="Nhập tên người dùng"
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
                    label="Họ tên mới"
                    name="full_name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Loại ND'
                    name="maLoaiNguoiDung"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống!',
                        },

                    ]}
                >
                    <Select
                        allowClear
                    >
                        <Option value="khachhang">Khách hàng</Option>
                        <Option value='quantri'>Quản trị</Option>
                    </Select>
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
                        className='text-white bg-green-500'
                    >
                        Cập nhật người dùng mới
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default AddUser
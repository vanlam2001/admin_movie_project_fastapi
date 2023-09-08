import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { rapService } from '../../service/rapService';

const AddRapPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = {
            maHeThongRap: values.maHeThongRap,
            tenHeThongRap: values.tenHeThongRap,
            biDanh: values.biDanh,
            logo: values.logo
        }
        rapService.postAddRap(data)
            .then((res) => {
                message.success('Thêm thành công')
                navigate('/admin-rap')
            })
            .catch((err) => {
                message.error(err.response.data)
            })
    }
    const onFinishFailed = (errInfo) => {
        console.log('Failed', errInfo)
    }
    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl'>
                Thêm Rạp
            </h1>
            <Form
                className='!mt-4'
                method="post"
                encType="multipart/form-data"
                name="basic"
                form={form}
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
                    label="Nhập mã hệ thống rạp"
                    name="maHeThongRap"
                    rules={[{ required: true, message: 'Vui lòng nhập mã hệ thống rạp!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập tên hệ thống rạp"
                    name="tenHeThongRap"
                    rules={[{ required: true, message: 'Vui lòng nhập tên hệ thống rạp!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập tên bí danh"
                    name="biDanh"
                    rules={[{ required: true, message: 'Vui lòng nhập bí danh!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dán Logo"
                    name="logo"
                    rules={[{ required: true, message: 'Vui lòng nhập logo!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
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
                        className='text-white bg-green-500'
                    >
                        Cập nhật người dùng mới
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default AddRapPage
import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { bannerService } from '../../service/bannerService';

const UpdateBanner = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);

    const onFinish = (values) => {
        const data = {
            maBanner: values.maBanner,
            tenBanner: values.tenBanner,
            banner: values.banner
        }

        bannerService.putUpdateBanner(data, values.maBanner)
            .then((res) => {
                console.log(res)
                message.success('Cập nhật thành công!');
                navigate('/admin-banner')
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setErrorMessage('Không tìm thấy banner');
                } else {
                    setErrorMessage(err.response.data);
                }
                message.error('Không tìn thấy banner!');
                console.log(err)
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-amber-400 font-bold  leading-tight tracking-tight md:text-2xl'>
                Cập nhật Banner
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
                    label="Nhập lại mã banner"
                    name="maBanner"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Tên banner mới hoặc cũ"
                    name="tenBanner"
                    rules={[{ required: true, message: 'Vui lòng nhập tên phim!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Hình ảnh banner"
                    name="banner"
                    rules={[{ required: true, message: 'Vui lòng nhập tên phim!' }]}
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
                        className='text-white bg-amber-400'
                    >
                        Cập nhật Banner mới
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default UpdateBanner
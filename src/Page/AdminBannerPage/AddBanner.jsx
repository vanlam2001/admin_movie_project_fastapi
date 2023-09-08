import React from 'react'
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { bannerService } from '../../service/bannerService';

const AddBanner = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = {
            maBanner: values.maBanner,
            tenBanner: values.tenBanner,
            banner: values.banner
        }
        bannerService.postAddBanner(data)
            .then((res) => {
                console.log(res)
                message.success('Thêm thành công')
                navigate('/admin-banner')
            })
            .catch((err) => {
                message.error(err.response.data)
                console.log(err)
            })
    }

    const onFinishFailed = (errInfo) => {
        console.log('Failed', errInfo)
    }

    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl'>
                Thêm Banner
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
                    label="Nhập mã banner"
                    name="maBanner"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Nhập tiêu đề banner"
                    name="tenBanner"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
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
                        className='text-white bg-green-500'
                    >
                        Thêm Banner mới
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default AddBanner
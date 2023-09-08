import { Button, Form, Input, message } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { lichChieuService } from '../../service/lichChieuService';

const AddLichChieuPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = {
            maPhim: values.maPhim,
            maLichChieu: values.maLichChieu,
            ngayChieuGioChieu: values.ngayChieuGioChieu,
            maRap: values.maRap,
            giaVe: values.giaVe,
            thoiluong: values.thoiluong
        }
        lichChieuService.putUpdateLichChieu(data)
            .then((res) => {
                message.success('Thêm lịch chiếu')
                navigate('/admin-lich-chieu')
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
                Thêm Lịch chiếu
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
                    label="Nhập mã lịch chiếu"
                    name="maLichChieu"
                    rules={[{ required: true, message: 'Vui lòng nhập mã lịch chiếu!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}>
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Nhập mã Phim"
                    name="maPhim"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}>
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Nhập ngày chiếu giờ chiếu"
                    name="ngayChieuGioChieu"
                    rules={[{ required: true, message: 'Vui lòng nhập ngày chiếu giờ chiếu!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập mã rạp"
                    name="maRap"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}>
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Nhập giá vé"
                    name="giaVe"
                    rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}>
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Nhập thời lượng"
                    name="thoiluong"
                    rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}>
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
                        Thêm lịch chiếu mới
                    </Button>
                </Form.Item>




            </Form>
        </div>
    )
}

export default AddLichChieuPage
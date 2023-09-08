import React, { useState } from 'react'
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../../service/movieService';
const { Option } = Select;



const trueFalseOptions = [
    { label: 'Có', value: true },
    { label: 'Không', value: false },
];


const AddMoviePage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);

    const onFinish = (values) => {
        const data = {
            maPhim: values.maPhim,
            tenPhim: values.tenPhim,
            biDanh: values.biDanh,
            trailer: values.trailer,
            hinhAnh: values.hinhAnh,
            moTa: values.moTa,
            ngayKhoiChieu: values.ngayKhoiChieu,
            danhGia: values.danhGia,
            hot: values.hot,
            dangChieu: values.dangChieu,
            sapChieu: values.sapChieu
        }
        movieService.postAddMovie(data)
            .then((res) => {
                console.log(res)
                message.success('Thêm thành công')
                navigate('/admin-users')
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setErrorMessage('Không tìm thấy mã phim');
                    message.error('Không tìm thấy mã phim!');
                } else {
                    setErrorMessage('Lỗi không xác định!');
                    message.error('Lỗi không xác định!');
                }
            })

    }

    const onFinishFailed = (errInfo) => {
        console.log('Failed', errInfo)
    }

    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl'>
                Thêm phim
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
                    label="Nhập mã phim"
                    name="maPhim"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phim!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Nhập tên phim"
                    name="tenPhim"
                    rules={[{ required: true, message: 'Vui lòng nhập tên phim!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập bí danh"
                    name="biDanh"
                    rules={[{ required: true, message: 'Vui lòng nhập bí danh!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập trailer"
                    name="trailer"
                    rules={[{ required: true, message: 'Vui lòng nhập trailer!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gắn hình ảnh"
                    name="hinhAnh"
                    rules={[{ required: true, message: 'Gắn hình ảnh!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập mô tả"
                    name="moTa"
                    rules={[{ required: true, message: 'Nhập mô tả!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ngày khởi chiếu"
                    name="ngayKhoiChieu"
                    rules={[{ required: true, message: 'Ngày khởi chiếu!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập đánh giá"
                    name="danhGia"
                    rules={[{ required: true, message: 'Nhập đánh giá!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input type="number" />
                </Form.Item>

                {/* Select for "hot" */}
                <Form.Item
                    label='Phim Hot'
                    name='hot'
                    rules={[{ required: true, message: 'Please select Hot status!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Select options={trueFalseOptions} />
                </Form.Item>

                {/* Select for "dangChieu" */}
                <Form.Item
                    label='Đang Chiếu'
                    name='dangChieu'
                    rules={[{ required: true, message: 'Please select Đang Chiếu status!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Select options={trueFalseOptions} />
                </Form.Item>


                {/* Select for "sapChieu" */}
                <Form.Item
                    label='Sắp Chiếu'
                    name='sapChieu'
                    rules={[{ required: true, message: 'Please select Sắp Chiếu status!' }]}
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Select options={trueFalseOptions} />
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

export default AddMoviePage
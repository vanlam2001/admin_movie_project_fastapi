import React, { useState } from 'react';
import { Form, message, Button, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { cumRapService } from '../../service/cumRapService';

const AddCumRapPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [errorMessage, setErrorMessage] = useState(null);

    const onFinish = (values) => {

        const data = {
            maHeThongRap: values.maHeThongRap,
            maCumRap: values.maCumRap,
            tenCumRap: values.tenCumRap,
            diaChia: values.diaChia,
            danhSachRap: values.danhSachRap.map((rap) => ({
                maRap: rap.maRap,
                tenRap: rap.tenRap,
            })),
        };

        cumRapService
            .postAddCumRap(data)
            .then((res) => {
                message.success('Thêm thành công');
                navigate('/admin-cum-rap');
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setErrorMessage('Không tìm thấy mã hệ thống rạp');
                    message.error('Không tìm thấy mã hệ thống rạp!');
                } else if (err.response && err.response.status === 400) {
                    setErrorMessage('Lỗi mã trạng thái 400!');
                    message.error('Không tìm thấy mã rạp!');
                } else {
                    setErrorMessage('Lỗi không xác định!');
                    message.error('Lỗi không xác định!');
                }
            })

    };

    const onFinishFailed = (errInfo) => {
        console.log('Failed', errInfo);
    };

    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl'>
                Thêm cụm rạp
            </h1>
            <Form
                className='!mt-4'
                method='post'
                encType='multipart/form-data'
                name='basic'
                form={form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 450,
                    width: '100%',
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                requiredMark={false}
            >
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
                    label="Nhập mã cụm rạp"
                    name="maCumRap"
                    rules={[{ required: true, message: 'Vui lòng nhập cụm rạp!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập tên cụm rạp"
                    name="tenCumRap"
                    rules={[{ required: true, message: 'Vui lòng nhập tên cụm rạp!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nhập địa chỉ"
                    name="diaChia"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    labelCol={{ span: 9 }} // Số cột chiếm cho label
                    wrapperCol={{ span: 16 }} // Số cột chiếm cho input
                >
                    <Input />
                </Form.Item>

                <Form.List
                    name='danhSachRap'
                    initialValue={[{ maRap: '', tenRap: '' }]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex', marginBottom: 8 }}
                                    align='baseline'
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'maRap']}
                                        fieldKey={[fieldKey, 'maRap']}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập mã rạp!' },
                                        ]}
                                    >
                                        <Input type='number' placeholder='Mã rạp' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'tenRap']}
                                        fieldKey={[fieldKey, 'tenRap']}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập tên rạp!' },
                                        ]}
                                    >
                                        <Input placeholder='Tên rạp' />
                                    </Form.Item>
                                    <Button
                                        type='danger'
                                        onClick={() => {
                                            remove(name);
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type='dashed'
                                    onClick={() => {
                                        add();
                                    }}
                                >
                                    Thêm Rạp
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item
                    className='text-center'
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='text-white bg-green-500'
                    >
                        Thêm cụm rạp mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCumRapPage;

import { Tag } from "antd"
import { localUserServ } from "../../service/localService"


export const headerColums = [
    {
        title: "Tài khoản",
        dataIndex: "username",
        key: "username"
    },
    {
        title: "Tên người dùng",
        dataIndex: "full_name",
        key: "full_name",
        responsive: ["md"],
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone_number",
        key: "phone_number",
        responsive: ["md"],
    },
    {
        title: "Loại người dùng",
        dataIndex: "maLoaiNguoiDung",
        key: "maLoaiNguoiDung",
        render: (khach_hang) => {
            if (khach_hang == "khachhang") {
                return <Tag className="font-medium" color="green">Khách hàng</Tag>
            } else {
                return <Tag className="font-medium" color="red">Quản trị</Tag>
            }
        }
    },
    {
        title: "Chức năng",
        dataIndex: "action",
        key: "action",
        hidden: localUserServ.get()?.maLoaiNguoiDung === 'quantri' ? false : true,
    }
].filter((item) => {
    return !item.hidden
})


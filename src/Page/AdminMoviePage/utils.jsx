import { localUserServ } from "../../service/localService";

export const headerColums = [
    {
        title: "Mã phim",
        dataIndex: "maPhim",
        key: "maPhim"
    },
    {
        title: "Tên phim",
        dataIndex: "tenPhim",
        key: "tenPhim",
        responsive: ["md"],
    },

    {
        title: "Bí danh",
        dataIndex: "biDanh",
        key: "biDanh",
        responsive: ["md"],
    },

    {
        title: "Trailer",
        dataIndex: "trailer",
        key: "trailer",
        responsive: ["md"],
    },

    {
        title: "hinhAnh",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        width: "10%",
        responsive: ["md"],
        render: (url) => {
            return <img src={url} className="w-20" />

        }
    },

    {
        title: "Mô tả",
        dataIndex: "moTa",
        key: "moTa",
        responsive: ["md"],
    },
    {
        title: "Ngày khởi chiếu",
        dataIndex: "ngayKhoiChieu",
        key: "ngayKhoiChieu",
        responsive: ["md"],
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


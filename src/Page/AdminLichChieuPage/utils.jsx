import { localUserServ } from "../../service/localService";

export const headerColums = [
    {
        title: "Mã phim",
        dataIndex: "maPhim",
        key: "maPhim"
    },

    {
        title: "Mã lịch chiếu",
        dataIndex: "maLichChieu",
        key: "maLichChieu",
        responsive: ["md"],
    },
    {
        title: "Ngày chiếu giờ chiếu",
        dataIndex: "ngayChieuGioChieu",
        key: "ngayChieuGioChieu",
        responsive: ["md"],
    },
    {
        title: "Mã rạp",
        dataIndex: "maRap",
        key: "maRap",
        responsive: ["md"],
    },
    {
        title: "Giá vé",
        dataIndex: "giaVe",
        key: "giaVe",
        responsive: ["md"],
    },
    {
        title: "Thời lượng",
        dataIndex: "thoiluong",
        key: "thoiluong",
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
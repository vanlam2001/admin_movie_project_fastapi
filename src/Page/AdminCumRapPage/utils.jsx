import { localUserServ } from "../../service/localService";

export const headerColums = [
    {
        title: "Mã hệ thống rạp",
        dataIndex: "maHeThongRap",
        key: "maHeThongRap"
    },

    {
        title: "Mã cụm rạp",
        dataIndex: "maCumRap",
        key: "maCumRap",
        responsive: ["md"],
    },

    {
        title: "Tên cụm rạp",
        dataIndex: "tenCumRap",
        key: "tenCumRap",
        responsive: ["md"],
    },

    {
        title: "Địa chỉ",
        dataIndex: "diaChia",
        key: "diaChia",
        responsive: ["md"],
    },

    {
        title: "danhSachRap",
        dataIndex: "danhSachRap",
        key: "danhSachRap",
        responsive: ["md"],
        render: (danhSachRap) => danhSachRap.map((rap) => rap.tenRap).join(", ")
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
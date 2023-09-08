import { localUserServ } from "../../service/localService"

export const headerColums = [
    {
        title: "Mã hệ thống rạp",
        dataIndex: "maHeThongRap",
        key: "maHeThongRap"
    },

    {
        title: "Tên hệ thống rạp",
        dataIndex: "tenHeThongRap",
        key: "tenHeThongRap",
        responsive: ["md"],
    },

    {
        title: "Bí danh",
        dataIndex: "biDanh",
        key: "biDanh",
        responsive: ["md"],
    },

    {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        width: "10%",
        responsive: ["md"],
        render: (url) => {
            return <img src={url} className="w-20" />
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
import { localUserServ } from "../../service/localService"

export const headerColums = [
    {
        title: "Mã Banner",
        dataIndex: "maBanner",
        key: "maBanner",
    },

    {
        title: "Tên Banner",
        dataIndex: "tenBanner",
        key: "tenBanner",
        responsive: ["md"],
    },

    {
        title: "Banner",
        dataIndex: "banner",
        key: "banner",
        width: "50%",
        responsive: ["md"],
        render: (url) => {
            return <img src={url} className="w-100" />
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
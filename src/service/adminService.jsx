import { https } from "./config"

export const adminService = {
    getUserList: () => {
        return https.get("/api/Danh-sach-nguoi-dung")
    },
    deleteUser: (username) => {
        return https.delete(`/api/Xoa-tai-khoan/${username}`)
    },
    getSearchUser: (keywords) => {
        return https.get(`/api/Tim-kiem?query=${keywords}`)
    },
    putUpdateUser: (data, username) => {
        return https.put(`/api/Chinh-sua-thong-tin/${username}`, data)
    },
    postAddUser: (data) => {
        return https.post('/api/Dang-ky', data)
    },
}
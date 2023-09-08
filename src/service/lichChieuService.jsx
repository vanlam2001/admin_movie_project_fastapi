import { https } from "./config"

export const lichChieuService = {
    getLichChieuList: () => {
        return https.get("/api/Lay-danh-sach-lich-chieu")
    },
    deleteLichChieu: (lich) => {
        return https.delete(`/api/Xoa-lich-chieu/${lich}`)
    },
    getSearchLichChieu: (keywords) => {
        return https.get(`/api/Tim-thong-tin-lich-chieu?maLichChieu=${keywords}`)
    },
    postAddLichChieu: (data) => {
        return https.post('/api/Tao-lich-chieu', data)
    },
    putUpdateLichChieu: (data, lichChieu) => {
        return https.put(`/api/Cap-nhat-lich-chieu/${lichChieu}`, data)
    }
}
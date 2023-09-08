import { https } from "./config"

export const cumRapService = {
    getCumRapList: () => {
        return https.get("/api/Lay-danh-sach-cum-rap")
    },
    postAddCumRap: (data) => {
        return https.post('/api/Tao-thong-tin-cum-rap', data)
    },
    updateCumRap: (data, cumRap) => {
        return https.put(`/api/Cap-nhat-thong-tin-cum-rap/${cumRap}`, data)
    },
    getSearchCumRap: (keywords) => {
        return https.get(`/api/Tim-thong-tin-cum-rap?maHeThongRap=${keywords}`)
    },
    deleteCumRap: (cumRap) => {
        return https.delete(`/api/Xoa-thong-tin-cum-rap/${cumRap}`)
    }
}
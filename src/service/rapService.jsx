import { https } from "./config"

export const rapService = {
    getRapList: () => {
        return https.get("/api/Lay-danh-thong-tin-he-thong-rap")
    },
    getSearchRap: (keywords) => {
        return https.get(`/api/Tim-thong-tin-he-thong-rap?maHeThongRap=${keywords}`)
    },
    postAddRap: (data) => {
        return https.post('/api/Tao-thong-tin-he-thong-rap', data)
    },
    putUpdateRap: (data, rap) => {
        return https.put(`/api/Cap-nhat-thong-tin-he-thong-rap/${rap}`, data)
    },
    deleteRap: (rap) => {
        return https.delete(`/api/Xoa-thong-tin-he-thong-rap/${rap}`)
    }
}
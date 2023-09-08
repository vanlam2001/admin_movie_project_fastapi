import { https } from "./config"

export const bannerService = {
    getBannerList: () => {
        return https.get("/api/Lay-danh-sach-banner")
    },
    postAddBanner: (data) => {
        return https.post("/api/Tao-banner", data)
    },
    putUpdateBanner: (data, banner) => {
        return https.put(`/api/Cap-nhat-Banner/${banner}`, data)
    },
    getSearchBanner: (keywords) => {
        return https.get(`/api/Tim-thong-tin-banner/?tenBanner=${keywords}`)
    },
    deleteBanner: (banner) => {
        return https.delete(`/api/Xoa-banner/${banner}`)
    }
}
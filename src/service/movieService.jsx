import { https } from "./config"

export const movieService = {
    getMovieList: () => {
        return https.get("/api/Lay-danh-sach-phim")
    },
    postAddMovie: (data) => {
        return https.post('/api/Tao-danh-sach-phim', data)
    },
    deleteMovie: (movie) => {
        return https.delete(`/api/Xoa-phim/${movie}`)
    },
    getSearchMovie: (keywords) => {
        return https.get(`/api/Lay-thong-tin-phim?maPhim=${keywords}`)
    },
    putUpdateMovie: (data, movie) => {
        return https.put(`/api/cap-nhat-thong-tin-phim/${movie}`, data)
    }
}
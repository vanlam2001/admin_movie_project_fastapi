import LoginPage from "../Page/LoginPage/LoginPage";
import AdminLayout from "../Layout/AdminLayout"
import AdminUserPage from "../Page/AdminUserPage/AdminUserPage";
import AdminMoviePage from "../Page/AdminMoviePage/AdminMoviePage";
import { localUserServ } from "../service/localService";
import UpdateUser from "../Page/AdminUserPage/UpdateUser";
import AddUser from "../Page/AdminUserPage/AddUser";
import AddMoviePage from "../Page/AdminMoviePage/AddMoviePage";
import UpdateMovie from "../Page/AdminMoviePage/UpdateMovie";
import AdminBannerPage from "../Page/AdminBannerPage/AdminBannerPage";
import AddBanner from "../Page/AdminBannerPage/AddBanner";
import UpdateBanner from "../Page/AdminBannerPage/UpdateBanner";
import AdminRapPage from "../Page/AdminRapPage/AdminRapPage";
import AddRapPage from "../Page/AdminRapPage/AddRapPage";
import UpdateRapPage from "../Page/AdminRapPage/UpdateRapPage";
import AdminCumRapPage from "../Page/AdminCumRapPage/AdminCumRapPage";
import AddCumRapPage from "../Page/AdminCumRapPage/AddCumRapPage";
import UpdateCumRapPage from "../Page/AdminCumRapPage/UpdateCumRapPage";
import AdminLichChieuPage from "../Page/AdminLichChieuPage/AdminLichChieuPage";
import AddLichChieuPage from "../Page/AdminLichChieuPage/AddLichChieuPage";
import UpdateLichChieuPage from "../Page/AdminLichChieuPage/UpdateLichChieuPage";

const isAuthenticated = () => {
    const userInfo = localUserServ.get();
    return userInfo !== null;
};



export const adminRoute = [
    {
        url: "/login",
        component: isAuthenticated() ? <AdminLayout Component={AdminUserPage} /> : <LoginPage />
    },
    {
        url: "/",
        component: isAuthenticated() ? <AdminLayout Component={AdminUserPage} /> : <LoginPage />
    },
    // quản lý user 
    {
        url: "/admin-users",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AdminUserPage} />
            : (
                <div>
                    {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}
                </div>
            )
    },
    {
        url: "/admin-update-user/:id",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={UpdateUser} />
            : (
                <div>
                    {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}
                </div>
            )
    },
    {
        url: "/admin-add-user",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AddUser} />
            : (
                <div>
                    {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}
                </div>
            )
    },
    // quản lý phim
    {
        url: "/admin-movie",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AdminMoviePage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-add-movie",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AddMoviePage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-update-movie/:id",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={UpdateMovie} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },
    // quản lý banner
    {
        url: "/admin-banner",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AdminBannerPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },
    {
        url: "/admin-add-banner",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AddBanner} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },
    {
        url: "/admin-update-banner/:id",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={UpdateBanner} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    // quản lý rạp
    {
        url: "/admin-rap",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AdminRapPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-them-rap",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AddRapPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-update-rap/:id",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={UpdateRapPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    // Cụm rạp
    {
        url: "/admin-cum-rap",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AdminCumRapPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },
    {
        url: "/admin-them-cum-rap",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AddCumRapPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-update-cum-rap/:id",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={UpdateCumRapPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    // Lịch chiếu 
    {
        url: "/admin-lich-chieu",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AdminLichChieuPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-them-lich-chieu",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={AddLichChieuPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    },

    {
        url: "/admin-update-lich-chieu/:id",
        component: localUserServ.get()?.maLoaiNguoiDung === 'quantri'
            ? <AdminLayout Component={UpdateLichChieuPage} />
            : (
                <div> {localUserServ.get() ? "Chỉ có quản trị viên mới có thể sử dụng chức năng này" : "Bạn phải đăng nhập quản trị viên"}</div>
            )
    }








]



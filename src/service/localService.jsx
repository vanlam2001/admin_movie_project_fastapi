export const ADMIN_INFO = "ADMIN_INFO";
export const localUserServ = {
    // * khởi tạo object gồm các phương thức liên quan tới user và localstorage 
    get: () => {
        // * lấy dữ liệu từ localStorage lên -> đổ vào headerInfo (D)
        let jsonData = localStorage.getItem(ADMIN_INFO);
        // return jsonData ? JSON.parse(jsonData) : ""
        if (jsonData !== "" && jsonData !== "undifined") {
            return JSON.parse(jsonData) ? JSON.parse(jsonData) : null;
        }
    },
    set: (userInfo) => {
        // * sau khi login thành công -> lưu userInfo xuống localStorage (Q)
        let jsonData = userInfo ? JSON.stringify(userInfo) : "";
        localStorage.setItem(ADMIN_INFO, jsonData);
    },
    remove: () => {
        // * sau khi người dùng sign-out -> xóa userInfo ở localStorage (D)
        localStorage.removeItem(ADMIN_INFO);
    }
}


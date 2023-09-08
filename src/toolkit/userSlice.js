import { createSlice } from "@reduxjs/toolkit";
import { localUserServ } from "../service/localService";

const initialState = {
    userInfo: localUserServ.get(),
    infoAccoutUser: {},
    isFormUpdate: false,
    infoUserDetail: {}
}



const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },

        setLoginUser: (state, action) => {
            state.userInfo = action.payload;
        },

        setInfoAccountUser: (state, action) => {
            state.infoAccoutUser = action.payload;
        },

        setFormUpdateUser: (state, action) => {
            state.isFormUpdate = action.payload
        },
        setInfoUserDetail: (state, action) => {
            state.infoUserDetail = action.payload
        },
    }
})



export const { setUserInfo, setLoginUser, setInfoAccountUser, setFormUpdateUser, setInfoUserDetail } = userSlice.actions
export default userSlice.reducer



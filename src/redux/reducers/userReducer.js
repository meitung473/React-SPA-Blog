import { createSlice } from "@reduxjs/toolkit";
import { handleregister, login, getMe } from "../../WebAPI";

export const userReducer = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        userData: null,
        newUserResponse: null,
        loginResponse: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setloginResponse: (state, action) => {
            state.loginResponse = action.payload;
        },
        setisLoadingLogin: (state, action) => {
            state.isLoading = action.payload;
        },
        setnewUserResponse: (state, action) => {
            state.newUserResponse = action.payload;
        },
    },
});
export const {
    setnewUserResponse,
    setUser,
    setloginResponse,
    setisLoadingLogin,
} = userReducer.actions;

//登入後拿到 token
export const loginAPI = (username, password) => (dispatch) => {
    return login(username, password).then((res) => {
        return res;
    });
};
//拿到驗證後的 user 資料，這邊只拿到結果，判斷到另一邊寫
export const getUserAuth = () => (dispatch) => {
    return getMe().then((userdata) => {
        return userdata;
    });
};

export const registerAPI = (nickname, username, password) => (dispatch) => {
    return handleregister(nickname, username, password).then((res) => {
        return res;
    });
};

export default userReducer.reducer;

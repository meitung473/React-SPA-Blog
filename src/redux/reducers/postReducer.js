import { createSlice } from "@reduxjs/toolkit";
import {
    getPost,
    addPost,
    deletePost,
    getMyPosts,
    editPost,
} from "../../WebAPI";

export const postReducer = createSlice({
    name: "post",
    initialState: {
        isLoadingPost: false,
        post: null,
        newPostResponse: null,
        EditingPostResponse: null,
        //my posts,
        myPosts: null,
    },
    reducers: {
        // single post
        setIsLoadingPost: (state, action) => {
            state.isLoadingPost = action.payload;
        },
        setPost: (state, action) => {
            state.post = action.payload;
        },
        // addPost
        newPostResponse: (state, action) => {
            state.newPostResponse = action.payload;
        },
        setEditingPostResponse: (state, action) => {
            state.EditingPostResponse = action.payload;
        },
        //
        setmyPosts: (state, action) => {
            state.myPosts = action.payload;
        },
    },
});
export const {
    setIsLoadingPost,
    setPost,
    newPostResponse,
    setPostsLength,
    setEditingPostResponse,
    setmyPosts,
} = postReducer.actions;
// 單篇
export const getPostAPI = (id) => (dispatch) => {
    return getPost(id)
        .then((post) => {
            dispatch(setPost(post));
            return post;
        })
        .catch((err) => console.log(err));
};
// 新增文章
export const addPostAPI = (data) => (dispatch) => {
    const { title, body } = data;
    return addPost(title, body).then((res) => {
        dispatch(newPostResponse(res));
        return res;
    });
};

// 抓取該使用者所有文章
export const getUserPostsAPI = (userId) => (dispatch) => {
    return getMyPosts(userId)
        .then((res) => {
            dispatch(setmyPosts(res));
            dispatch(setIsLoadingPost(false));
            return res;
        })
        .catch((err) => {
            dispatch(setIsLoadingPost(false));
            return err;
        });
};
// 刪除
export const deletePostsAPI = (id) => (dispatch) => {
    dispatch(setIsLoadingPost(true));
    return deletePost(id)
        .then((res) => {
            dispatch(setIsLoadingPost(false));
            return res;
        })
        .catch((err) => {
            console.log(err);
            dispatch(setIsLoadingPost(false));
        });
};
// 編輯
export const editPostAPI = (data) => (dispatch) => {
    return editPost(data)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export default postReducer.reducer;

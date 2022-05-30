import { getAuthToken } from "./utiles";

const BASE_URL = "https://student-json-api.lidemy.me";
const limit = 5;
// 拿到所有文章的標題
export const getPostsAPI = () => {
    return fetch(
        `${BASE_URL}/posts?_sort=createdAt&_order=desc&_expand=user`
    ).then((res) => {
        return res.json();
    });
};
//分頁文章
export const getLimitPostsAPI = (page) => {
    return fetch(
        `${BASE_URL}/posts?_sort=createdAt&_order=desc&_limit=${limit}&_page=${page}&_expand=user`
    );
};
// 拿到自己的文章
export const getMyPosts = (userId) => {
    return fetch(
        `${BASE_URL}/posts?userId=${userId}&_sort=createdAt&_order=desc&_expand=user`
    ).then((res) => res.json());
};
// 拿到一篇文章的內容
export const getPost = (id) => {
    return fetch(`${BASE_URL}/posts/${id}?_expand=user`).then((res) => {
        return res.json();
    });
};

// 新增一篇文章
export const addPost = (title, body) => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
            //做東西之前都要驗證
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            title,
            body,
        }),
    }).then((res) => res.json());
};
//刪除文章
export const deletePost = (id) => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            //做東西之前都要驗證
            authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
};
// 編輯
export const editPost = ({ id, title, body }) => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
            //做東西之前都要認證
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            id,
            title,
            body,
        }),
    }).then((res) => res.json());
};
// -------------------------------
// 登入
export const login = (username, password) => {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((res) => res.json());
};

//身分驗證
export const getMe = () => {
    const token = getAuthToken();
    return fetch(`${BASE_URL}/me`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
};

// 註冊用
export const handleregister = (nickname, username, password) => {
    return fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nickname,
            username,
            password,
        }),
    }).then((res) => res.json());
};

//--------------
// get all comments
export const getComments = (count = 1, load = 1) => {
    return fetch(
        `${BASE_URL}/comments?_sort=createdAt&_order=desc&_start=${count}&_limit=${load}`
    );
};
export const addComment = (nickname, body) => {
    return fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nickname,
            body,
        }),
    }).then((res) => res.json());
};
export const deleteComment = (id) => {
    return fetch(`${BASE_URL}/comments/${id}`, {
        method: "DELETE",
    });
};
export const editComment = (id, newcomment) => {
    return fetch(`${BASE_URL}/comments/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            body: newcomment,
            createdAt: new Date().getTime(),
        }),
    }).then((res) => res.json());
};

/**
 * 解析回傳的 header 內容
 * @param {object} data
 * @returns last : 最後一頁, total : 總筆數
 */
export function linkphaser(data) {
    const total = Number(data.headers.get("x-total-count"));
    if (data.headers.get("Link")) {
        const lastpage = data.headers
            .get("Link")
            .split(",")
            .filter((link) => link.includes("last"));
        const last = lastpage[0].match(/.+_page=(\d.)/);
        return {
            last: Number(last[1]),
            total,
        };
    }
    return { total };
}

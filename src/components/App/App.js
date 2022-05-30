import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";

import { theme } from "../../constants";
import { ResetStyle, GlobalStyle } from "../../constants/globalStyle";

import {
    getUserAuth,
    setUser,
    setisLoadingLogin,
} from "../../redux/reducers/userReducer";
import { getAuthToken } from "../../utiles";

import {
    LoginPage,
    RegisterPage,
    PostPage,
    AddPostPage,
    EditPostPage,
    MyPostsPage,
    PostsPage,
    NewPostsPage,
    AboutPage,
    MessagePage,
} from "../../pages";
import { Header, Footer, Wrapper } from "../../components";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.posts.isLoadingPost);

    useEffect(() => {
        const userAuth = async () => {
            dispatch(setisLoadingLogin(true));
            let Authresponse = await dispatch(getUserAuth());
            if (Authresponse.ok === 1) {
                dispatch(setUser(Authresponse.data));
                dispatch(setisLoadingLogin(false));
                return;
            }
            dispatch(setisLoadingLogin(false));
        };
        // 顯示登入前要先確定是不是有認證，再顯示相關訊息
        if (getAuthToken()) {
            userAuth();
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <ResetStyle />
            <GlobalStyle />

            <Router>
                <Header />
                <Wrapper>
                    <Routes>
                        <Route path="/" element={<NewPostsPage />} />
                        <Route
                            path="/posts/page/:page"
                            element={<PostsPage />}
                        />
                        <Route
                            path="/posts/my/:userId"
                            element={<MyPostsPage />}
                        />
                        <Route path="/posts/:id" element={<PostPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route path="/add_post" element={<AddPostPage />} />
                        <Route
                            path="/post/edit/:id"
                            element={<EditPostPage />}
                        />
                        <Route path="/message" element={<MessagePage />} />
                    </Routes>
                </Wrapper>
            </Router>
            {!isLoading && (
                <Footer>{`Copyright © ${new Date().getFullYear()} Rosa Hong. All rights reserved.`}</Footer>
            )}
        </ThemeProvider>
    );
}

export default App;

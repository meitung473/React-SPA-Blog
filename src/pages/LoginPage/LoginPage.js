import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setAuthToken } from "../../utiles";
import {
    loginAPI,
    getUserAuth,
    setUser,
    setisLoadingLogin,
} from "../../redux/reducers/userReducer";

import { ErrorMessage, Form } from "../../components";
import Statments from "../../statement";

export default function LoginPage() {
    //state 的初始值不能是 undefined，會等於完全沒傳值
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const history = useNavigate();

    const isLoading = useSelector((store) => store.user.isLoading);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        setErrorMessage(null);
        e.preventDefault();
        // 登入流程開始
        dispatch(setisLoadingLogin(true));

        const login = async function () {
            //等 login 回來的結果
            let loginresponse = await dispatch(loginAPI(username, password));
            if (loginresponse.ok === 0) {
                dispatch(setisLoadingLogin(false));
                return setErrorMessage(loginresponse.message);
            }
            //localStorge 存 token
            setAuthToken(loginresponse.token);

            //驗證
            let Authresponse = await dispatch(getUserAuth());
            if (Authresponse.ok !== 1) {
                return setErrorMessage(Authresponse.toString());
            }
            dispatch(setUser(Authresponse.data));
            dispatch(setisLoadingLogin(false));
            history("/");
        };
        console.log("fewfwe");
        login();
    };

    const setFocus = () => {
        setErrorMessage(null);
    };
    // 處理 input
    const setOnChange = (fn) => (e) => fn(e.target.value);

    return (
        <Form>
            <Form.Container onSubmit={handleSubmit}>
                <Form.Title>登入</Form.Title>
                <Form.SubTitle>帳號</Form.SubTitle>
                <Form.Input
                    onChange={setOnChange(setUsername)}
                    onFocus={setFocus}
                    value={username}
                />
                <Form.SubTitle>密碼</Form.SubTitle>
                <Form.PasswordInput
                    onChange={setOnChange(setPassword)}
                    onFocus={setFocus}
                    value={password}
                />
                <Form.Checkbox>顯示密碼</Form.Checkbox>
                {isLoading ? (
                    <span>Loading...</span>
                ) : (
                    <>
                        <Form.SubmitButton value="登入" />
                        <Form.InfoBox>
                            <span>
                                還沒有帳號嗎？ 立即
                                <Form.Link as={Link} to={"/register"}>
                                    註冊
                                </Form.Link>
                            </span>
                        </Form.InfoBox>
                        {errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        )}
                    </>
                )}

                <Statments />
            </Form.Container>
        </Form>
    );
}

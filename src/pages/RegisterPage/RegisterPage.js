import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setAuthToken } from "../../utiles";
import { useSelector, useDispatch } from "react-redux";
import {
    registerAPI,
    getUserAuth,
    setUser,
    setisLoadingLogin,
} from "../../redux/reducers/userReducer";
import { ErrorMessage, Form } from "../../components";
import Statments from "../../statement";

export default function RegisterPage() {
    //state 的初始值不能是 undefined，會等於完全沒傳值
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useNavigate();

    const isLoading = useSelector((store) => store.user.isLoading);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        setErrorMessage(null);
        e.preventDefault();

        dispatch(setisLoadingLogin(true));

        const register = async function () {
            let Resgisteresponse = await dispatch(
                registerAPI(nickname, username, password)
            );
            if (Resgisteresponse.ok === 0) {
                dispatch(setisLoadingLogin(false));
                return setErrorMessage(Resgisteresponse.message);
            }
            //localStorge 存 token
            setAuthToken(Resgisteresponse.token);

            //驗證
            let Authresponse = await dispatch(getUserAuth());
            if (Authresponse.ok !== 1) {
                return setErrorMessage(Authresponse.toString());
            }
            dispatch(setUser(Authresponse.data));
            dispatch(setisLoadingLogin(false));
            history("/");
        };
        register();
    };

    const setFocus = (e) => {
        setErrorMessage(null);
    };
    const setOnChange = (fn) => (e) => fn(e.target.value);
    return (
        <Form>
            <Form.Container onSubmit={handleSubmit}>
                <Form.Title>註冊</Form.Title>
                <Form.SubTitle>暱稱</Form.SubTitle>
                <Form.Input
                    onChange={setOnChange(setNickname)}
                    onFocus={setFocus}
                    value={nickname}
                />
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
                        <Form.SubmitButton value="註冊" />
                        <Form.InfoBox>
                            已經註冊了嗎 ？ 立即
                            <Form.Link as={Link} to={"/login"}>
                                登入
                            </Form.Link>
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

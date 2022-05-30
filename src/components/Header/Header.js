import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import BounceLoader from "react-spinners/ClipLoader";

import { setAuthToken } from "../../utiles";
import { theme } from "../../constants";
import { setUser } from "../../redux/reducers/userReducer";

const HeaderContainer = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    max-width: 1440px;
    height: 64px;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid ${({ theme }) => theme.colors.primary._100};
    margin: 0 auto;
    background-color: #fff;
`;

const Brand = styled(Link)`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0 0.3em;
    color: ${({ theme }) => theme.colors.primary._100};
    font-size: 1.6rem;
    font-weight: bold;

    text-decoration: none;

    transition: brightness 0.3s, transform 0.5s;
    &:hover {
        filter: brightness(1.1);
        transform: scale(1.05);
    }
    ${({ theme }) => theme.media.md} {
        padding: 0 16px;
        font-size: 1.2rem;
    }
`;

const NavbarList = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: calc(100vh - 64px);
    flex-direction: column;
    margin-top: 64px;
    background-color: #fff;

    ${({ theme }) => theme.media.md} {
        position: relative;
        display: flex;
        width: auto;
        height: 100%;

        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        margin-top: 0;
    }
`;
const Nav = styled(Link)`
    display: inline-flex;
    height: 100%;
    align-items: center;
    padding: 0 16px;
    box-shadow: 0px 1px 0px 1px ${({ theme }) => theme.colors.primary._100};
    color: ${({ theme }) => theme.colors.secondary._100};
    font-weight: bold;
    ${(props) =>
        props.$active &&
        ` 
        background-color:  ${props.theme.colors.primary._100};
        color: #fff;
    `}
    text-decoration: none;

    &:hover {
        background: ${({ theme }) => theme.colors.primary._50};
        color: ${({ theme }) => theme.colors.secondary._100};
    }
    ${({ theme }) => theme.media.md} {
        box-shadow: none;
    }
`;

const BrandContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    ${({ theme }) => theme.media.md} {
        width: auto;
    }
`;

const UserLoading = styled(BounceLoader)`
    ${(props) =>
        props.color &&
        `
    margin: 5px;
    color: ${({ theme }) => theme.colors.primary._100};
    `}
`;
const BurgerToggle = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    &:checked ~ ${/*sc-sel*/ NavbarList} {
        display: flex;
    }
`;

const BurgerButton = styled.label`
    position: absolute;
    right: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;

    &:before,
    &:after {
        position: absolute;
        top: 0;
        right: 8px;
        bottom: 0;
        width: 100%;
        height: 4px;
        margin: auto;
        background: ${({ theme }) => theme.colors.primary._100};
        border-radius: 10px;
        content: "";
        transition: box-shadow 0.3s ease-out, transform 0.3s ease-in-out;
    }
    &:before {
        top: -16px;
        box-shadow: 0 8px 0 ${({ theme }) => theme.colors.primary._100};
    }
    &:after {
        top: 16px;
        box-shadow: 0 -8px 0 ${({ theme }) => theme.colors.primary._100};
    }

    ${/*sc-selector*/ BurgerToggle}:checked + &:before {
        box-shadow: 0 0px 0 transparent;
        transform: rotate(45deg) translate(4px, 8px);
    }
    ${/*sc-selector*/ BurgerToggle}:checked + &:after {
        box-shadow: 0 0px 0 transparent;
        transform: rotate(-45deg) translate(4px, -8px);
    }
    ${({ theme }) => theme.media.md} {
        display: none;
    }
`;

export default function Header() {
    const location = useLocation();
    const navgative = useNavigate();

    //登入驗證中
    const isLoadingLogin = useSelector((store) => store.user.isLoading);
    //App 刷新的時候會經過一次驗證，登入會有 user 資料

    const user = useSelector((store) => store.user.userData);
    const dispatch = useDispatch();

    const handleBurger = () => {
        document.querySelector("#burger").checked = false;
    };
    const IsLogin = useMemo(() => {
        const handleLogout = () => {
            setAuthToken("");
            dispatch(setUser(null));
            if (location.pathname !== "/") {
                navgative("/");
            }
        };
        if (user)
            return (
                <Nav to="/" onClick={handleLogout}>
                    登出
                </Nav>
            );
        return (
            <>
                <Nav to="/register">註冊</Nav>
                <Nav to="/login">登入</Nav>
            </>
        );
    }, [user, dispatch, location.pathname, navgative]);
    return (
        <HeaderContainer>
            <BrandContainer>
                <Brand to="/">Rosa's Blog</Brand>
            </BrandContainer>

            <BurgerToggle type="checkbox" id="burger" />
            <BurgerButton htmlFor="burger" />
            <NavbarList onClick={handleBurger}>
                <Nav to="/" $active={location.pathname === "/"}>
                    最新文章
                </Nav>
                <Nav
                    to="/posts/page/1"
                    $active={location.pathname.match(/^\/posts\/page/g)}
                >
                    文章列表
                </Nav>
                <Nav to="/about" $active={location.pathname === "/about"}>
                    關於我
                </Nav>
                <Nav to="/message" $active={location.pathname === "/message"}>
                    訪客留言
                </Nav>
                {user && (
                    <>
                        <Nav
                            to="/add_post"
                            $active={location.pathname === "/add_post"}
                        >
                            發布文章
                        </Nav>
                        <Nav
                            to={`/posts/my/${user.id}`}
                            $active={
                                location.pathname === `/posts/my/${user.id}`
                            }
                        >
                            我的文章
                        </Nav>
                    </>
                )}
                {isLoadingLogin ? (
                    <UserLoading
                        color={theme.colors.primary._100}
                        css={{
                            borderWidth: "5px",
                            margin: "10px",
                        }}
                    />
                ) : (
                    IsLogin
                )}
            </NavbarList>
        </HeaderContainer>
    );
}

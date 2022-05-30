import styled from "styled-components";
import { PageTitle } from "../../components";
import { theme } from "../../constants";

const Title = styled.h3`
    color: ${({ theme }) => theme.colors.primary._100};
`;

const Body = styled.div`
    min-height: 300px;
    margin-top: 10px;
    line-height: 1.6;
    word-break: break-word;
`;
const List = styled.ol`
    counter-reset: Li 0;
    & li::before {
        content: counter(Li) ".";
        counter-increment: Li 1;
    }
`;

export default function AboutPage() {
    return (
        <>
            <PageTitle>關於我</PageTitle>

            <Title>持續精進前端工程師之路的女子</Title>
            <Body>
                <p>Hi , 我是 Rosa Hong。</p>

                <p>
                    透過 Lidemy 鋰學院 線上課程自學前端技術，撰寫學習
                    <a
                        href="https://blog.rosa.tw/"
                        target="_blank"
                        style={{
                            color: theme.colors.primary._100,
                            fontWeight: "bold",
                            borderBottom: `1px solid ${theme.colors.primary._100}`,
                        }}
                        rel="noreferrer"
                    >
                        筆記
                    </a>
                    並紀錄實作歷程，分享獲得知識的快樂
                </p>
                <hr />
                <p>這是一個使用 React 製作的 SPA 部落格，功能包含</p>
                <List>
                    <li>登入</li>
                    <li>註冊</li>
                    <li>發布文章</li>
                    <li>刪除文章</li>
                    <li>編輯文章</li>
                    <li>分頁瀏覽</li>
                    <li>留言版</li>
                </List>
            </Body>
        </>
    );
}

import { theme } from "./constants";

function Statments() {
    return (
        <div
            style={{
                margin: "auto ",
                textIndent: ".5em",
                backgroundColor: theme.colors.warn._50,
                lineHeight: "1.25",
                borderLeft: `5px solid ${theme.colors.warn._100}`,
            }}
        >
            <p>本網站作為練習使用，請勿輸入真實帳號密碼</p>
            <p>
                即便註冊新密碼，所有的密碼固定都是
                <span className="h-light">Lidemy</span>
            </p>
        </div>
    );
}
export default Statments;

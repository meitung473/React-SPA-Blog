import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export const ResetStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  box-sizing: border-box;
  padding: 0;
  border: 0;
  margin: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

address, caption, cite, code, dfn, em, strong, th, var, b {
  font-style: normal;
  font-weight: normal;
}
abbr, acronym {
  border: 0;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}
*,
*::after,
*::before {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
html {
  box-sizing: border-box;
  text-size-adjust: 100%;
}
body {
    line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote {
  &:before,   &:after {
    content: '';
    content: none;
  }
}
q {
  &:before,   &:after {
    content: '';
    content: none;
  }
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
caption, th {
  text-align: left;
}
textarea {
  resize: none;
}
a {
  cursor: pointer;
  text-decoration: none;
}
button {
  padding: 0;
  border: none;
  background: none;
}
h1, h2, h3, h4, h5, h6{
  font-weight: bold;
  line-height: 1.25;
}
`;

export const GlobalStyle = createGlobalStyle`
  body{
    min-height: 100vh;
    padding-top: 64px;
  }
  html,body{
    height: 100%;
  }
  #root{
    display: flex;
    max-width: 1440px;
    min-height: 100%;
    flex-direction: column;
    margin: 0 auto;
    background: url(${process.env.PUBLIC_URL + "/img/background.jpg"}) no-repeat
        center center/cover rgba(0, 0, 0, 0.3);
   
  }
  ${Heading()}
  .h-light{
    border-bottom: 2px solid ${theme.colors.danger._100}; 
    color : transparent;
    font-weight: bold;
    &:hover{
      color: ${theme.colors.danger._100};
    }
  }
`;

/**
 * 產生 Heading樣式
 * @returns h1~h5 fz
 */
function Heading() {
    let str = "";

    for (let i = 5; i >= 0; i--) {
        str += `
      h${i}{
        font-size : ${2 - 0.2 * i}em
      }
    `;
    }

    return str;
}

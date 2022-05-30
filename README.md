# 簡易 React SPA Blog

data 來自 Lidemy 提供的 comments 與 posts API  
可以登入、註冊並發布文章與匿名留言

**核心功能 :**

-   使用者可以進行**登入、註冊**，並且透過身分驗證才能對自己文章進行 CRUD
-   使用者可以未登入到留言板留言，對所有留言進行編輯與刪除
-   使用者登入後可以查看自己所有已發布的文章，可以對文章刪除或修改。
-   使用者可以在文章列表使用 **分頁瀏覽**
-   支援 RWD 瀏覽

## DEMO
-   mobile

-   desktop

## 說明

**使用技術 :**

-   React Hooks
-   react-router-dom 提供的 HashRouter 建立路由
-   Redux/Redux toolkit
-   Redux thunk 串接 API
-   styled-components 以 JSX 語法撰寫 CSS 樣式
-   styled-components createGlobalStyle 加上 CSS Reset 與 global style
-   react-icon 套用 svg icon
-   react-spinners 套上 Loading 的效果
-   Prop-Types 型別檢查
-   Prettier 套件統一程式碼格式
-   ESLint 套件檢查語法、去除 console，統一 coding style  

**其他 :**

1. `usePageNavigation` - custom Hooks，用來製作頁面導覽列，顯示目前頁面前後各一頁與頭尾頁數。
2. `Compound Component` - React Design Pattern，在 Form 與 Post 元件使用複合式元件，提升元件的重複性與可擴充性。
3. styled-components Media Query - 透過 size array 搭配 reduce function 產生 breakpoints 物件，在 styled-components 使用 `({theme})=>theme.media.md` 可以簡單使用對應的 media query。

## 資料夾結構

```bash
|   contexts.js
|   index.js
|   statement.js
|   utiles.js
|   WebAPI.js
|
+---components
|   |   index.js
|   |
|   +---App
|   +---Button
|   +---Container
|   +---ErrorMessage
|   +---Footer
|   +---Form
|   +---Header
|   +---Loading
|   +---MessageBoard
|   +---PageNavigation
|   +---PageTitle
|   +---Post
|   \---Wrapper
+---constants
|       deviceMediaqury.js
|       globalStyle.js
|       index.js
|       theme.js
+---Hooks
|       usePageNavigation.js
|
+---pages
|   |   index.js
|   +---AboutPage
|   +---AddPostPage
|   +---EditPostPage
|   +---LoginPage
|   +---MessagePage
|   +---MyPostsPage
|   +---NewPostsPage
|   +---PostPage
|   +---PostsPage
|   \---RegisterPage
\---redux
    |   selector.js
    |   store.js
    \---reducers
            postReducer.js
            userReducer.js
```

## 參考資料

1. Compound Component - [Design Pattern In React — Compound component (複合元件)](https://oldmo860617.medium.com/design-pattern-in-react-component-compound-component-%E8%A4%87%E5%90%88%E5%85%83%E4%BB%B6-46ed5fb65459)
2. styled-components GlobalStyle - [使用 CreateGlobalStyle 在 React Styled-Components 取代 CSS Reset 與 CSS Normalize](https://medium.com/itsoktomakemistakes/%E4%BD%BF%E7%94%A8-createglobalstyle-%E5%9C%A8-react-styled-components-%E5%8F%96%E4%BB%A3-css-reset-%E8%88%87-css-normalize-fc8faa8059f1)
3. usePageNavigation 概念參考 : [導航元件 - Pagination](https://ithelp.ithome.com.tw/articles/10278297)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

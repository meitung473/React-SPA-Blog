import styled from "styled-components";

import { Link } from "react-router-dom";
import { createContext, useContext, useState } from "react";

import { useSelector } from "react-redux";
import { selectorUserAuth } from "../../redux/selector";

import PropTypes from "prop-types";

const Header = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  padding: 1em 1.2em;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    box-shadow: inset 0px 1px 0px ${({ theme }) => theme.colors.primary._100};
    content: "";
  }
`;
const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;

  box-shadow: 0px 5px 5px ${({ theme }) => theme.colors.secondary._50};

  transition: transform 0.3s ease-in-out;
  &:last-child {
    margin-bottom: 40px;
  }
  ${({ theme }) => theme.media.md} {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;
const PostTitle = styled.h2`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.secondary._100};
  ${({ as }) =>
    as &&
    `
        font-size: 1.6em;
        font-weight: bold;
        line-height: 1.25;
    `}
  text-overflow: ellipsis;

  white-space: nowrap;

  ${({ theme }) => theme.media.md} {
    width: 80%;
  }
`;

const Info = styled.p`
  padding: 0.5em 1.2em;
  & > span:not(:first-child) {
    margin-left: 0.2em;
  }
`;
const CreatedDate = styled.span`
  color: rgba(0, 0, 0, 0.4);
`;
const Author = styled.span`
  color: ${({ theme }) => theme.colors.primary._100};
  font-weight: bold;
`;

const SettingDrowdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 3em;
  right: 1em;
  overflow: hidden;
  width: 150px;

  background-color: #fff;

  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  opacity: ${({ $isOn }) => ($isOn ? 1 : 0)};
  pointer-events: ${({ $isOn }) => ($isOn ? "auto" : "none")};
  transition: opacity 0.3s, top 0.3s;
`;
const Button = styled.button`
  display: block;
  width: 100%;

  box-sizing: border-box;
  padding: 10px 5px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary._10};
  color: black;
  cursor: pointer;
  font-size: 1em;
  text-align: center;
  text-decoration: none;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary._100};
  }
  &:hover {
    background: #ccc;
  }
`;
const Footer = styled.div`
  padding: 0 1.2em 1em;
`;
const P = styled.p`
  line-height: 1.4;
  text-indent: 1em;
  word-break: break-all;

  &:first-child::first-letter {
    color: ${({ theme }) => theme.colors.primary._100};
    font-size: 1.6em;
    font-weight: bold;
  }
`;
const Setting = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  align-self: flex-end;
  background-color: transparent;
  border-radius: 50%;

  cursor: pointer;

  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    height: 5px;
    margin: auto;
    background-color: ${({ theme }) => theme.colors.primary._100};
    border-radius: 50%;

    box-shadow: -10px 0 0 0 ${({ theme }) => theme.colors.primary._100},
      10px 0 0 0 ${({ theme }) => theme.colors.primary._100};
    content: "";
  }

  &:hover {
    ${({ theme }) => theme.media.md} {
      background: ${({ theme }) => theme.colors.primary._10};
    }
  }
`;

const PostContext = createContext();
function Post({ children, postId, postUserId }) {
  const [isOn, setIsOn] = useState(false);

  const user = useSelector(selectorUserAuth);

  // 刪除的功能
  return (
    <PostContext.Provider value={{ user, isOn, setIsOn, postId, postUserId }}>
      {children}
    </PostContext.Provider>
  );
}

Post.propTypes = {
  children: PropTypes.any,
  postId: PropTypes.number,
  postUserId: PropTypes.any,
};

function Title({ as, to, children }) {
  return (
    <PostTitle as={as} to={to}>
      {children}
    </PostTitle>
  );
}
Title.propTypes = {
  as: PropTypes.any,
  to: PropTypes.string,
  children: PropTypes.any,
};

function Body({ children }) {
  const { user, createdAt } = children;

  return (
    <Info>
      <CreatedDate>{`${new Date(createdAt).toLocaleString()}`}</CreatedDate>
      <span>by</span>
      <Author>{user ? user.nickname : "匿名作者"}</Author>
    </Info>
  );
}
Body.propTypes = {
  children: PropTypes.object,
};

function UserSetting({ children }) {
  const { isOn, setIsOn, user, postUserId } = useContext(PostContext);
  return (
    <>
      {user && user.id === postUserId && (
        <div>
          <Setting
            onClick={() => {
              setIsOn(!isOn);
            }}
          />
          <SettingDrowdown $isOn={isOn}>{children}</SettingDrowdown>
        </div>
      )}
    </>
  );
}
UserSetting.propTypes = {
  children: PropTypes.any,
};
/**
 * 刪除 | 取消按鈕
 * @param {callback} onClickEvent
 * @returns
 */
function DeleteButton({ onClick }) {
  const { postId } = useContext(PostContext);
  return <Button onClick={onClick(postId)}>刪除</Button>;
}
DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

/**
 * 修改 | 編輯 按鈕
 * @returns
 */
function ModifyButton() {
  const { postId } = useContext(PostContext);
  return (
    <Button to={`../post/edit/${postId}`} as={Link}>
      修改
    </Button>
  );
}

/**
 * 回傳的整篇文章以空白或 Enter (迴車)分段
 * @param {String} articlebody
 * @returns 文章段落
 */
function Paragraph({ children }) {
  let sliceP = children.split(/[\n|\r]/g);
  return sliceP.map((paragraph, i) => <P key={i}>{paragraph}</P>);
}

Post.Card = Card;
Post.Header = Header;
Post.Title = Title;
Post.Date = CreatedDate;
Post.Author = Author;
Post.Body = Body;
Post.Footer = Footer;
Post.Paragraph = Paragraph;
Post.UserSetting = UserSetting;
Post.ModifyButton = ModifyButton;
Post.DeleteButton = DeleteButton;

export default Post;

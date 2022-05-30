import styled from "styled-components";
import { createContext } from "react";
import { Button, Post } from "..";

import PropTypes from "prop-types";

const SubmitButton = styled.input.attrs({
    type: "submit",
})`
    margin-top: 10px;
`;
const Container = styled(Post.Card)`
    width: 100%;
    margin: 0px auto;
    & + & {
        margin-top: 2em;
    }
    ${({ theme }) => theme.media.md} {
        width: 70%;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-bottom: 1px dashed gray;
`;
const Author = styled(Post.Author)``;
const CreatedAt = styled(Post.Date)`
    color: #aaa;
`;
const Body = styled.div`
    padding: 8px 16px;
`;
const Content = styled.p`
    word-break: break-word;
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
    column-gap: 0.5em;
`;
const StyledButton = styled(Button)`
    padding: 0.5em 1.2em;
    border-width: 3px;
    border-style: solid;
    font-size: 0.8em;
    font-weight: bold;
`;
const ModifyButton = styled(StyledButton)`
    border-color: ${({ theme }) => theme.colors.primary._100};
    background-color: ${({ theme }) => theme.colors.primary._100};
    color: #fff;

    &:hover {
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary._100};
    }
`;
const DeleteButton = styled(StyledButton)`
    border-color: ${({ theme }) => theme.colors.danger._100};
    color: ${({ theme }) => theme.colors.danger._100};
    &:hover {
        background-color: ${({ theme }) => theme.colors.danger._100};
        color: #fff;
    }
`;

const EditTextarea = styled.textarea.attrs({
    rows: 4,
})`
    width: 100%;
    outline: none;
`;

const MessageContext = createContext();
function MessageCard({ children, refer }) {
    return (
        <MessageContext.Provider value={{ hello: "fewfwe" }}>
            <Container as={"li"} ref={refer}>
                {" "}
                {children}
            </Container>
        </MessageContext.Provider>
    );
}

MessageCard.propTypes = {
    children: PropTypes.array,
    refer: PropTypes.func,
};

MessageCard.Header = Header;
MessageCard.Author = Author;
MessageCard.CreatedAt = CreatedAt;

MessageCard.Body = Body;
MessageCard.Content = Content;
MessageCard.Footer = Footer;

MessageCard.ModifyButton = ModifyButton;
MessageCard.DeleteButton = DeleteButton;
MessageCard.SubmitButton = SubmitButton;
MessageCard.EditTextarea = EditTextarea;
export default MessageCard;

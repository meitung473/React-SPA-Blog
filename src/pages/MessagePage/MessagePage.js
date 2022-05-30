import { useState } from "react";
import styled from "styled-components";
import {
    ErrorMessage,
    Form,
    Loading,
    MessageBoard,
    PageTitle,
} from "../../components";
import { addComment, editComment, deleteComment } from "../../WebAPI";
import BeatLoader from "react-spinners/BeatLoader";
import { useLoadmessage } from "../../Hooks/useLoadmessage";
import { theme } from "../../constants";

const Container = styled(Form.Container)`
    ${({ theme }) => theme.media.md} {
        box-shadow: none;
    }
    padding: 0 0 2em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary._100};
    margin-bottom: 1em;
`;
const SubmitButton = styled(Form.SubmitButton)`
    border: 3px solid ${({ theme }) => theme.colors.primary._100};
    background-color: ${({ theme }) => theme.colors.primary._10};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.primary._100};
    font-weight: bold;
`;
const override = {
    display: "flex",
    justifyContent: "center",
    padding: "1em 0",
};
export default function MessagePage() {
    // errMessage 處理
    const [apiErrorMessage, setapiErrorMessage] = useState(null);
    const [nickname, setNickname] = useState("");
    const [comment, setComment] = useState("");
    const [postMessageError, setpostMessageError] = useState(null);
    const [isPostmessageLoading, setPostmessageLoading] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [nowEditId, setnowEditId] = useState(null);
    const [editingtxt, setEditingtxt] = useState(null);

    const { observerref, setMessage, messages, setStartcount, isloading } =
        useLoadmessage();

    const handleButtonSubmit = (e) => {
        e.preventDefault();
        if (isPostmessageLoading) return;
        setPostmessageLoading(true);
        addComment(nickname, comment)
            .then((data) => {
                if (data.ok === 0) {
                    setpostMessageError(data.message);
                    setPostmessageLoading(false);
                    return;
                }
                setComment("");
                setPostmessageLoading(false);
                setMessage((prev) => [data, ...prev]);
                setStartcount((prev) => prev + 1);
            })
            .catch((err) => {
                setpostMessageError(err.message);
                setPostmessageLoading(false);
            });
    };
    const handleChange = (cb) => (e) => {
        cb(e.target.value);
    };
    const ErrorMessageclear = (e) => {
        setpostMessageError(null);
    };

    const handleEdit = (id) => (e) => {
        editComment(id, editingtxt)
            .then((data) => {
                if (data.ok === 0) {
                    setpostMessageError(data.message);
                    setPostmessageLoading(false);
                    return;
                }
                setPostmessageLoading(false);
                setMessage((prev) =>
                    prev.map((message) => {
                        if (message.id === id) {
                            message.body = editingtxt;
                        }
                        return message;
                    })
                );
                setIsEdit(false);
            })
            .catch((err) => {
                setpostMessageError(err.message);
                setPostmessageLoading(false);
            });
    };

    const handleDelete = (id) => () => {
        deleteComment(id)
            .then((res) => {
                if (res.ok) {
                    setMessage(messages.filter((message) => message.id !== id));
                    setStartcount((prev) => prev - 1);
                }
            })
            .catch((err) => setapiErrorMessage(err.message));
    };
    return (
        <div>
            <PageTitle>訪客留言版</PageTitle>
            <Form>
                <Container onSubmit={handleButtonSubmit}>
                    <Form.SubTitle>暱稱</Form.SubTitle>
                    <Form.Input
                        onChange={handleChange(setNickname)}
                        value={nickname}
                        onFocus={ErrorMessageclear}
                    />
                    <Form.SubTitle>留言內容</Form.SubTitle>
                    <Form.Content
                        row="8"
                        onChange={handleChange(setComment)}
                        value={comment}
                        onFocus={ErrorMessageclear}
                    />
                    <SubmitButton value={"留言"} />
                    {postMessageError && (
                        <ErrorMessage>
                            Something is wrong. {postMessageError.toString()}
                        </ErrorMessage>
                    )}
                </Container>
            </Form>
            {isPostmessageLoading && <Loading>Loading...</Loading>}
            {messages && messages.length === 0 && <div>No messages!</div>}
            {apiErrorMessage && (
                <ErrorMessage>
                    Something is wrong. {apiErrorMessage.toString()}
                </ErrorMessage>
            )}
            {}
            <ul>
                {messages &&
                    messages.map((m, i) => {
                        if (i + 1 === messages.length) {
                            return (
                                <MessageBoard key={m.id} refer={observerref}>
                                    <MessageBoard.Header>
                                        <MessageBoard.Author>
                                            {m.nickname}
                                        </MessageBoard.Author>
                                        <MessageBoard.CreatedAt>
                                            {new Date(
                                                m.createdAt
                                            ).toLocaleString()}
                                        </MessageBoard.CreatedAt>
                                    </MessageBoard.Header>
                                    <MessageBoard.Body>
                                        {isEdit && m.id === nowEditId ? (
                                            <MessageBoard.EditTextarea
                                                defaultValue={m.body}
                                                onChange={handleChange(
                                                    setEditingtxt
                                                )}
                                            />
                                        ) : (
                                            <MessageBoard.Content>
                                                {m.body}
                                            </MessageBoard.Content>
                                        )}
                                    </MessageBoard.Body>
                                    <MessageBoard.Footer>
                                        {isEdit && m.id === nowEditId ? (
                                            <>
                                                <MessageBoard.ModifyButton
                                                    onClick={() => {
                                                        setIsEdit(false);
                                                        setnowEditId(null);
                                                    }}
                                                >
                                                    取消
                                                </MessageBoard.ModifyButton>
                                                <MessageBoard.DeleteButton
                                                    onClick={handleEdit(m.id)}
                                                >
                                                    修改
                                                </MessageBoard.DeleteButton>
                                            </>
                                        ) : (
                                            <>
                                                <MessageBoard.DeleteButton
                                                    onClick={handleDelete(m.id)}
                                                >
                                                    刪除
                                                </MessageBoard.DeleteButton>
                                                <MessageBoard.ModifyButton
                                                    onClick={() => {
                                                        setIsEdit(true);
                                                        setnowEditId(m.id);
                                                    }}
                                                >
                                                    編輯
                                                </MessageBoard.ModifyButton>
                                            </>
                                        )}
                                    </MessageBoard.Footer>
                                </MessageBoard>
                            );
                        } else {
                            return (
                                <MessageBoard key={m.id}>
                                    <MessageBoard.Header>
                                        <MessageBoard.Author>
                                            {m.nickname}
                                        </MessageBoard.Author>
                                        <MessageBoard.CreatedAt>
                                            {new Date(
                                                m.createdAt
                                            ).toLocaleString()}
                                        </MessageBoard.CreatedAt>
                                    </MessageBoard.Header>
                                    <MessageBoard.Body>
                                        {isEdit && m.id === nowEditId ? (
                                            <MessageBoard.EditTextarea
                                                defaultValue={m.body}
                                                onChange={handleChange(
                                                    setEditingtxt
                                                )}
                                            />
                                        ) : (
                                            <MessageBoard.Content>
                                                {m.body}
                                            </MessageBoard.Content>
                                        )}
                                    </MessageBoard.Body>
                                    <MessageBoard.Footer>
                                        {isEdit && m.id === nowEditId ? (
                                            <>
                                                <MessageBoard.ModifyButton
                                                    onClick={() => {
                                                        setIsEdit(false);
                                                        setnowEditId(null);
                                                    }}
                                                >
                                                    取消
                                                </MessageBoard.ModifyButton>
                                                <MessageBoard.DeleteButton
                                                    onClick={handleEdit(m.id)}
                                                >
                                                    修改
                                                </MessageBoard.DeleteButton>
                                            </>
                                        ) : (
                                            <>
                                                <MessageBoard.DeleteButton
                                                    onClick={handleDelete(m.id)}
                                                >
                                                    刪除
                                                </MessageBoard.DeleteButton>
                                                <MessageBoard.ModifyButton
                                                    onClick={() => {
                                                        setIsEdit(true);
                                                        setnowEditId(m.id);
                                                    }}
                                                >
                                                    編輯
                                                </MessageBoard.ModifyButton>
                                            </>
                                        )}
                                    </MessageBoard.Footer>
                                </MessageBoard>
                            );
                        }
                    })}
                <BeatLoader
                    color={theme.colors.primary._100}
                    loading={isloading}
                    css={override}
                />
            </ul>
        </div>
    );
}

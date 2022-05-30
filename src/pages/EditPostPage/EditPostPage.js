import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthToken } from "../../utiles";

import { useDispatch, useSelector } from "react-redux";
import {
    getPostAPI,
    setIsLoadingPost,
    setEditingPostResponse,
    editPostAPI,
} from "../../redux/reducers/postReducer";
import { ErrorMessage, Form } from "../../components";

export default function EditPostPage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);

    const history = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.userData);
    const isAuthLoading = useSelector((store) => store.user.isLoading);
    const isLoading = useSelector((store) => store.posts.isLoadingPost);

    let postUserId = useRef("");
    const { id } = useParams();
    const handleSubmit = (e) => {
        setErrorMessage(null);

        e.preventDefault();
        const editpost = {
            id: Number(id),
            title,
            body,
        };
        if (user.id === postUserId.current) {
            dispatch(editPostAPI(editpost)).then((res) => {
                if (!res) return setErrorMessage("NO");
                history(`/posts/${id}`);
            });
        }
    };
    useEffect(() => {
        dispatch(setIsLoadingPost(true));
        if (!isAuthLoading && getAuthToken()) {
            dispatch(getPostAPI(id)).then((post) => {
                setTitle(post.title);
                setBody(post.body);
                dispatch(setEditingPostResponse(post));
                dispatch(setIsLoadingPost(false));
                postUserId.current = post.userId;
            });
        }
    }, [dispatch, id, isAuthLoading]);
    const setOnChange = (fn) => (e) => fn(e.target.value);
    return (
        <>
            {!isAuthLoading && !isLoading && (
                <Form>
                    <Form.Container onSubmit={handleSubmit}>
                        <Form.Title>修改文章</Form.Title>
                        <Form.SubTitle>標題</Form.SubTitle>
                        <Form.Input
                            onChange={setOnChange(setTitle)}
                            value={title}
                        />
                        <Form.SubTitle>內容</Form.SubTitle>
                        <Form.Content
                            rows={10}
                            onChange={setOnChange(setBody)}
                            value={body}
                        />
                        <Form.SubmitButton />
                        {errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        )}
                    </Form.Container>
                </Form>
            )}
        </>
    );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPostAPI, setIsLoadingPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

import { Container, Loading, Post } from "../../components";

export default function PostPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.posts.isLoadingPost);

    const [post, setPost] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        dispatch(setIsLoadingPost(true));
        dispatch(getPostAPI(id)).then((post) => {
            setPost(post);
            dispatch(setIsLoadingPost(false));
        });
    }, [id, dispatch]);

    return (
        <Container>
            {isLoading ? (
                <Loading></Loading>
            ) : (
                post && (
                    <Post key={post.id}>
                        <Post.Header>
                            <Post.Title>{post.title}</Post.Title>
                        </Post.Header>
                        <Post.Body>{post}</Post.Body>
                        <Post.Footer>
                            <Post.Paragraph>{post.body}</Post.Paragraph>
                        </Post.Footer>
                    </Post>
                )
            )}
        </Container>
    );
}

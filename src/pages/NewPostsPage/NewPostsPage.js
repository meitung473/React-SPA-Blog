import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageTitle, Loading, Post } from "../../components";
import { setIsLoadingPost } from "../../redux/reducers/postReducer";
import { getLimitPostsAPI } from "../../WebAPI";

export default function NewPostsPage() {
    const [posts, setPosts] = useState(null);
    const isLoading = useSelector((store) => store.posts.isLoadingPost);
    const isAuthLoading = useSelector((store) => store.user.isLoading);
    const dispatch = useDispatch();

    //驗證
    useEffect(() => {
        dispatch(setIsLoadingPost(true));
        if (!isAuthLoading) {
            getLimitPostsAPI(1)
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data);
                    dispatch(setIsLoadingPost(false));
                });
        }
    }, [dispatch, isAuthLoading]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <PageTitle>最新文章</PageTitle>
                    {posts &&
                        posts.map((post) => (
                            <Post key={post.id}>
                                <Post.Card>
                                    <Post.Header>
                                        <Post.Title>{post.title}</Post.Title>
                                    </Post.Header>
                                    <Post.Body>{post}</Post.Body>
                                    <Post.Footer>
                                        <Post.Paragraph>
                                            {post.body}
                                        </Post.Paragraph>
                                    </Post.Footer>
                                </Post.Card>
                            </Post>
                        ))}
                </>
            )}
        </>
    );
}

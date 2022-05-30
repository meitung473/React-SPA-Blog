import styled from "styled-components";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../utiles";
import { Link, useParams } from "react-router-dom";

import {
    getUserPostsAPI,
    setIsLoadingPost,
    deletePostsAPI,
} from "../../redux/reducers/postReducer";
import { useSelector, useDispatch } from "react-redux";
import { PageTitle, Loading, Post } from "../../components";

const PostAction = styled(Link)`
    color: ${({ theme }) => theme.colors.primary._100};
    font-weight: bold;
`;
export default function MyPostsPage() {
    const [posts, setPosts] = useState(null);
    const { userId } = useParams();

    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.posts.isLoadingPost);

    // 新增文章後 在 render 之前，舊的紀錄還在

    useEffect(() => {
        dispatch(setIsLoadingPost(true));
        if (getAuthToken()) {
            dispatch(getUserPostsAPI(userId)).then((myposts) => {
                setPosts(myposts);
                dispatch(setIsLoadingPost(false));
            });
        }
    }, [userId, dispatch]);

    const handleDeletePost = (id) => () => {
        dispatch(deletePostsAPI(id)).then(() => {
            dispatch(getUserPostsAPI(userId)).then((myposts) => {
                setPosts(myposts);
            });
        });
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {posts && (
                        <PageTitle>已發佈 {posts.length} 篇文章</PageTitle>
                    )}

                    {posts && posts.length === 0 && (
                        <p>
                            還沒有任何文章，趕緊來
                            <PostAction to={"/add_post"}>發布</PostAction>
                            吧!
                        </p>
                    )}
                    {posts &&
                        posts.map((post) => (
                            <Post
                                key={post.id}
                                postId={post.id}
                                postUserId={post.userId}
                            >
                                <Post.Card>
                                    <Post.Header>
                                        <Post.Title
                                            as={Link}
                                            to={`/posts/${post.id}`}
                                        >
                                            {post.title}
                                        </Post.Title>
                                        <Post.UserSetting>
                                            <Post.ModifyButton />
                                            <Post.DeleteButton
                                                onClick={handleDeletePost}
                                            />
                                        </Post.UserSetting>
                                    </Post.Header>
                                    <Post.Body>{post}</Post.Body>
                                </Post.Card>
                            </Post>
                        ))}
                </>
            )}
        </>
    );
}

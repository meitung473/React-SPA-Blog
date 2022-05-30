import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePostsAPI } from "../../redux/reducers/postReducer";
import { PageTitle, PageNavigation, Loading, Post } from "../../components";
import usePageNavigation from "../../Hooks/usePageNavigation";

export default function PostsPage() {
    const isLoading = useSelector((store) => store.posts.isLoadingPost);
    const dispatch = useDispatch();
    let { page } = useParams();

    const {
        currentPage,
        pages,
        handlePageChange,
        totalPosts,
        posts,
        setPosts,
    } = usePageNavigation(+page);

    const handleDeletePost = (id) => () => {
        dispatch(deletePostsAPI(id)).then(() => {
            totalPosts.current--;
            setPosts((prev) => prev.filter((post) => post.id !== id));
        });
    };

    return (
        <>
            {isLoading ? (
                <Loading></Loading>
            ) : (
                <>
                    <PageTitle>所有文章</PageTitle>
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
                    {posts && (
                        <PageNavigation
                            totalPostsLength={+totalPosts.current}
                            pages={pages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </>
    );
}

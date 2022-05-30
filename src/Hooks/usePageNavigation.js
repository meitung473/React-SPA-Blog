import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setIsLoadingPost } from "../redux/reducers/postReducer";
import { getLimitPostsAPI, linkphaser } from "../WebAPI";

let pageOffset = 1;

export default function usePageNavigation(page) {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);

    const [totalPages, setotalPages] = useState(null);
    const totalPosts = useRef();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const getPageNav = () => {
            const pagesIndicator = [...Array(totalPages).keys()]
                .map((key) => key + 1)
                .reduce((p, n) => {
                    if (
                        n === 1 ||
                        n === totalPages ||
                        n === currentPage ||
                        n === currentPage + pageOffset ||
                        n === currentPage - pageOffset
                    ) {
                        return [
                            ...p,
                            {
                                type: "page",
                                isCurrent: n === currentPage,
                                page: n,
                                onClick: () => setCurrentPage(n),
                            },
                        ];
                    }
                    if (n > currentPage + pageOffset) {
                        return [
                            ...p,
                            {
                                type: "end-ellispse",
                                isCurrent: n === currentPage,
                                page: n,
                                onClick: () => setCurrentPage(n),
                            },
                        ];
                    }
                    if (n < currentPage - pageOffset) {
                        return [
                            ...p,
                            {
                                type: "start-ellispse",
                                isCurrent: n === currentPage,
                                page: n,
                                onClick: () => setCurrentPage(n),
                            },
                        ];
                    }
                    return p;
                }, []);

            const result = pagesIndicator.filter((page, i) => {
                if (
                    page.type === "start-ellispse" &&
                    pagesIndicator[i - 1].type === "start-ellispse"
                ) {
                    return false;
                }
                if (
                    page.type === "end-ellispse" &&
                    pagesIndicator[i + 1].type === "end-ellispse"
                ) {
                    return false;
                }
                return true;
            });
            setPages(result);
        };
        if (currentPage) {
            (async () => {
                dispatch(setIsLoadingPost(true));
                getLimitPostsAPI(page)
                    .then((res) => res.json())
                    .then((data) => {
                        setPosts(data);
                        getPageNav();
                        dispatch(setIsLoadingPost(false));
                    });
            })();
        } else {
            (async () => {
                dispatch(setIsLoadingPost(true));
                await getLimitPostsAPI(page)
                    .then((res) => {
                        const { last, total } = linkphaser(res);
                        if (last !== null) setotalPages(last);
                        totalPosts.current = total;
                        return res.json();
                    })
                    .then((data) => {
                        setPosts(data);
                        setCurrentPage(page);
                        dispatch(setIsLoadingPost(false));
                    });
            })();
        }
    }, [currentPage, totalPages, page, dispatch]);

    const handlePageChange =
        (n = 0) =>
        () => {
            setCurrentPage(currentPage + n);
        };
    return {
        handlePageChange,
        currentPage,
        pages,
        totalPages,
        totalPosts,
        posts,
        setPosts,
    };
}

import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

const NavigationWrapper = styled.div`
    padding: 0;
    margin: 20px 0;
    text-align: center;
    ${({ theme }) => theme.media.md} {
        padding: 0px 16px;
    }
`;
const Pages = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;
const Page = styled(Link)`
    width: 32px;
    height: 32px;
    border: none;
    margin: 5px;

    background-color: ${({ $isCurrent, theme }) =>
        $isCurrent ? theme.colors.primary._100 : "transparent"};
    border-radius: 50%;
    color: ${({ $isCurrent, theme }) =>
        $isCurrent ? "#fff" : theme.colors.secondary._100};
    cursor: pointer;
    line-height: 32px;
    text-decoration: none;
    transition: brightness 0.3s;

    &:hover {
        background: ${({ theme }) => theme.colors.primary._50};
        color: ${({ theme }) => theme.colors.secondary._100};
        filter: brightness(0.8);
    }
`;
const Title = styled.div`
    margin-bottom: 5px;
`;
const ActionButton = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    svg {
        width: 100%;
        height: 100%;
        fill: ${({ theme }) => theme.colors.primary._100};
    }
`;

export default function PageNavigation({
    pages,
    currentPage,
    totalPostsLength,
    handlePageChange,
}) {
    const isDisabled = (num) => {
        if (num === 1) {
            return currentPage === num || currentPage <= 0;
        }
        return currentPage >= num;
    };
    return (
        <NavigationWrapper>
            <Title>
                共 {totalPostsLength} 篇文章， 目前在第 {currentPage} 頁 / 總共{" "}
                {pages.length > 0 && pages[pages.length - 1].page} 頁
            </Title>
            <Pages>
                {!isDisabled(1) && (
                    <ActionButton
                        as={Link}
                        to={`/posts/page/${currentPage - 1}`}
                        onClick={handlePageChange(-1)}
                    >
                        <BsFillArrowLeftCircleFill />
                    </ActionButton>
                )}

                {pages.map((page, index) => {
                    if (page.type === "page") {
                        return (
                            <Page
                                as={Link}
                                to={`/posts/page/${page.page}`}
                                key={index}
                                onClick={page.onClick}
                                $isCurrent={page.isCurrent}
                            >
                                {page.page}
                            </Page>
                        );
                    } else {
                        return <div key={index}>...</div>;
                    }
                })}
                {!isDisabled(
                    pages.length > 0 && pages[pages.length - 1].page
                ) && (
                    <ActionButton
                        as={Link}
                        to={`/posts/page/${currentPage + 1}`}
                        onClick={handlePageChange(1)}
                    >
                        <BsFillArrowRightCircleFill />
                    </ActionButton>
                )}
            </Pages>
        </NavigationWrapper>
    );
}

PageNavigation.propTypes = {
    pages: PropTypes.array,
    currentPage: PropTypes.number,
    totalPostsLength: PropTypes.number,
    handlePageChange: PropTypes.func,
};

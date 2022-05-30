import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    flex-grow: 1;
    border-right: 1px solid ${({ theme }) => theme.colors.secondary._50};
    border-left: 1px solid ${({ theme }) => theme.colors.secondary._50};
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 5px 5px ${({ theme }) => theme.colors.primary._10};

    ${({ theme }) => theme.media.md} {
        width: 80%;
        margin: 0 auto;
    }
`;

export default Container;

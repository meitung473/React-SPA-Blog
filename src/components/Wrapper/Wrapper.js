import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 1em;
    margin: 0 auto;

    ${({ theme }) => theme.media.md} {
        width: 80%;
    }
`;

export default Wrapper;

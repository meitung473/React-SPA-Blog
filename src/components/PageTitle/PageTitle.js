import styled from "styled-components";

const PageTitle = styled.h2`
    padding: 20px 3px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary._100};
    margin-bottom: 0.3em;
    color: ${({ theme }) => theme.colors.secondary._100};
    line-height: 1.25;
`;

export default PageTitle;

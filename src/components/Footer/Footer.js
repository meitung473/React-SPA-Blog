import styled from "styled-components";

const Footer = styled.footer`
    padding: 0.5em 0;
    background: ${({ theme }) => theme.colors.primary._100};
    text-align: center;
`;

export default Footer;

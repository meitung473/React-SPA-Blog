import styled from "styled-components";

const Button = styled.button`
    width: ${(props) => props.$width};
    padding: 8px 16px;
    border: none;
    background-color: ${(props) => props.bgColor};
    border-radius: 5px;
    box-shadow: ${(props) => props.shadow};
    color: ${(props) => props.txtColor};
    cursor: pointer;
    font-size: 1em;
    &:hover {
        filter: brightness(0.85);
    }
`;

export default Button;

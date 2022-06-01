import styled from "styled-components";

const ErrorMessage = styled.div`
  margin-top: 0.4em;
  color: ${({ theme }) => theme.colors.danger._100};
`;

export default ErrorMessage;

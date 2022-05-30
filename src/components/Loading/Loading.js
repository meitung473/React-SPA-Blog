import styled from "styled-components";
import BounceLoader from "react-spinners/ClipLoader";
import { theme } from "../../constants";

const LoadingWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.6);
`;
const cssoverride = {
    borderWidth: "10px",
};

export default function Loading() {
    return (
        <LoadingWrapper>
            <BounceLoader
                color={theme.colors.primary._100}
                css={cssoverride}
                size={30}
            />
        </LoadingWrapper>
    );
}

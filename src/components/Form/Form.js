import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { BsCheck, BsSquare } from "react-icons/bs";
import { PageTitle } from "../index";

const SubmitButton = styled.input.attrs({
    type: "submit",
})`
    width: 60%;
    align-self: center;
    padding: 8px 16px;
    border: none;
    margin-top: 1em;
    background-color: ${({ theme }) => theme.colors.primary._100};
    border-radius: 5px;
    box-shadow: 0px 5px 5px ${({ theme }) => theme.colors.secondary._50};
    color: #fff;
    cursor: pointer;
    &:hover {
        filter: brightness(0.85);
    }
    ${({ theme }) => theme.media.md} {
        max-width: 100px;
    }
`;

const Container = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    padding: 10px 50px 0px;
    margin: 0 auto;

    ${({ theme }) => theme.media.md} {
        width: 70%;
        padding: 10px 30px 0px;
        box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.secondary._50};
    }
`;
const Title = styled(PageTitle)`
    width: 100%;
`;
const SubTitle = styled.h5`
    width: 100%;
    color: ${({ theme }) => theme.colors.secondary._100};
    text-align: left;
`;
const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.colors.secondary._50};
    margin: 0.3em 0;
    background-color: ${({ theme }) => theme.colors.primary._10};
    border-radius: 3px;
    line-height: 2;
    outline: none;
`;
const Content = styled.textarea.attrs({
    type: "text",
})`
    min-width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 150px;
    max-height: 400px;
    border: 1px solid ${({ theme }) => theme.colors.secondary._50};
    margin: 0.3em 0 0;
    background-color: ${({ theme }) => theme.colors.primary._10};
    border-radius: 3px;
    line-height: 2;
    outline: none;
    resize: none;
`;

const FormLink = styled.a`
    ${({ theme }) => `
        color: ${theme.colors.primary._100};
        border-bottom: 1px solid ${theme.colors.primary._100};
        transition: background-color .3s ease-in-out;
        &:hover{
            background-color: ${theme.colors.primary._100};
            color: #fff;
        }
    `}
`;
const Box = styled(BsSquare)`
    position: relative;
    fill: ${({ theme }) => theme.colors.primary._100};
    + svg {
        position: absolute;
        fill: ${({ theme }) => theme.colors.primary._100};
        opacity: ${({ $isOn }) => ($isOn === true ? 1 : 0)};
        transition: opacity 0.2s ease-out;
    }
`;

const Label = styled.label`
    position: relative;
    display: flex;
    align-self: flex-start;
    text-indent: 0.5em;
    input[type="checkbox"] {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
`;
const InfoBox = styled.div`
    padding: 1.5em 0 0.5em;
`;
const FormContext = createContext();
function Form({ children }) {
    const [isOn, setisOn] = useState();

    return (
        <FormContext.Provider value={{ isOn, setisOn }}>
            {children}
        </FormContext.Provider>
    );
}
Form.propTypes = {
    children: PropTypes.element,
};

function Checkbox({ children }) {
    const { isOn, setisOn } = useContext(FormContext);
    return (
        <Label>
            <Box $isOn={isOn} />
            <BsCheck />
            <Input
                type="checkbox"
                onChange={() => {
                    setisOn((isOn) => !isOn);
                }}
            />
            {children}
        </Label>
    );
}
Checkbox.propTypes = {
    children: PropTypes.string,
};
function PasswordInput({ onChange, value, onFocus }) {
    const { isOn } = useContext(FormContext);
    return (
        <Input
            type={isOn ? "text" : "password"}
            onChange={onChange}
            value={value}
            onFocus={onFocus}
        />
    );
}
PasswordInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    onFocus: PropTypes.func,
};

Form.Title = Title;
Form.Input = Input;
Form.Container = Container;
Form.SubTitle = SubTitle;
Form.SubmitButton = SubmitButton;
Form.Content = Content;
Form.Link = FormLink;
Form.Checkbox = Checkbox;
Form.PasswordInput = PasswordInput;
Form.InfoBox = InfoBox;
export default Form;

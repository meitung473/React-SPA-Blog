import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getAuthToken } from "../../utiles";
import { addPostAPI } from "../../redux/reducers/postReducer";
import { ErrorMessage, Form } from "../../components";

export default function AddPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const history = useNavigate();
  // redux
  const dispatch = useDispatch();
  const setOnChange = (fn) => (e) => fn(e.target.value);
  const handleSubmit = (e) => {
    setErrorMessage(null);
    e.preventDefault();
    if (getAuthToken()) {
      dispatch(
        addPostAPI({
          title,
          body,
        })
      ).then((newPostResponse) => {
        if (newPostResponse && newPostResponse.id) {
          history("/");
        }
        if (newPostResponse.code === 1) {
          setErrorMessage("內容不得空白");
        }
      });
    }
  };
  return (
    <Form>
      <Form.Container onSubmit={handleSubmit}>
        <Form.Title>發布文章</Form.Title>
        <Form.SubTitle>標題</Form.SubTitle>
        <Form.Input onChange={setOnChange(setTitle)} value={title} />
        <Form.SubTitle>內容</Form.SubTitle>
        <Form.Content rows={10} onChange={setOnChange(setBody)} value={body} />
        <Form.SubmitButton />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form.Container>
    </Form>
  );
}

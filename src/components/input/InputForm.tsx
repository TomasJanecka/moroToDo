import styled from "styled-components";
import {FormEvent, useState} from "react";
import {useRecoilState} from "recoil";
import {userState} from "../state/state";

export const InputForm = () => {
  const [inputText, setInputText] = useState('');
  const [user, setUser] = useRecoilState(userState);
  
  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const clearInputText = () => {
    setInputText("");
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newToDo = {name: inputText, isDone: false}
    const newToDos = user.todos.concat(newToDo)
    setUser({todos: newToDos})
    clearInputText();
  };

  return <StyledForm onSubmit={onSubmitForm}>
    <ToDoInput
      type={"text"}
      name={"todo"}
      placeholder={"What needs to be done?"}
      onChange={handleInputChange}
      value={inputText}
      autoComplete={"off"}
    />
  </StyledForm>
}

const ToDoInput = styled.input`
  width: 100%;
  height: 2rem;
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
`;
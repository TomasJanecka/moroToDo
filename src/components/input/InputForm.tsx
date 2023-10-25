import styled from "styled-components";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../state/state";
import { v4 as uuidv4 } from "uuid";
import { IToDo } from "../../@types/api";
import { EFormType } from "../../@types/enums";

type Props = {
  todo: IToDo | undefined;
  formType: EFormType;
  setToDoToEditID: ((uuid: string) => void) | undefined;
};

export const InputForm = ({ todo, formType, setToDoToEditID }: Props) => {
  const [inputText, setInputText] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  };

  const clearInputText = () => {
    setInputText("");
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === EFormType.create) {
      const newToDo = { uuid: uuidv4(), name: inputText, isDone: false };
      const newToDos = user.todos.concat(newToDo);
      setUser({ todos: newToDos });
    } else {
      if (!todo) return;
      const updatedToDo = { ...todo, name: inputText };
      const indexOfToDo = user.todos.findIndex(
        (task: IToDo) => task.uuid === todo.uuid
      );
      let updatedToDos = [...user.todos];
      updatedToDos.splice(indexOfToDo, 1, updatedToDo);
      setUser({ todos: updatedToDos });
      setToDoToEditID && setToDoToEditID("");
    }
    clearInputText();
  };

  return (
    <StyledForm onSubmit={onSubmitForm}>
      {formType === EFormType.create ? (
        <CreateToDoInput
          $hasMargin={user.todos.length === 0}
          type={"text"}
          name={"createTodo"}
          placeholder={"What needs to be done?"}
          onChange={handleInputChange}
          value={inputText}
          autoComplete={"off"}
        />
      ) : (
        <EditToDoInput
          type={"text"}
          name={"editTodo"}
          placeholder={todo?.name}
          onChange={handleInputChange}
          value={inputText}
          autoComplete={"off"}
        />
      )}
    </StyledForm>
  );
};

const CreateToDoInput = styled.input<{ $hasMargin: boolean }>`
  width: 100%;
  height: 2rem;
  margin: ${(props) => (props.$hasMargin ? "0 0 0 2.75rem" : "0")};

  line-height: 2rem;
  border: none;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

const EditToDoInput = styled.input`
  width: 100%;
  height: 2rem;
  margin: 0 1rem 0 0;
  padding: 0 0 0 5px;

  line-height: 2rem;
  border: none;
  font-size: 1.1rem;
  background-color: lightgreen;

  &:focus {
    outline: none;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
`;

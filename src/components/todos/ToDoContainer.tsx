import styled from "styled-components";
import { ActionsBar } from "../actionsBar/ActionsBar";
import { InputBar } from "../input/InputBar";
import { useRecoilState } from "recoil";
import { userState } from "../../state/state";
import { useState } from "react";
import { EButton } from "../../@types/enums";
import { IToDo } from "../../@types/api";
import { ToDos } from "./ToDos";

export const ToDoContainer = () => {
  const [user] = useRecoilState(userState);
  const [todosOption, setTodosOption] = useState(EButton.all);
  const [toDoToEditID, setToDoToEditID] = useState("");

  const getToDosToShow = () => {
    if (todosOption === EButton.all) {
      return user.todos;
    } else if (todosOption === EButton.active) {
      return user.todos.filter((todo: IToDo) => !todo.isDone);
    } else {
      return user.todos.filter((todo: IToDo) => todo.isDone);
    }
  };

  return (
    <StyledToDoContainer>
      <InputBar />
      {user.todos.length > 0 && (
        <>
          <ToDos
            todos={getToDosToShow()}
            setToDoToEditID={setToDoToEditID}
            toDoToEditID={toDoToEditID}
          />
          <ActionsBar
            optionSelected={todosOption}
            selectButton={setTodosOption}
          />
        </>
      )}
    </StyledToDoContainer>
  );
};

const StyledToDoContainer = styled.div`
  width: 95%;
  max-width: 40rem;
  height: fit-content;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 0.2rem;
  margin-bottom: 1rem;

  border: 1px solid black;
`;

import styled from "styled-components";
import {IToDo} from "../@types/api";
import {ToDo} from "./ToDo";

type Props = {
  todos: IToDo[]
}

export const ToDos = ({todos}: Props) => {
  const getToDos = () => {
    return todos.map((todo, index) => <ToDo key={index} todo={todo}/>)
  }

  return <StyledToDos>{getToDos()}</StyledToDos>
}

const StyledToDos = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-flow: column-reverse;
  align-items: center;
  padding: 0.2rem;

  background-color: whitesmoke;
`;
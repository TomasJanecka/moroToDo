import { IToDo } from "../../@types/api";
import styled from "styled-components";
import { Checkbox } from "@mui/material";
import { useRecoilState } from "recoil";
import { userState } from "../../state/state";
import CloseIcon from "@mui/icons-material/Close";
import { InputForm } from "../input/InputForm";
import { EFormType } from "../../@types/enums";

type Props = {
  todo: IToDo;
  toDoToEditID: string;
  setToDoToEditID: (id: string) => void;
};

export const ToDo = ({ todo, setToDoToEditID, toDoToEditID }: Props) => {
  const [user, setUser] = useRecoilState(userState);

  const markAsCompleted = () => {
    const updatedToDo = { uuid: todo.uuid, name: todo.name, isDone: true };
    const updatedToDos = user.todos.map((task: IToDo) => {
      if (task.uuid === todo.uuid) {
        return updatedToDo;
      }
      return task;
    });
    setUser({ todos: updatedToDos });
  };

  const markAsNotCompleted = () => {
    const updatedToDo = {
      uuid: todo.uuid,
      name: todo.name,
      isDone: false,
    };
    const updatedToDos = user.todos.map((task: IToDo) => {
      if (task.uuid === todo.uuid) {
        return updatedToDo;
      }
      return task;
    });
    setUser({ todos: updatedToDos });
  };

  const deleteToDo = () => {
    const updatedToDos = user.todos.filter(
      (task: IToDo) => task.uuid !== todo.uuid
    );
    setUser({ todos: updatedToDos });
  };

  return (
    <StyledToDo>
      <Checkbox
        onClick={todo.isDone ? markAsNotCompleted : markAsCompleted}
        checked={todo.isDone}
      />
      {toDoToEditID !== todo.uuid ? (
        <ToDoLabel
          onDoubleClick={() => setToDoToEditID(todo.uuid)}
          $isDone={todo.isDone}
        >
          {todo.name}
        </ToDoLabel>
      ) : (
        <InputForm
          todo={todo}
          formType={EFormType.edit}
          setToDoToEditID={setToDoToEditID}
        />
      )}
      <DeleteIconWrapper>
        <CloseIcon onClick={deleteToDo} fontSize="small" className={"Hide"} />
      </DeleteIconWrapper>
    </StyledToDo>
  );
};

const StyledToDo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 1px;
  padding: 5px 10px 5px 5px;

  border-bottom: 1px solid black;
`;

const ToDoLabel = styled.span<{ $isDone: boolean }>`
  width: fit-content;
  display: block;
  opacity: ${(props) => (props.$isDone ? 0.5 : 1)};
  margin: 0;
  padding-right: 0.5rem;

  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
  font-size: 1.1rem;
`;

const DeleteIconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: auto;
`;

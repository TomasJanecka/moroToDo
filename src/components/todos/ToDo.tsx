import {IToDo} from "../@types/api";
import styled from "styled-components";
import {Checkbox} from "@mui/material";
import {useRecoilState} from "recoil";
import {userState} from "../state/state";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  todo: IToDo
}

export const ToDo = ({todo}: Props) => {
  const [user, setUser] = useRecoilState(userState);

  const markAsCompleted = () => {
    const updatedToDo = {name: todo.name, isDone: true}
    const updatedToDos = user.todos.map((task:IToDo) => {
      if (task.name === todo.name) {
        return updatedToDo
      }
      return task
    })
    setUser({todos: updatedToDos})
  }

  const markAsNotCompleted = () => {
    const updatedToDo = {name: todo.name, isDone: false}
    const updatedToDos = user.todos.map((task:IToDo) => {
      if (task.name === todo.name) {
        return updatedToDo
      }
      return task
    })
    setUser({todos: updatedToDos})
  }

  const deleteToDo = () => {
    const updatedToDos = user.todos.filter((task:IToDo) => task.name !== todo.name)
    setUser({todos: updatedToDos})
  }

  const handleClick = (event: any) => {
    console.log(event.detail);
    switch (event.detail) {
      case 1: {
        console.log('single click');
        break;
      }
      case 2: {
        console.log('double click');
        break;
      }
      default: {
        break;
      }
    }
  };

  return <StyledToDo>
    <Checkbox onClick={todo.isDone ? markAsNotCompleted : markAsCompleted} checked={todo.isDone}/>
    <ToDoLabel onClick={handleClick} done={todo.isDone}>{todo.name}</ToDoLabel>
    <IconWrapper><CloseIcon onClick={deleteToDo} fontSize="small"/></IconWrapper>
  </StyledToDo>
}

const StyledToDo = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  margin: 1px;
  line-height: 2rem;
  
  border-bottom: 1px solid black;
`

const ToDoLabel = styled.text<{ done: boolean }>`
  width: fit-content;
  height: 2rem;
  display: block;
  opacity: ${(props) => (props.done ? 0.5 : 1)};

  text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
  font-size: 1.1rem;
  text-align: center;
`

const IconWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: auto;
`
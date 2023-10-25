import {InputForm} from "./InputForm";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRecoilState} from "recoil";
import {userState} from "../state/state";
import {IToDo} from "../@types/api";
import {useState} from "react";

type Props = {}

export const InputBar = ({}: Props) => {
  const [user, setUser] = useRecoilState(userState);
  const [selectedAll, setSelectedAll] = useState(false);

  const selectAll = () => {
    let updatedToDos
    if (!selectedAll) {
      updatedToDos = user.todos.map((todo: IToDo) => {
        return {...todo, isDone: true}
      })
    } else {
      updatedToDos = user.todos.map((todo: IToDo) => {
        return {...todo, isDone: false}
      })
    }
    setSelectedAll(!selectedAll)
    setUser({todos: updatedToDos})
  }

  return <StyledInputBar>
    <KeyboardArrowDownIcon onClick={selectAll} fontSize="large"/>
    <InputForm/>
  </StyledInputBar>
}

const StyledInputBar = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
`;


import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userState } from "../../state/state";
import { IToDo } from "../../@types/api";
import { Actions } from "./Actions";
import { EButton } from "../../@types/enums";

type Props = {
  optionSelected: EButton;
  selectButton: (option: EButton) => void;
};

export const ActionsBar = ({ optionSelected, selectButton }: Props) => {
  const [user, setUser] = useRecoilState(userState);

  const clearCompleted = () => {
    const updatedToDos = user.todos.filter((todo: IToDo) => !todo.isDone);
    setUser({ todos: updatedToDos });
  };

  return (
    <StyledActionBar>
      <ToDosLeft>
        <ToDosLeftNumber>
          {user.todos.filter((todo: IToDo) => !todo.isDone).length || 0}
        </ToDosLeftNumber>
        <ToDosLeftLabel>
          {user.todos.filter((todo: IToDo) => !todo.isDone).length === 1
            ? "item left"
            : "items left"}
        </ToDosLeftLabel>
      </ToDosLeft>
      <Actions selectButton={selectButton} optionSelected={optionSelected} />
      {user.todos.filter((todo: IToDo) => todo.isDone).length > 0 && (
        <ClearCompletedButton onClick={clearCompleted}>
          Clear completed
        </ClearCompletedButton>
      )}
    </StyledActionBar>
  );
};

const StyledActionBar = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const ToDosLeft = styled.div`
  width: 5rem;
  height: 2rem;
  display: flex;
  margin-left: 5px;

  text-align: left;
`;

const ToDosLeftNumber = styled.div`
  width: fit-content;
  height: 2rem;
`;

const ToDosLeftLabel = styled.div`
  width: fit-content;
  height: 2rem;
  margin-left: 0.2rem;
`;

const ClearCompletedButton = styled.button`
  display: block;
  width: fit-content;
  height: 2rem;
  margin: 0 5px 0 auto;

  border: none;
  background-color: white;

  &:hover {
    text-decoration: underline;
  }
`;

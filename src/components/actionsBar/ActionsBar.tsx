import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userState } from "../../state/state";
import { IToDo } from "../../@types/api";
import { Actions } from "./Actions";
import { EButton } from "../../@types/enums";

type Props = {
  optionSelected: EButton;
  selectButton: (option: EButton) => void;
  setToDoToEditID: (id: string) => void;
  toDoToEditID: string;
};

export const ActionsBar = ({
  optionSelected,
  selectButton,
  setToDoToEditID,
  toDoToEditID,
}: Props) => {
  const [user, setUser] = useRecoilState(userState);

  const clearCompleted = () => {
    const updatedToDos = user.todos.filter((todo: IToDo) => !todo.isDone);
    setUser({ todos: updatedToDos });
  };

  const numberOfDoneTodos = user.todos.filter(
    (todo: IToDo) => !todo.isDone
  ).length;

  return (
    <StyledActionBar
      onClick={() => setToDoToEditID("")}
      $isActive={toDoToEditID !== ""}
    >
      <ToDosLeft>
        <ToDosLeftNumber>{numberOfDoneTodos}</ToDosLeftNumber>
        <ToDosLeftLabel>
          {numberOfDoneTodos === 1 ? "item left" : "items left"}
        </ToDosLeftLabel>
      </ToDosLeft>
      <Actions selectButton={selectButton} optionSelected={optionSelected} />
      {numberOfDoneTodos > 0 && (
        <ClearCompletedButton onClick={clearCompleted}>
          Clear completed
        </ClearCompletedButton>
      )}
    </StyledActionBar>
  );
};

const StyledActionBar = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#FFBFBF" : "none")};
    opacity: 0.8;
  }
`;

const ToDosLeft = styled.div`
  width: 5rem;
  height: 2rem;
  display: flex;
  margin-left: 5px;

  line-height: 2rem;
  font-size: 0.9rem;
  text-align: left;

  @media (max-width: 350px) {
    line-height: 1rem;
  }
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
  background-color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

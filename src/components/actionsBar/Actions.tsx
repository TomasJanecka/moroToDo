import styled from "styled-components";
import { EButton } from "../../@types/enums";

type Props = {
  optionSelected: EButton;
  selectButton: (option: EButton) => void;
};

export const Actions = ({ optionSelected, selectButton }: Props) => {
  return (
    <StyledActions>
      <ActionButton
        $isSelected={optionSelected === EButton.all}
        onClick={() => selectButton(EButton.all)}
      >
        All
      </ActionButton>
      <ActionButton
        $isSelected={optionSelected === EButton.active}
        onClick={() => selectButton(EButton.active)}
      >
        Active
      </ActionButton>
      <ActionButton
        $isSelected={optionSelected === EButton.completed}
        onClick={() => selectButton(EButton.completed)}
      >
        Completed
      </ActionButton>
    </StyledActions>
  );
};

const StyledActions = styled.div`
  width: 50%;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: calc(25% - 5rem);
`;

const ActionButton = styled.button<{ $isSelected: boolean }>`
  width: fit-content;
  height: inherit;

  border: ${(props) => (props.$isSelected ? "1px solid lightgrey" : "none")};
  background-color: ${(props) => (props.$isSelected ? "whitesmoke" : "white")};
  line-height: 2rem;

  &:hover {
    text-decoration: underline;
    background-color: whitesmoke;
  }
`;

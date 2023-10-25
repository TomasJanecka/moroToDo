import styled from "styled-components";

export const Header = () => {
  return <StyledHeader>Todos</StyledHeader>;
};

const StyledHeader = styled.h1`
  width: fit-content;
  height: fit-content;

  font-size: 3rem;
  color: red;
`;

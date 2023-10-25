import styled from "styled-components";
import { Header } from "../header/Header";
import { ToDosContainer } from "../todos/ToDosContainer";

export const MainScreen = () => {
  return (
    <StyledMainScreen>
      <Header />
      <ToDosContainer />
    </StyledMainScreen>
  );
};

const StyledMainScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
`;

import React from 'react';
import {MainScreen} from "./components/screens/MainScreen";
import {RecoilRoot} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <MainScreen/>
    </RecoilRoot>
  );
}

export default App;

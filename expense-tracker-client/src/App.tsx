import React from "react";
import AppContainer from "./common/AppContainer";
import ExpenseHeader from "./common/ExpenseHeader";
import ExpenseContainer from "./expenses/containers/ExpenseContainer";
import ModalContainer from "./modal/containers/ModalContainer";

function App() {
  return (
    <div style={undefined}>
      <ModalContainer />
      <ExpenseHeader />
      <AppContainer>
        <ExpenseContainer />
      </AppContainer>
    </div>
  );
}

export default App;

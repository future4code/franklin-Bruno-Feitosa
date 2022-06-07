import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import EndScreen from "./components/EndScreen/EndScreen";
import GeneralData from "./components/GeneralData/GeneralData";
import GeneralEducationInfo from "./components/GeneralEducationInfo/GeneralEducationInfo";
import HigherEducationInfo from "./components/HigherEducationInfo/HigherEducationInfo";

const AppDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppButton = styled.button`
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 150px;
`;

function App() {
  const [step, setStep] = useState(1);
  const [buttonVisibility, setButtonVisibility] = useState(true);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GeneralData />;
      case 2:
        return <HigherEducationInfo />;
      case 3:
        return <GeneralEducationInfo />;
      case 4:
        return <EndScreen />;
      default:
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    if (step >= 3) {
      setButtonVisibility(false);
    }
  };

  const showButton = () => {
    if (buttonVisibility)
      return <AppButton onClick={nextStep}>Próxima Etapa</AppButton>;
  };

  return (
    <AppDiv>
      {renderStep()}
      {showButton()}
      {/* <HigherEducationInfo /> */}
      {/* <GeneralEducationInfo /> */}
    </AppDiv>
  );
}

export default App;

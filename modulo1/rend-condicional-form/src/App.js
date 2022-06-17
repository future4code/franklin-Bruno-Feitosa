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
  const [selectValue, setSelectValue] = useState("Ensino médio incompleto");
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputWhichCourse, setInputWhichCourse] = useState("");
  const [inputUniversity, setInputUniversity] = useState("");
  const [inputIncompleteGraduation, setInputIncompleteGraduation] =
    useState("");

  const handleSelectValue = (e) => {
    setSelectValue(e.target.value);
  };
  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  const handleInputAge = (e) => {
    setInputAge(e.target.value);
  };
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const handleInputWhichCourse = (e) => {
    setInputWhichCourse(e.target.value);
  };
  const handleInputUniversity = (e) => {
    setInputUniversity(e.target.value);
  };
  const handleInputIncompleteGraduation = (e) => {
    setInputIncompleteGraduation(e.target.value);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GeneralData
            selectValue={selectValue}
            handleSelectValue={handleSelectValue}
            inputName={inputName}
            handleInputName={handleInputName}
            inputAge={inputAge}
            handleInputAge={handleInputAge}
            inputEmail={inputEmail}
            handleInputEmail={handleInputEmail}
          />
        );
      case 2:
        return (
          <HigherEducationInfo
            inputWhichCourse={inputWhichCourse}
            handleInputWhichCourse={handleInputWhichCourse}
            inputUniversity={inputUniversity}
            handleInputUniversity={handleInputUniversity}
          />
        );
      case 3:
        return (
          <GeneralEducationInfo
            selectValue={selectValue}
            handleSelectValue={handleSelectValue}
            inputIncompleteGraduation={inputIncompleteGraduation}
            handleInputIncompleteGraduation={handleInputIncompleteGraduation}
          />
        );
      case 4:
        return <EndScreen />;
      default:
    }
  };

  const nextStep = () => {
    if (
      step === 1 &&
      (selectValue === "Ensino superior incompleto" ||
        selectValue === "Ensino superior completo")
    ) {
      if (inputName !== "" && inputAge !== "" && inputEmail !== "") {
        setStep(2);
      } else alert("Você deve preencher todas as perguntas antes de continuar");
    } else if (
      step === 1 &&
      (selectValue === "Ensino médio incompleto" ||
        selectValue === "Ensino médio completo")
    ) {
      if (inputName !== "" && inputAge !== "" && inputEmail !== "") {
        setStep(3);
        setSelectValue("Nenhum");
      } else alert("Você deve preencher todas as perguntas antes de continuar");
    }

    if (step === 2) {
      if (inputWhichCourse !== "" && inputUniversity !== "") {
        setStep(4);
        setButtonVisibility(false);
      } else alert("Você deve preencher todas as perguntas antes de continuar");
    }
    if (step === 3) {
      if (inputIncompleteGraduation !== "") {
        setStep(4);
        setButtonVisibility(false);
      } else alert("Você deve preencher todas as perguntas antes de continuar");
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
    </AppDiv>
  );
}

export default App;

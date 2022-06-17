import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";
import deleteButton from "../src/img/deleteButton.png";

const TarefaList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
`;

const TarefaAndInputDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ChangeValueDiv = styled.div`
  display: ${({ displayChangeInput }) =>
    displayChangeInput ? "none" : "grid"};
  grid-template-columns: 3fr 1fr;
  margin-left: 20px;
  position: absolute;
  left: 600px;
`;

const ChangeValueInput = styled.input`
  margin-right: 2rem;
`;

const ChangeValueButton = styled.button``;

const DeleteButtonImage = styled.img`
  margin-right: 0.5rem;
  width: 20px;
`;

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? "line-through" : "none")};
  margin: 10px;
`;

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`;

function App() {
  const [tarefas, setTarefa] = useState([
    { id: 1, texto: "Texto da primeira tarefa", completa: false },
    { id: 2, texto: "Texto da segunda tarefa", completa: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("filtradas");
  const [changeValueState, setChangeValueState] = useState("");
  const [displayChangeInput, setDisplayChangeInput] = useState(false);
  // const [checkboxState, setCheckboxState] = useState(true);

  // const saveData = () => {
  //   if (inputValue) localStorage.setItem("inputValue", inputValue);
  // };

  useEffect(() => {
    const storedInput = localStorage.getItem("inputValue");
    setInputValue(storedInput);
  }, []);

  useEffect(() => {
    if (inputValue === "") localStorage.setItem("inputValue", "");
    else {
      localStorage.setItem("inputValue", inputValue);
    }
  }, [inputValue]);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleChangeValue = (event) => {
    setChangeValueState(event.target.value);
  };

  // const markCheckbox = () => {
  //   setCheckboxState(!checkboxState);
  //   console.log(checkboxState);
  // };

  const criaTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: inputValue,
      completa: false,
    };
    if (inputValue !== "") {
      const novaListaDeTarefas = [novaTarefa, ...tarefas];
      const novoEstado = novaListaDeTarefas;
      setTarefa(novoEstado);
    }
  };

  const selectTarefa = (id) => {
    const novaListaDeTarefas = tarefas.map((tarefa) => {
      if (id === tarefa.id) {
        const novaTarefa = {
          ...tarefa,
          completa: !tarefa.completa,
        };
        return novaTarefa;
      } else {
        return tarefa;
      }
    });

    setTarefa(novaListaDeTarefas);
  };

  const onChangeFilter = (event) => {
    setFiltro(event.target.value);
  };

  const listaFiltrada = tarefas.filter((tarefa) => {
    switch (filtro) {
      case "pendentes":
        return !tarefa.completa;
      case "completas":
        return tarefa.completa;
      default:
        return true;
    }
  });

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={onChangeInput} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map((tarefa) => {
          const apagaTarefa = () => {
            if (window.confirm("Deseja apagar a tarefa selecionada?")) {
              const novaListaDeTarefas = [...listaFiltrada];
              const indice = novaListaDeTarefas.findIndex((index) => {
                return index === tarefa;
              });
              novaListaDeTarefas.splice(indice, 1);
              setTarefa(novaListaDeTarefas);
            }
          };

          const editaTarefas = () => {
            const novaListaDeTarefas = [...listaFiltrada];
            const indice = novaListaDeTarefas.findIndex((index) => {
              return index === tarefa;
            });
            console.log(indice);

            // novaListaDeTarefas.splice(indice, 1, changeValueState);
            // setTarefa(novaListaDeTarefas);
          };
          return (
            <TarefaAndInputDiv key={tarefa.id}>
              <DeleteButtonImage
                src={deleteButton}
                onClick={apagaTarefa}
              ></DeleteButtonImage>
              <Tarefa
                completa={tarefa.completa}
                onClick={() => selectTarefa(tarefa.id)}
              >
                {tarefa.texto}
              </Tarefa>
              <ChangeValueDiv>
                <ChangeValueInput
                  onChange={handleChangeValue}
                  value={changeValueState}
                ></ChangeValueInput>
                <ChangeValueButton onClick={editaTarefas}>
                  Atualizar
                </ChangeValueButton>
              </ChangeValueDiv>
            </TarefaAndInputDiv>
          );
        })}
      </TarefaList>
    </div>
  );
}

export default App;

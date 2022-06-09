import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`;

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? "line-through" : "none")};
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

  const saveData = () => {
    if (inputValue) localStorage.setItem("inputValue", inputValue);
  };

  useEffect(() => {
    const storedInput = localStorage.getItem("inputValue");
    setInputValue(storedInput);
  }, []);

  useEffect(() => {
    saveData();
  }, [inputValue]);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

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
          return (
            <Tarefa
              key={tarefa.id}
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          );
        })}
      </TarefaList>
    </div>
  );
}

export default App;

// Exercício 3 - Olhar o script listaDeTarefas
// Para rodar temos dois parâmetros. O primeiro (posição 2 do process.argv) é o número de tarefas que queremos cadastrar. Os outros parâmetros são as tarefas que colocaremos na lista.

//Cores
const red = "\u001b[31m";

let listaDeTarefas = [];

const numeroDeTarefas = Number(process.argv[2]) + 3;

if (!process.argv[2])
  console.log(
    red + "Você precisa passar o número de tarefas que serão adicionadas!"
  );
else {
  for (let i = 3; i < numeroDeTarefas; i++) {
    let novaTarefa = process.argv[i];
    novaTarefa === undefined ? null : listaDeTarefas.push(novaTarefa);
  }
  listaDeTarefas.length === 0
    ? console.log(
        red +
          "Você precisa passar as tarefas a serem adicionadas por parâmetro!"
      )
    : console.log(listaDeTarefas);
}

// Exercício 3 - Olhar o script listaDeTarefas
// Para rodar temos dois parâmetros. O primeiro (posição 2 do process.argv) é o número de tarefas que queremos cadastrar. Os outros parâmetros são as tarefas que colocaremos na lista.

let listaDeTarefas = [];

const numeroDeTarefas = Number(process.argv[2]) + 3;

for (let i = 3; i < numeroDeTarefas; i++) {
  let novaTarefa = process.argv[i];
  novaTarefa === undefined ? null : listaDeTarefas.push(novaTarefa);
}
console.log(listaDeTarefas);

// Exercício 1
// a) Os argumentos passados na linha de comando para o Node podem ser acessados utilizando o process.argv[2]. Sendo o [0] o próprio caminho do node, o [1] o caminho do arquivo executado (index.js) e o [2] o primeiro argumento passado pela linha de comando.

// b) Para rodar, pode usar o script nomeIdade.
console.log(
  `Olá, ${process.argv[2]}! Você tem ${
    process.argv[3]
  } anos. Em sete anos você terá ${Number(process.argv[4]) + 7}`
);

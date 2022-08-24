// Exercício 1
// a) Os argumentos passados na linha de comando para o Node podem ser acessados utilizando o process.argv[2]. Sendo o [0] o próprio caminho do node, o [1] o caminho do arquivo executado (index.js) e o [2] o primeiro argumento passado pela linha de comando.
// b) Para rodar, pode usar o script nomeIdade.

// Desafio: Verificar se estamos passando os 2 parâmetros. Já que não podemos acessar a terceira posição do process.argv sem passar a segunda, faremos a seguinte verificação:

// Cores -> Coloquei duas formas de passar. A primeira concatenando com o operador + e a segunda dentro de um template string.
const magenta = "\x1b[35m";
const red = "\u001b[31m";

if (!process.argv[2]) console.log(red + "Você precisa passar dois parâmetros");
else if (process.argv[2] && !process.argv[3])
  console.log(red + "Você passou um parâmetro, precisamos de mais um!");
else {
  Number(process.argv[3]) === 1
    ? console.log(
        `${magenta} Olá, ${process.argv[2]}! Você tem ${
          process.argv[3]
        } ano. Daqui à sete anos você terá ${Number(process.argv[3]) + 7} anos!`
      )
    : console.log(
        `${magenta} Olá, ${process.argv[2]}! Você tem ${
          process.argv[3]
        } anos. Daqui à sete anos você terá ${
          Number(process.argv[3]) + 7
        } anos!`
      );
}

// Exercício 2
// Para rodar, pode usar o script start passando o parâmetro da operação que deseja utilizar. Ex: npm run start add 10 2

// Verificar se estamos passando os 3 parâmetros. Já que não podemos acessar a terceira ou quarta posição do process.argv sem passar dois ou três parâmetros respectivamente, faremos a seguinte verificação:

// Como o switch tava repetindo muita coisa, inclusive a chamada da função que criei, optei por fazer dessa forma. Passei os valores por parâmetro e tratei a lógica dentro dessa função.

// Cores
const green = "\x1b[32m";
const red = "\x1b[31m";

let operacao = process.argv[2];

const verificaParametros = (tipoDaOperacao, parametro1, parametro2) => {
  if (!parametro1) {
    console.log(red + "Você precisa passar dois parâmetros!");
  } else if (parametro1 && !parametro2) {
    console.log(red + "Você precisa passar mais um parâmetro!");
  } else {
    if (tipoDaOperacao === "add")
      console.log(`${green} ${Number(parametro1) + Number(parametro2)}`);
    else if (tipoDaOperacao === "sub")
      console.log(`${green} ${Number(parametro1) - Number(parametro2)}`);
    else if (tipoDaOperacao === "mult")
      console.log(`${green} ${Number(parametro1) * Number(parametro2)}`);
    else if (tipoDaOperacao === "div")
      console.log(`${green}${Number(parametro1) / Number(parametro2)}`);
  }
};

if (operacao) {
  verificaParametros(operacao, process.argv[3], process.argv[4]);
} else console.log(red + "Escolha a operação: add, sub, mult, div");

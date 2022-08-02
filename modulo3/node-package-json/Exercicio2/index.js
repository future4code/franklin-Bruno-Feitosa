// Exercício 2
// Para rodar, pode usar o script start passando o parâmetro da operação que deseja utilizar. Ex: npm run start add 10 2

let operacao = process.argv[2];

switch (operacao) {
  case "add":
    console.log(Number(process.argv[3]) + Number(process.argv[4]));
    break;
  case "sub":
    console.log(Number(process.argv[3]) - Number(process.argv[4]));
    break;
  case "mult":
    console.log(Number(process.argv[3]) * Number(process.argv[4]));
    break;
  case "div":
    console.log(Number(process.argv[3]) / Number(process.argv[4]));
    break;
}

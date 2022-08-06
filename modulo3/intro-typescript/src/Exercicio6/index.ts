// Desafio 1

// Faça uma função que receba dois números como parâmetros e imprima no terminal, as seguintes informações:

// a) A soma desses números
// b) A subtração desses números
// c) A multiplicação desses números
// d) Qual deles é o maior

const desafio1 = (num1: number, num2: number): void => {
  const soma: number = num1 + num2;
  const subt: number = num1 - num2;
  const mult: number = num1 * num2;

  if (subt)
    console.log(
      `A soma de ${num1} e ${num2} é: ${soma}\nA subtração de ${num1} e ${num2} é: ${subt}\nA multiplicação de ${num1} e ${num2} é: ${mult}`
    );

  let qualMaior: number;

  if (subt > 0) console.log(`O maior número é o ${num1}\n`);
  else if (subt < 0) console.log(`O maior número é o ${num2}\n`);
  else console.log(`Os números são iguais\n`);
};

desafio1(10, 9);

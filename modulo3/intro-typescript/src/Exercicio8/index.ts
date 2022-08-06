// Desafio 3

// Escreva uma função que receba uma string e retorne a string reversa. Em outras palavras, se o input da sua função for "abcd", a saída deve ser "dcba" .

const desafio3 = (palavra: string): string => {
  const palavraReversaArray: string[] = palavra.split("").reverse();
  return palavraReversaArray.join("");
};

console.log(desafio3("abcd"));

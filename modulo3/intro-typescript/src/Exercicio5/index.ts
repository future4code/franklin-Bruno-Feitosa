// Js Code

// function checaRenovacaoRG() {
//     const anoAtual = Number(prompt("Digite o ano atual"))
//     const anoNascimento = Number(prompt("Digite o ano de nascimento"))
//     const anoEmissao = Number(prompt("Digite o ano de emissão do documento"))

//     const idade = anoAtual - anoNascimento
//     const tempoCarteira = anoAtual - anoEmissao

//     const cond1 = idade <= 20 && tempoCarteira >= 5
//     const cond2 = idade > 20 && idade <= 50 && tempoCarteira >= 10
//     const cond3 = idade > 50 && tempoCarteira >= 15

//     return (cond1 || cond2 || cond3)
//  }

// Ts Code

function checaRenovacaoRG(
  anoAtual: number,
  anoNascimento: number,
  anoEmissao: number
): boolean {
  const idade: number = anoAtual - anoNascimento;
  const tempoCarteira: number = anoAtual - anoEmissao;

  const cond1: boolean = idade <= 20 && tempoCarteira >= 5;
  const cond2: boolean = idade > 20 && idade <= 50 && tempoCarteira >= 10;
  const cond3: boolean = idade > 50 && tempoCarteira >= 15;

  return cond1 || cond2 || cond3;
}

console.log(checaRenovacaoRG(2022, 1996, 2011));

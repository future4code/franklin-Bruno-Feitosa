# Herança-Polimorfismo

## Herança

### Exercício 1

#### a) Seria possível imprimir a senha (password) atrelada a essa instância?

Por password ser uma propriedade privada e não possuir getter, não seria possível.

#### b) Quantas vezes a mensagem "Chamando o construtor da classe User" foi impressa no terminal?

É impressa apenas uma vez pois o constructor da classe `User` é chamado uma única vez ao criar o objeto (instância da classe).

### Exercício 2

#### a) Quantas vezes a mensagem "Chamando o construtor da classe Customer" foi impressa no terminal?

É impressa apenas uma vez pois o constructor da classe `Customer` é chamado uma única vez ao criar o objeto (instância da classe).

#### b) Quantas vezes a mensagem "Chamando o construtor da classe User" foi impressa no terminal? Por quê?

É impressa apenas uma vez pois o constructor da classe User é chamado uma única vez através do super. Ao chamar o super, chamamos o constructor da classe pai (User) visto que a classe Customer herda as informações do pai `User`. Portanto, ao executármos o código, teremos tanto a mensagem `"Chamando o construtor da classe Customer"` quanto a mensagem `"Chamando o construtor da classe User"`.

### Exercício 3

#### a) Seria possível imprimir a senha (password) atrelada a essa instância? Por quê?

Por password ser uma propriedade privada herdada do pai e não possuir getter, não seria possível imprimir a senha. Podemos criar um getter, mas acredito que imprimir a senha não faria sentido.

## Polimorfismo

### Exercício 1

#### a) Quais propriedades você conseguiu imprimir? Teve alguma que não foi possível? Por que isso aconteceu?

Consegui imprimir todas as propriedades, apenas criei de acordo com o "contrato" da interface.

### Exercício 2

#### a) Mesmo sabendo que não é possível, tente criar uma instância dessa classe (ou seja: new Place(...)). Qual foi o erro que o Typescript gerou?

`Não é possível criar uma instância de uma classe abstrata.ts(2511)`

#### b) Pense e responda: o que precisaríamos fazer para conseguir efetivamente criar uma instância dessa classe?

Poderíamos herdá-la ao invés de instanciá-la. Utilizando ela como Pai de outra classe, poderiamos herdas as informações dela e criariamos a instância da classe filha.

### Exercício 3

#### a) O que precisaríamos fazer para conseguir efetivamente criar uma instância da classe Place? (última pergunta do exercício anterior)

Poderíamos herdá-la ao invés de instanciá-la. Utilizando ela como Pai de outra classe, poderiamos herdas as informações dela e criariamos a instância da classe filha.

#### b) Por que a Place não é uma interface?

Place é uma classe porque precisa ter um acesso restrito a um dos seus atributos, o que é impossível de se fazer em interfaces.

#### c) Por que a classe Place é uma Classe Abstrata?

Place é abstrata porque não enxergamos uma situação em que seria necessário criar uma instância dessa classe.

### Exercício 4

#### a) Que métodos e propriedades essa classe possui? Por quê?

Possui essas propriedades:

```
public name: string,
    public registrationNumber: number,
    public consumedEnergy: number,
    private cpf: string,
    residentsQuantity: number,
    cep: string
  ) {
    super(residentsQuantity, cep);
  }
```

Possui esses métodos:

```
public getCpf(): string {
    return this.cpf;
  }

  calculateBill(): number {
    return this.consumedEnergy * 0.75;
  }
```

As propriedades `cep` e `residentsQuantity` são herdadas do pai Residence. As propriedades `registrationNumber`, `consumedEnergy` e o método `calculateBills()` são descritas no contrato da interface que implementamos à classe `ResidentialClient`. A propriedade `cpf` e o getter `getCpf` são exclusivas dessa classe.

### Exercício 5

#### a) Quais as semelhanças dessa classe com a ResidentialClient?

A semelhança está nas propriedades que estão no contrato da interface.

#### b) Quais as diferenças dessa classe com a ResidentialClient?

Difere principalmente na questão do `floorsQuantity`, do `cnpj` no lugar do `cpf` (alterando o getter) e no valor da multiplicação do campo `consumedEnergy`.

### Exercício 6

#### a) De qual classe a IndustrialClient deve ser filha? Por quê?

Deve ser filha da classe Industry, pois lá tem algumas propriedades específicas como a `machinesQuantity`

#### b) Que interface a IndustrialClient implementa? Por quê?

Implementa a interface Client. Por serem um cliente também, precisamos das mesmas informações que estão descritas nessa interface. Precisamos do `name`, `registrationNumber`, `consumedEnergy` e do `calculateBill()`.

#### c) Nós pedimos para criar somente os getters dessa classe. Pense num motivo para isso: por que só os getters?

Acredito que por serem apenas valores de consulta. Não faz sentido alterar campos que estão descritos nessa classe.

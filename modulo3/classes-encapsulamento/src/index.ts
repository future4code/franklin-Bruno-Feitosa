import { Bank } from "./Classes/Bank";
import { UserAccount } from "./Classes/UserAccounts";

// Exercício 1

// a) Para que serve o construtor dentro de uma classe e como fazemos para chamá-lo?
// Resposta: O construtor serve para inicializar as variáveis da classe. Para chamá-lo podemos utilizar o new para instanciar essa classe. Ao utilizar, por exemplo, const bruno = new Pessoa(), chamamos o construtor e criamos um novo objeto da classe Pessoa. Caso existam variáveis inicializadas pelo construtor, precisaremos passá-las como parâmetro: new Pessoa(nome, idade).

// b) Copie o código abaixo para o seu exercício de hoje; crie uma instância dessa classe (dê o nome, cpf e idade que você quiser). Quantas vezes a mensagem `"Chamando o construtor da classe User"` foi impressa no terminal?
// Resposta: Visto que o construtor inicializa as variáveis uma só vez (é chamado uma única vez ao criar o objeto), a mensagem que está dentro dele é chamada uma única vez.

const bruno = new UserAccount("1234567891", "Bruno Britto", 26);
const thiago = new UserAccount("1234567891", "Thiago Britto", 27);

// c) Como conseguimos ter acesso às propriedades privadas de uma classe?
// Resposta: Para termos acesso às propriedades privadas de uma classe precisamos dos getters e setters. São métodos públicos que retornam o valor de uma variável privada ou que pode alterar o valor de uma variável privada.

// Testando algumas mudanças com os setters e getters criados:

console.log(bruno.getName());
bruno.setName("Thiago Britto");
console.log(bruno.getName());
bruno.setName("Bruno Britto");

// Exercício 2

// Resposta: A classe foi criada dentro da pasta Classes na raiz do projeto e importada nesse arquivo.

// Exercício 3

// Resposta: A classe foi criada dentro da pasta Classes na raiz do projeto e importada nesse arquivo.

const bank = new Bank([]);
bank.addAccount(bruno);
bank.addAccount(thiago);
// bank.setAccounts([bruno, thiago]);
console.log(bank.getAccounts());

console.log(bank);

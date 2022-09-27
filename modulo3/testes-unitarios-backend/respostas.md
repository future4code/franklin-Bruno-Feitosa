## Testes-Unitários-Backend

### Exercício 3

#### c) Explique, com as suas palavras, as diferenças entre as duas implementações

Visando diminuir o número de dependências no código, a diferença entre os dois está relacionada a forma que é feita a chamada do método `validateCharacter` dentro dela. Sem a inversão de dependência chamamos através de um import no arquivo. Essa situação dificultaria a realização de testes unitários pois precisariamos editar o arquivo do método para colocar um possível mock, podendo quebrar outros testes... Logo, com a inversão de dependência passamos esse método por parâmetro na função que irá chamá-la, nos permitindo criar um mock e passá-lo por parâmetro da função que será testada, facilitando os testes unitários pois conseguiriámos separar melhor o que estaríamos testando.

### Exercício 4

#### a) De qual das duas funções (validateCharacter ou performAttack) deveremos criar um Mock nos próximos testes? Justifique.

Da função `validateCharacter`, pois ela que é passada como parâmetro pra a função performAttack. Foi nela que fizemos a inversão de dependência.

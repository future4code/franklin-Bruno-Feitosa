# Introdução-Autenticação

### Exercício 1

#### a) Qual a sua opinião em relação a usar strings para representar os ids? Você concorda que seja melhor do que usar números?

Acredito que utilizar strings seria melhor pois os caracteres ajudarão a aumentar o número de combinações possíveis para os IDs.

#### b) A partir de hoje vamos tentar isolar, ao máximo, as nossas lógicas dentro de funções. Isso vai deixar nosso código mais organizado e aumentar a facilidade da manutenção e refatoração. Dado isso, crie uma função para gerar um id.

Criado na pasta services no arquivo idGenerator.ts

### Exercício 2

#### a) Explique o código acima com as suas palavras.

O código estabelece a conexão com o banco de dados utilizando o knex recebendo os dados do arquivo .env e adiciona um usuário que contem id, email e password na tabela User que foi criada na const `userTableName`.

#### b) Comece criando a tabela de usuários. Coloque a query que você utilizou no arquivo de respostas.

```
CREATE TABLE User (
id VARCHAR(255) PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL
)
```

#### c) Pela mesma justificativa do exercício anterior, crie uma função para ser responsável pela criação de usuários no banco.

Está criada na pasta endpoints como `createUser.ts`

### Exercício 3

#### a) O que a linha as string faz? Por que precisamos usar ela ali?

Converte o retorno do process.env.JWT_KEY para string. Precisamos dela para evitar que ocorram erros relacionados à tipagem no typescript.

#### b) Agora, crie a função que gere o token. Além disso, crie um type para representar o input dessa função

Criado dentro da pasta services no arquivo `Authenticator.ts`

### Exercício 4

#### a) Crie o endpoint que realize isso, com as funções que você implementou anteriormente

O endpoint foi implementado no arquivo `createUser.ts`

#### b) Agora, crie a função que gere o token. Além disso, crie um type para representar o input dessa função

Criado dentro da pasta services no arquivo `Authenticator.ts`

### Exercício 5

#### a) Crie uma função que retorne as informações de um usuário a partir do email

Criado no arquivo `login.ts`
OBS: Criei 3 formas diferentes no arquivo, duas estão comentadas.

`const [user] = await connection("User").where({ email });`

#### b) Agora, crie a função que gere o token. Além disso, crie um type para representar o input dessa função

Criado dentro da pasta services no arquivo `Authenticator.ts`

### Exercício 6

#### a) Crie o endpoint que realize isso, com as funções que você implementou anteriormente

Criado no arquivo `login.ts`

#### b) Altere o seu endpoint para ele não aceitar um email vazio ou que não possua um "@"

Alterado no arquivo `login.ts`

### Exercício 7

#### a) O que a linha as any faz? Por que precisamos usá-la ali?

Converte o retorno do process.env.JWT_KEY para any. Precisamos dela para evitar que ocorram erros relacionados à tipagem no typescript.

#### b) Crie uma função que realize a mesma funcionalidade da função acima

```
 getTokenData = (token: string) => {
    const tokenData = jwt.verify(token, process.env.JWT_KEY as string);

    return tokenData;
  };
```

### Exercício 8

#### a) Comece criando uma função no data que retorne o usuário a partir do id

Criado no arquivo `getUserByIdFunction.ts` dentro de services.

#### b) Crie o endpoint com as especificações passadas

O endpoint foi criado no arquivo `getUserById`.

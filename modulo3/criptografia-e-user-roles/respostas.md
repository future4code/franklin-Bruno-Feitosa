## Criptografia e User Roles

### Exercício 1

#### a) O que são os round e salt? Que valores são recomendados para o round? Que valor você usou? Por quê?

Round: É o cost ou saltRounds. Ele está relacionado à segurança da senha, quanto maior o cost, maior a segurança, porém também se torna maior o tempo de execucão do algoritmo.
Salt: É uma string aleatória que é adicionada antes de criar o hash, evitando ataques chamados de rainbow table.

#### b) Instale o bcryptjs no seu projeto e comece criando a função generateHash(), que será responsável por criptografar uma string usando o bcryptjs.

Criado dentro do arquivo `HashManager.ts`

```
public hash = async (plainText: string) => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(plainText, salt);
    return result;
  };
```

#### c) Agora, crie a função que verifique se uma string é correspondente a um hash, use a função compare do bcryptjs

Criada dentro do arquivo `HashManager.ts`

```
 public compare = async (
    plainText: string,
    hash: string
  ): Promise<boolean> => {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  };
```

### Exercício 2

#### a) Para realizar os testes corretamente, qual deles você deve modificar primeiro? O cadastro ou o login? Justifique.

Devemos alterar primeiro o de cadastro, pois precisaremos estar cadastrados para poder fazer o login com sucesso. Logo, seguindo esse fluxo, acredito que o ideal seria modificar o cadastro primeiro.

#### b) Faça a alteração do primeiro endpoint

Alterado o endpoint de cadastro no arquivo `createUser.ts`

#### c) Faça a alteração do segundo endpoint

Alterado o endpoint de cadastro no arquivo `login.ts`

#### d) No exercício de ontem, nós criamos o endpoint `user/profile`. Também temos que modificar esse endpoint devido à adição da criptografia? Justifique.

Acredito que não precise ser modificado. Analisando a response abaixo do endpoint:

```
"user": {
    "email": "3@oscorp.com",
    "id": "6a345021-c698-4d73-ad88-9a15a57d513d"
  }
```

Acredito que não temos dados sensíveis que precisam ser criptografados. Os dados que estão sendo exibidos são `private` e só podem ser acessados por getters e setters. Logo, estão sendo apenas consultados.

### Exercício 3

#### a) Altere a sua tabela de usuários para ela possuir uma coluna role. Considere que pode assumir os valores normal e admin. Coloque normal como valor padrão.

```
ALTER TABLE to_do_list_users
ADD COLUMN role ENUM("normal", "admin") DEFAULT "normal"
```

#### b) Altere o type AuthenticationData e a função getData() para representarem esse novo tipo no token.

Alterado no arquivo `Authenticator.ts`

#### c) Altere o cadastro para receber o tipo do usuário e criar o token com essa informação. (Não esqueça de adicionar na função query para inserir agora o valor de role do usuário à coluna role no banco).

Alterados no arquivo `createUser.ts`

#### d) Altere o login para criar o token com o role do usuário.

Alterados no arquivo `login.ts`

### Exercício 4

#### a) Altere o endpoint para que retorne um erro de Unauthorized para os usuários que "não sejam normais" e tentem acessar esse endpoint.

Alterado no arquivo `getProfile.ts`

```
  if (data.role !== "normal") {
      res.statusCode = 401;
      throw new Error("Acesso não autorizado");
    }
```

### Exercício 5

#### a) Implemente o endpoint que realizará a deleção de um usuário.

Foi criado o arquivo `deleteUser.ts`

```
 public delete = async (id: string) => {
    const result = await this.getConnection()("to_do_list_users")
      .delete()
      .where({ id });

    return result;
  };
```

### Exercício 6

#### a) Implemente o endpoint que retorne as informações (id e email) de um usuário a partir do seu id.

Foi criado o arquivo `getUserById.ts`.

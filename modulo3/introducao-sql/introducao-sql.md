## Banco de Dados e Introdução a SQL

### Exercício 1:

#### a)

Além do `FLOAT` foram usados o `VARCHAR` e o `DATE`. O Id como `VARCHAR(255)` foi utilizado pois o identificador poderia ser, por exemplo, um token (números, letras, etc). O Nome também é o `VARCHAR(255)` pois definimos o padrão de 255 para o número de caracteres. No `gender` colocamos `VARCHAR(6)` pois seis caracteres já são suficientes para identificar. Já no `birth_date` usamos `DATE` pois é a forma de representarmos uma data em uma tabela. O `Id` é considerado uma chave primária por ser um elemento que não pode ser repetido e é único na tabela. Todos os outros são `NOT NULL` por serem campos obrigatórios, não podem estar vazios.

#### b)

`SHOW DATABASES` mostra o nosso schema `franklin-bruno-feitosa`. O `SHOW TABLE` mostra nossas tabelas que estão no schema ou database selecionado.

#### c)

`DESCRIBE Actor` descreve a tabela e mostra os campos, os tipos, se é nulo ou não, os que são chave primária, estrangeira.

### Exercício 2:

#### a)

```
INSERT INTO Actor (id, nome, salary, birth_date, gender)
VALUES(
  "002",
  "Glória Pires",
  1200000,
  "1963-08-23",
  "female"
);
```

#### b)

```
 Error Code: 1062. Duplicate entry '002' for key 'PRIMARY'.
```

O erro aconteceu pois não podemos duplicar um item que é chave primária, ele é único. Então ao criarmos um elemento com a mesma chave primaria de um já cadastrado, receberemos esse erro.

#### c)

Adicionei os campos `birth_date` e `gender`. Como cadastrei com nome no lugar de name, todos estão com nome.

```
INSERT INTO Actor (id, nome, salary, birth_date, gender)
VALUES(
  "003",
  "Fernanda Montenegro",
  300000,
  "1929-10-19",
  "female"
);
```

#### d)

Adicionei o campo nome e adicionei o nome na query.

```
INSERT INTO Actor (id, nome, salary, birth_date, gender)
VALUES(
  "004",
  "Wagner Moura",
  400000,
  "1949-04-18",
  "male"
);
```

#### e)

Adicionei aspas na data pois é um VARCHAR.

```
INSERT INTO Actor (id, nome, salary, birth_date, gender)
VALUES(
  "005",
  "Juliana Paes",
  719333.33,
  "1979-03-26",
  "female"
);
```

### Exercicio 3:

#### a)

Seleciona todas as atrizes na tabela.

```
SELECT * FROM Actor WHERE gender="female"
```

#### b)

Seleciona o salário do ator com o nome `Tony Ramos`

```
SELECT salary FROM Actor WHERE nome="Tony Ramos"
```

#### c)

Seleciona todas as informações com `gender = invalid`. Retorna uma coluna com tudo null. Pelo que entendi, como não existe nenhum cadastro com o `gender = invalid`, o retorno é null. Também não seria possível cadastrar esse gender pois invalid excede o limite de 6 caracteres.

```
SELECT * FROM Actor WHERE gender="invalid"
```

#### d)

Seleciona e retorna o id, nome e salário de todos com salário até, no máximo, R$500.000.

```
SELECT id, nome, salary FROM Actor WHERE salary < 500000
```

#### e)

O erro não aconteceu aqui pois cadastrei nome no lugar de name. Mas simulando o erro digitando name ao cadastrar, recebi o seguinte erro. Para corrigí-lo basta corrigir a escrita pois o campo a ser inserido precisa ser digitado exatamente igual ao cadastrado no banco de dados.

```
Error Code: 1054. Unknown column 'name' in 'field list'
```

Após a correção ficaria:

```
SELECT id, nome from Actor WHERE id = "002.
```

### Exercicio 4:

```
SELECT * FROM Actor WHERE (name LIKE "A%" OR name LIKE "J%") AND salary > 300000
```

#### a)

Explicando a query acima, os resultados que serão exibidos serão os elementos da tabela `Actor` os quais o nome começa com a letra A ou o nome começa com a letra J e seu salário é maior que 300000.

#### b)

```
SELECT * FROM Actor WHERE nome NOT LIKE "A%" AND salary > 350000
```

#### c)

```
SELECT * FROM Actor WHERE nome LIKE "%G%" OR nome LIKE "%g%"
```

#### d)

```
SELECT * FROM Actor WHERE (nome LIKE "%G%" OR nome LIKE "%g%" OR nome LIKE "%A%" OR nome LIKE "%a%") AND salary BETWEEN 350000 AND 900000
```

### Exercício 5:

#### a)

```
CREATE TABLE Movie (
id VARCHAR(255) PRIMARY KEY,
title VARCHAR(255) NOT NULL UNIQUE,
synopsis TEXT NOT NULL,
release_Date DATE NOT NULL,
rating INT NOT NULL
);
```

#### b)

```
INSERT INTO Movie (id, title, synopsis, release_Date, rating)
VALUES (001,"Se Eu Fosse Você","Cláudio e Helena são casados há muitos anos e enfrentam a rotina do casamento. Um dia eles são atingidos por um fenômeno inexplicável e trocam de corpos","2006/01/06",7);
```

#### c)

```
INSERT INTO Movie (id, title, synopsis, release_Date, rating)
VALUES (002,"Doce de mãe","Dona Picucha, uma animada senhora de 85 anos, sempre causa grandes confusões. A vida dela e dos seus quatro filhos sofre uma reviravolta depois que Zaida, empregada e amiga de Dona Picucha, anuncia que vai se casar e não poderá mais morar com ela", "2012/12/27", 10);
```

#### d)

```
INSERT INTO Movie (id, title, synopsis, release_Date, rating)
VALUES (003,"Dona Flor e Seus Dois Maridos","Dona Flor é uma sedutora professora de culinária casada com Vadinho, que só quer saber de farras e jogatina nas boates. A vida de abusos acaba por acarretar sua morte precoce.", "2017/11/02", 8);
```

#### e)

```
INSERT INTO Movie (id, title, synopsis, release_Date, rating)
VALUES (004,"Minha Mãe É Uma Peça 3","Em Minha Mãe É Uma Peça 3, Dona Hermínia (Paulo Gustavo) vai ter que se redescobrir e se reinventar porque seus filhos estão formando novas famílias. Essa supermãe vai ter que segurar a emoção para lidar com um novo cenário de vida: Marcelina (Mariana Xavier) está grávida e Juliano (Rodrigo Pandolfo) vai casar. Dona Hermínia está mais ansiosa do que nunca! Para completar as confusões, Carlos Alberto (Herson Capri), seu ex-marido, que esteve sempre por perto, agora resolve se mudar para o apartamento ao lado.", "2019/12/26", 10);
```

### Exercício 6:

#### a)

Retorna um id, título e avaliação a partir de um id específico.

```
SELECT id, title, rating FROM Movie WHERE id = "001";
```

#### b)

Retorna um filme a partir de um título específico.

```
SELECT * FROM Movie WHERE title = "Minha Mãe é uma Peça 3";
```

#### c)

Retorna o id, título e sinopse dos filmes com avaliação mínima de 7.

```
SELECT id, title, synopsis FROM Movie WHERE rating > 7;
```

### Exercício 7:

#### a)

Retorna um filme cujo título contenha a palavra vida.

```
SELECT * FROM Movie WHERE title LIKE "%vida%";
```

#### b)

Pesquisa se o termo de busca está contido no título ou na sinopse.

```
SELECT * FROM Movie WHERE title LIKE "%filhos%" OR synopsis LIKE "%filhos%";
```

#### c)

Procura por todos os filmes que já tenham lançado.

```
SELECT * FROM Movie WHERE release_Date < "2022/08/16";
```

#### d)

Procura por algum filme que já tenha lançado, com o termo de busca contido no título ou sinopse e com a avaliação maior do que 7.

```
SELECT * FROM Movie WHERE release_Date < "2022/08/16" AND (title LIKE "%filhos%" OR synopsis LIKE "%filhos%") AND rating > 7
```

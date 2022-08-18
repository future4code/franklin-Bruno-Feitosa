## Aprofundamento SQL

### Exercício 1:

#### a)

Deletaria a coluna `salary` da tabela `Actor`.

#### b)

Modificaria a coluna `gender` para `sex` e alteraria o tipo para `VARCHAR(6)`.

#### c)

Modificaria a coluna `gender`  alterando apenas seu tipo para `VARCHAR(255)`.

#### d)

```
ALTER TABLE Actor CHANGE gender gender VARCHAR(100);
```

### Exercício 2:

#### a)

```
UPDATE Actor
SET
	nome = "Thiago Fragoso",
	birth_date = "1981/11/1"
WHERE id = "003";
```

#### b)
Query para retornar JULIANA PAES:
```
UPDATE Actor
SET
	nome = UPPER(nome)
WHERE nome = "Juliana Paes";
```
Query para retornar Juliana Paes:
```
UPDATE Actor
SET
	nome = "Juliana Paes"
WHERE nome = "JULIANA PAES";
```

#### c)

```
UPDATE Actor
SET
	nome = "José Padilha",
	salary = 2000000,
	birth_date = "1967/08/01",
	gender = "male",
	favorite_ice_cream_flavor = "chocolate",
type = "Director"
WHERE id = "005";
);
```

#### d)

Os erros abaixo são impedidos pelo SQL durante a execução, não afetando as colunas existentes. Precisamos passar o nome correto das colunas para que seja realizado com sucesso.

```
UPDATE Actor
SET
	name = "José Padilha"
WHERE id = "005";

Error Code: 1054. Unknown column 'name' in 'field list', caso passe dentro do SET.
```
```
UPDATE Actor
SET
	nome = "José Padilha"
WHERE ied = "005";

Error Code: 1054. Unknown column 'ied' in 'where clause', caso passe no where.
```

### Exercicio 3:

#### a)

```
DELETE FROM Actor WHERE name = "Fernanda Montenegro";
```

#### b)

```
DELETE FROM Actor WHERE gender = "male" AND salary > 1000000;
```

### Exercicio 4:

#### a)

```
SELECT MAX(salary) AS maxSalary FROM Actor;
```

#### b)

```
SELECT MIN(salary) AS minSalary FROM Actor WHERE gender = "female";
```

#### c)

```
SELECT COUNT(*) AS actressesQuantity FROM Actor WHERE gender = "female";
```

#### d)

```
SELECT SUM(salary) AS salarySum FROM Actor;
```

### Exercício 5:

#### a)
A query exibe as colunas Count(*) com a contagem de atores/atrizes na tabela dividindo a quantidade por gênero. Ou seja, no lugar de retornar o total (6), exibe os números dividido para cada gênero (2 female e 4 male).

#### b)

```
SELECT id, nome FROM Actor ORDER BY nome DESC;
```

#### c)

Como por padrão o resultado é exibido de forma crescente pelo `ORDER BY`, podemos fazer das duas maneiras.
```
SELECT salary FROM Actor ORDER BY salary ASC;
ou
SELECT salary FROM Actor ORDER BY salary;
```

#### d)

```
SELECT salary FROM Actor ORDER BY salary DESC LIMIT 3;
```

#### e)

```
SELECT AVG(salary) AS averageSalary, gender FROM Actor GROUP BY gender;
```

### Exercício 6:

#### a)

Adiciona o campo `playing_limit_date` do tipo `DATE` na tabela Movies.

```
ALTER TABLE Movie
ADD playing_limit_date DATE;
```

#### b)

Altera o rating para que ele possa receber números não inteiros.

```
ALTER TABLE Movie
CHANGE rating rating FLOAT;
```

#### c)

Atualiza dois filmes de tal forma que tenhamos um em cartaz e um que já tenha saído.

Filme 1:
```
UPDATE Movie
SET playing_limit_date = "2022/10/20"
WHERE id = "001";
```
Filme 2:
```
UPDATE Movie
SET playing_limit_date = "2020/08/20"
WHERE id = "002";
```

#### d) 

Como o elemento com o `id = "002"` foi deletado da tabela, a query não deu match com nada e não afetou/alterou nada. Não notificou erro ou warning pois não afetou nada.
```
0 row(s) affected Rows matched: 0  Changed: 0  Warnings: 0
```
### Exercício 7:

#### a)

```
SELECT COUNT(*) FROM Movie WHERE rating > 7.5;
```

#### b)

```
SELECT AVG(rating) FROM Movie;
```

#### c)

```
SELECT COUNT(*) FROM Movie WHERE playing_limit_date > CURDATE();
```

#### d)

```
SELECT COUNT(*) FROM Movie WHERE release_Date > CURDATE();
```

#### e)

```
SELECT MAX(rating) FROM Movie;
```

#### f)

```
SELECT MIN(rating) FROM Movie;
```

### Exercício 8:

#### a)

```
SELECT * FROM Movie ORDER BY title ASC;
```

#### b)

```
SELECT * FROM Movie ORDER BY title DESC LIMIT 5;
```

#### c)

```
SELECT * FROM Movie WHERE release_Date < CURDATE() ORDER BY release_Date DESC LIMIT 3;
```

#### d)

```
SELECT * FROM Movie ORDER BY rating DESC LIMIT 3;
```
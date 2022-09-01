## Relações em SQL

### Exercício 1:

#### a)

Chave estrangeira é o campo que estabelece o relacionamento entre duas tabelas. É uma chave que referencia a chave primária de uma outra tabela.

#### b)

```
INSERT INTO Rating (id, comment,rate,movie_id)
VALUES ("001", "Gostei muito do filme, ri bastante!", 10, "002");
```

#### c)

Pelo que entendi, não podemos passar um `movie id` como `"005"` pelo fato de não existir um filme com esse ID no campo referenciado (na tabela pai) e por isso ele dá o `Error Code: 1452`.

```
Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`franklin-bruno-feitosa`.`Rating`, CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`))
```

#### d)

```
ALTER TABLE Movie DROP COLUMN rating;
```

#### e)

Para deletar um elemento que foi usado na criação de um elemento de outra tabela, precisamos deletar todas as referências dele naquela tabela. Ou seja, o erro ocorre pois tentamos deletar diretamente o elemento sem deletar as referências dele na outra tabela antes.

```
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`franklin-bruno-feitosa`.`Rating`, CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`))

```

### Exercício 2:

#### a)

Essa tabela é criada com dois elementos, o `movie_id` e o `actor_id`. Ambos são utilizados como chave estrangeira e fazem referência ao `id` da tabela `Movie` e ao `id` da tabela `Actor`, respectivamente.

#### b)

```
INSERT INTO MovieCast (movie_id, actor_id) VALUES ("003", "001")

INSERT INTO MovieCast (movie_id, actor_id) VALUES ("003", "003")

INSERT INTO MovieCast (movie_id, actor_id) VALUES ("003", "006")

INSERT INTO MovieCast (movie_id, actor_id) VALUES ("002", "002")

INSERT INTO MovieCast (movie_id, actor_id) VALUES ("002", "001")

INSERT INTO MovieCast (movie_id, actor_id) VALUES ("002", "006")

```

#### c)

O erro aconteceu pois não como referenciar um elemento que não existe na tabela pai. No caso, ao passarmos um `movie_id` ou `actor_id` que não existe na tabela pai, tomamos o `Error Code: 1452.`

```
Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`franklin-bruno-feitosa`.`MovieCast`, CONSTRAINT `MovieCast_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `Actor` (`id`))

```

#### d)

Para deletar um elemento que foi usado na criação de um elemento de outra tabela, precisamos deletar todas as referências dele naquela tabela. Ou seja, o erro ocorre pois tentamos deletar diretamente o elemento sem deletar as referências dele na outra tabela antes.

```
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`franklin-bruno-feitosa`.`MovieCast`, CONSTRAINT `MovieCast_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `Actor` (`id`))

```

### Exercicio 3:

#### a)

O operador ON é como um filtro para exibir as informações das duas tabelas (JOIN) que satisfazem determinada condição. Por exemplo, na chamada abaixo exibimos as informações das duas tabelas apenas para o filme que satisfaz a condição `Movie.id = Rating.movie_id`. Ou seja, apenas os filmes os quais o `id` da tabela Movie e da tabela Rating são os mesmos.

```
SELECT * FROM Movie
INNER JOIN Rating ON Movie.id = Rating.movie_id;
```

#### b)

```
SELECT Movie.id, Movie.title, Rating.rate as rating FROM Movie
INNER JOIN Rating ON Movie.id = Rating.movie_id;
```

### Exercicio 4:

#### a)

```
SELECT  Movie.id, Movie.title, Rating.rate as rating,Rating.movie_id, Rating.comment FROM Movie
LEFT JOIN Rating ON Movie.id = Rating.movie_id
```

#### b)

```
SELECT Movie.id, Movie.title, MovieCast.actor_id FROM Movie
RIGHT JOIN MovieCast ON Movie.id = MovieCast.movie_id;
```

#### c)

```
SELECT AVG(Rating.rate), Movie.id, Movie.title FROM Movie
LEFT JOIN Rating ON Rating.movie_id = Movie.id
GROUP BY Movie.id
```

### Exercício 5:

#### a)

São necessários dois `JOIN` pois estamos utilizando três tabelas ao invés de duas. Essa query retorna tudo que está na tabela `Movie`, tudo que está relacionado entre `MovieCast` e `Movie` satisfazendo a condição `m.id = mc.movie_id` e tudo de `Actor` que está relacionado entre `Actor` e `MovieCast` satisfazendo a condição `a.id = mc.actor_id`.

#### b)

```
SELECT Movie.id as movieId, Movie.title as title, Actor.id as actorId, Actor.nome FROM Movie
LEFT JOIN MovieCast ON Movie.id = MovieCast.movie_id
JOIN Actor ON Actor.id = MovieCast.actor_id;
```

#### c)

O erro ocorreu pois onde tem `SELECT m.id as movie_id, m,title, a.id as actor_id, a.name FROM Movie m` o `m,title` deveria ser `m.title`. O `m,title` faz com que ele procure a coluna m dentro de Movie.

```
Error Code: 1054. Unknown column 'm' in 'field list'
```

#### d)

```
SELECT Movie.title, Rating.rate as rating, Rating.comment, Actor.nome FROM Movie
LEFT JOIN Rating ON Rating.movie_id = Movie.id
JOIN MovieCast ON Movie.id = MovieCast.movie_id
LEFT JOIN Actor ON Actor.id = MovieCast.actor_id;
```

### Exercício 6:

#### a)

A relação é M:N, pois um filme pode receber mais de um óscar e um óscar pode ser dado a mais de um filme (em diferentes anos).

#### b)

```
CREATE TABLE Oscar (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
awardDate DATE NOT NULL
movie_id VARCHAR(255) NOT NULL,
FOREIGN KEY (movie_id) REFERENCES Movie.id
);
```

#### c)

```
INSERT INTO Oscar(name, awardDate, movie_id) VALUES ("Melhor filme de comédia", "2022/03/27", "002");
INSERT INTO Oscar(name, awardDate, movie_id) VALUES ("Melhor filme de terror", "2022/03/27", "003");
```

#### d)

```
SELECT Movie.id as movieId, Movie.title as movieTitle, Oscar.name as oscarName, Oscar.awardDate from Movie
INNER JOIN Oscar ON Movie.id = Oscar.movie_id;
```

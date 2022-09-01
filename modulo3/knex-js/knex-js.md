## Knex-JS

### Exercício 1:

#### a)

A resposta que temos quando usamos o raw são dois arrays, o `RawDataPacket` e o `FieldPacket` . O primeiro possui o resultado que retornou da busca no banco de dados e para acessá-lo podemos entrar no array dentro deles, ficando `result[0][0]`, por exemplo. Já no segundo podemos pegar algumas informações extras que não utilizaremos por enquanto, mas para utilizar basta fazer da mesma forma do `RawDataPacket` alterando apenas o primeiro índice: `result[1][0]`.

#### b)

```
const getActorsByName = async (nome: string): Promise<any> =>
const result = await connection.raw(`
	SELECT * FROM Actor WHERE nome = ${nome}`
);
return result[0][0];
};
```

#### c)

```
const getItensQuantityByGender = async (gender: string): Promise<any> => {
const result = await connection.raw(`
	SELECT COUNT(*) AS itensQuantityByGender FROM Actor WHERE gender = ${gender}`
);
return result[0][0];
};
```

### Exercício 2:

#### a)

```
const updateSalary = async (id: string, salary: number): Promise<void> => {
await connection
.update({
	salary:  salary,
})
.where("id", id)
.from("Actor");
};
```

#### b)

```
const deleteActor = async (id: string): Promise<void> => {
await connection
.delete()
.where("id", id)
.from("Actor");
};
```

#### c)

```
const averageSalaryByGender = async (gender: string): Promise<any> => {
const result = await connection
.avg(`salary as ${gender}AverageSalary`)
.where("gender", gender)
.from("Actor");

return result[0];
};
```

### Exercicio 3:

#### a)

Endpoint:

```
app.get("/actorsById/:id", async (req: Request, res: Response) => {
try {
	const  id: string = req.params.id;
	const  actors = await  getActorsById(id);
	res.status(200).send(actors);
}
catch (error) {
	console.log(error);
	res.status(500).send("Unexpected error");
}
});
```

Função:

```
const getActorsByIdFunction = async (id: string): Promise<any> => {
const result = await connection.raw(`
	SELECT * FROM Actor WHERE ID = ${id}`
	);

return  result[0][0];
};
```

#### b)

Endpoint:

```
app.get("/countActorsByGender", async (req: Request, res: Response) => {
try {
	const gender: string = String(req.query.gender);
	const count = await countActorsByGender(gender);
	res.status(200).send(count);
}
catch (error) {
	console.log(error);
	res.status(500).send(error);
}
});
```

Função:

```
const countActorsByGenderFunction = async (
	gender: string
): Promise<any> => {
	const  count = await connection
	.count("* as countActorsByGender")
	.where("gender", gender)
	.from("Actor");
	return count[0];
};
```

### Exercicio 4:

#### a)

Endpoint:

```
app.post("/updateSalary/:id",async (req: Request, res: Response) => {
try {
	const id: string = req.params.id;
	const salary: number = req.body.salary;
	const newSalary = await updateSalaryFunction(id, salary);
	res.status(200).send({ message: "Success" });
} catch (error) {
	console.log(error);
	res.status(500).send("Unexpected error");
}});
```

Função:

```
const updateSalaryFunction = async (
	id: string,
	salary: number
): Promise<void> => {
	await connection
	.update({
		salary: salary,
	})
	.where("id", id)
	.from("Actor");
};
```

#### b)

Endpoint:

```
app.delete("/deleteActor/:id", async (req: Request, res: Response) => {
try {
	const id: string = req.params.id;
	const actor = deleteActorFunction(id);
	res.status(200).send(actor);
} catch (error) {
	console.log(error);
	res.status(500).send("Unexpected error");
}});
```

Função:

```
const deleteActorFunction = async (
	id: string
): Promise<void> => {
	await connection
	.delete()
	.where("id", id)
	.from("Actor");
};
```

### Exercício 5:

#### a)

Endpoint:

```
app.post("/createMovie", async (req: Request, res: Response) => {
const { id, title, synopsis, release_Date, rating, playing_limit_date } =
req.body;
try {
	createMovieFunction(
		id,
		title,
		synopsis,
		release_Date,
		rating,
		playing_limit_date
	);
	res.status(201).send({ message: "Success" });
} catch (error) {
	console.log(error);
	res.status(500).send("Unexpected Error");
}});
```

Função:

```
const createMovieFunction = async (
	id: string,
	title: string,
	synopsis: string,
	release_Date: Date,
	rating: number,
	playing_limit_date: Date
) => {
await  connection
.insert({
	id: id,
	title: title,
	synopsis: synopsis,
	release_Date: release_Date,
	rating: rating,
	playing_limit_date: playing_limit_date,
})
.into("Movie");
};
```

### Exercício 6:

#### a)

Endpoint:

```
app.get("/allMovies", async (req: Request, res: Response) => {
try {
	const movies = await displayAllMoviesFunction();
	res.status(201).send(movies);
} catch (error) {
	console.log(error);
	res.status(500).send("Unexpected Error");
}});
```

Função:

```
const displayAllMoviesFunction = async () => {
const result = await connection.raw(`SELECT * FROM Movie LIMIT 15`);

return  result[0];
};
```

### Exercício 7:

#### a)

Endpoint:

```
app.get("/moviesSearch", async (req: Request, res: Response) => {
try {
	const searchTerm: string = String(req.query.searchTerm);
	const movie = await  getMoviesBySearchTermFunction(searchTerm);
	res.status(200).send(movie);
} catch (error) {
	console.log(error);
	res.status(500).send(error);
}});
```

Função:

```
const getMoviesBySearchTermFunction = async (
	searchTerm: string
): Promise<any> => {
	const movie = await  connection
	.select("*")
	.where("title", "like", `%${searchTerm}%`)
	.orWhere("synopsis", "like", `%${searchTerm}%`)
	.orderBy("release_Date")
	.from("Movie");
	return movie;
};
```

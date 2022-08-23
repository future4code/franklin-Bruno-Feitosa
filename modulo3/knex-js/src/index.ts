import { Response, Request } from "express";
import { stringify } from "querystring";
import app from "./app";
import connection from "./connection";

const getActorsById = async (id: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Actor WHERE ID = ${id}`);
  return result[0][0];
};

const getActorsByName = async (nome: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT * FROM Actor WHERE nome = ${nome}`);
  return result[0][0];
};

const getItensQuantityByGender = async (gender: string): Promise<any> => {
  const result = await connection.raw(`
  SELECT COUNT(*) FROM Actor WHERE gender = ${gender}
  `);
  return result[0][0];
};

app.get("/actorsById/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    res.send(await getActorsById(id));
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
});

app.get("/actorsByName/:nome", async (req: Request, res: Response) => {
  try {
    const nome: string = req.params.nome;
    res.send(await getActorsByName(nome));
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
});

app.get(
  "/itensQuantityByGender/:gender",
  async (req: Request, res: Response) => {
    try {
      const gender: string = req.params.gender;
      res.send(await getItensQuantityByGender(gender));
    } catch (error) {
      console.log(error);
      res.status(500).send("Unexpected error");
    }
  }
);

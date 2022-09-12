import app from "./app";
import editUser from "./endpoints/editUser";
import createUser from "./endpoints/createUser";
import { IdGenerator } from "./services/idGenerator";
import { Authenticator } from "./services/Authenticator";
import { AuthenticationData } from "./types";
import { login } from "./endpoints/login";
import { getUserById } from "./endpoints/getUserById";

const generateId: string = new IdGenerator().generateId();
const authenticator = new Authenticator();
const payload: AuthenticationData = {
  id: "id-bananinha",
};
console.log(authenticator.generateToken(payload));

app.post("/user/signup", createUser);
app.post("/user/login", login);
app.put("/user/edit", editUser);
app.get("/user/profile", getUserById);

import app from "./app";
import editUser from "./endpoints/editUser";
import createUser from "./endpoints/createUser";
import login from "./endpoints/login";
import getProfile from "./endpoints/getProfile";
import { deleteUser } from "./endpoints/deleteUser";
import { getUserById } from "./endpoints/getUserById";

app.post("/user/signup", createUser);
app.post("/user/login", login);
app.put("/user/edit", editUser);
app.get("/user/profile", getProfile);
app.delete("/user/:id", deleteUser);
app.get("/user", getUserById);

import { app } from "./app";
import { createTask } from "./endpoints/createTask";
import { createUser } from "./endpoints/createUser";
import { editUser } from "./endpoints/editUser";
import { getAllUser } from "./endpoints/getAllUser";
import { getTaskById } from "./endpoints/getTaskById";
import { getTaskByUser } from "./endpoints/getTaskByUser";
import { getUserById } from "./endpoints/getUserById";

// User
app.get("/user/all", getAllUser);
app.get("/user/:id", getUserById);
app.post("/user", createUser);
app.put("/user/edit/:id", editUser);

// Task
app.post("/task", createTask);
app.get("/task/:id", getTaskById);
app.get("/task", getTaskByUser);

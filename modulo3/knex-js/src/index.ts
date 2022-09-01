import app from "./app";
import { averageSalaryByGender } from "./endpoints/averageSalaryByGender/averageSalaryByGender";
import { countActorsByGender } from "./endpoints/countActorsByGender/countActorsByGender";
import { createMovie } from "./endpoints/createMovie/createMovie";
import { deleteActor } from "./endpoints/deleteActor/deleteActor";
import { displayAllMovies } from "./endpoints/displayAllMovies/displayAllMovies";
import { getActorsById } from "./endpoints/getActorsById/getActorsById";
import { getActorsByName } from "./endpoints/getActorsByName/getActorsByName";
import { getItensQuantityByGender } from "./endpoints/getItensQuantityByGender/getItensQuantityByGender";
import { getMoviesBySearchTerm } from "./endpoints/getMoviesBySearchTerm/getMoviesBySearchTerm";
import { updateSalary } from "./endpoints/updateSalary/updateSalary";

app.get("/actorsById/:id", getActorsById);

app.get("/actorsByName/:nome", getActorsByName);

app.get("/itensQuantityByGender/:gender", getItensQuantityByGender);

app.post("/updateSalary/:id", updateSalary);

app.delete("/deleteActor/:id", deleteActor);

app.get("/averageSalaryByGender/:gender", averageSalaryByGender);

app.get("/countActorsByGender", countActorsByGender);

// Desafios

app.post("/createMovie", createMovie);

app.get("/allMovies", displayAllMovies);

app.get("/moviesSearch", getMoviesBySearchTerm);

import { Router } from "express";
import { CardBusiness } from "../business/CardBusiness";
import { CardController } from "../controller/CardController";
import { CardDatabase } from "../database/CardDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LuhnCheckAlgorithm } from "../services/LuhnCheckAlgorithm";
import { tokenValidate } from "../services/tokenValidate";

export const cardRoutes = Router();

const cardController = new CardController(
  new CardBusiness(
    new CardDatabase(),
    new HashManager(),
    new Authenticator(),
    new IdGenerator(),
    new LuhnCheckAlgorithm()
  )
);

cardRoutes.post("/create", tokenValidate, cardController.registerCard);
cardRoutes.get("/all", tokenValidate, cardController.allCards);
cardRoutes.get("/:cardNumber", tokenValidate, cardController.singleCard);
cardRoutes.delete("/:cardNumber", tokenValidate, cardController.deleteCard);

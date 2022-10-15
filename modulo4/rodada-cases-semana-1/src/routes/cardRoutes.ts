import { Router } from "express";
import { CardBusiness } from "../business/CardBusiness";
import { CardController } from "../controller/CardController";
import { CardDatabase } from "../database/CardDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { LuhnCheckAlgorithm } from "../services/LuhnCheckAlgorithm";

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

cardRoutes.post("/create", cardController.registerCard);
cardRoutes.get("/all", cardController.allCards);
cardRoutes.get("/:cardNumber", cardController.singleCard);
cardRoutes.delete("/:cardNumber", cardController.deleteCard);

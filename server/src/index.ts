import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import express, { Request, Response } from "express";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckControllers } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckControllers);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

mongoose
  .connect(
    "mongodb+srv://root:Birdys195@cluster0.fesohko.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port);
    console.log(`listening on port ${port}`);
  });

import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function createDeckControllers(req: Request, res: Response) {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createDeck = await newDeck.save();
  res.json(createDeck);
}

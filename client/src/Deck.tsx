import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Deck.css";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { TDeck } from "./api/getDecks";
import { deleteCard } from "./api/deleteCard";

function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  async function handlecreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    console.log(newDeck);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="Deck">
      <ul className="cards">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handlecreateDeck}>
        <div className="text">
          <label htmlFor="card-title">Card Text</label>
        </div>
        <input
          id="card-title"
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          // TODO: save the typed input
        />
        <button id="submit-btn">Create Deck</button>
      </form>
    </div>
  );
}

export default Deck;

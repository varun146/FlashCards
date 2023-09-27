import { useEffect, useState } from 'react'
import {deleteDeck} from "./api/deleteDeck"
import {getDecks, TDeck} from "./api/getDecks"
import { Link} from "react-router-dom"
import './App.css'
import { createDeck } from './api/createDecks'

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("")

    
  async function handlecreateDeck(e: React.FormEvent){
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }  

  async function handleDeleteDeck(deckId: string){
    deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId ))
  }


  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
    return () => {
      console.log("Cleanup");
    }
  }, [])




  return (
    <div className='App'>
      <ul className="decks">
        {
          decks.map((deck) => (
            <li key={deck._id}>
              <button  onClick={() => handleDeleteDeck(deck._id)}>X</button> 
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>   
          ))
        }
      </ul>
      <form onSubmit={handlecreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input id="deck-title" type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{setTitle(e.target.value)}} 
          // TODO: save the typed input 

        />
        <button id='submit-btn'>Create Card</button>

      </form>
    </div>
    
  )
}

export default App

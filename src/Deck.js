import axios from "axios";
import {useState, useEffect, useRef} from "react";
import "./Deck.css";
import Card from "./Card";

const Deck = () => {
    const [remaining, setRemaining] = useState(52);
    const [cards, setCards] = useState([]);
    const deckId = useRef();

    useEffect(() => {
        const getDeck = async () => {
            const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            deckId.current = res.data.deck_id;
        }
        getDeck();
    }, []);

    const drawCard = async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        const newCard = res.data.cards[0];
        setCards(cards => [...cards, newCard]);
        setRemaining(num => num - 1);
    }

    const showError = () => alert("Error: no cards remaining!");

    return (
        <div className="Deck">
            <button 
                className="Deck-btn"
                onClick={remaining === 0 ? showError : drawCard}>GIMME A CARD!</button>
            {cards.map(({ code, image }) => <Card key={code} img={image} />)}
        </div>
    );
}

export default Deck;
import axios from "axios";
import {useState, useEffect, useRef} from "react";
import "./Deck.css";
import Card from "./Card";

const Deck = () => {
    const [remaining, setRemaining] = useState(52);
    const [cards, setCards] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const deckId = useRef();
    const intervalId = useRef();

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

    useEffect(() => {
        if (drawing && remaining > 0) {
            intervalId.current = setInterval(drawCard, 100);    
        } else {
            clearInterval(intervalId.current);
            setDrawing(false);
        }
        return () => clearInterval(intervalId.current);
    }, [drawing, remaining]);

    const toggleDrawing = () => setDrawing(drawing => !drawing);
    const showError = () => alert("Error: no cards remaining!");

    return (
        <div className="Deck">
            <button 
                className="Deck-btn"
                onClick={remaining > 0 ? toggleDrawing : showError}>
            {drawing ? "Stop Drawing" : "Start Drawing"}
            </button>
            {cards.map(({ code, image }) => <Card key={code} img={image} />)}
        </div>
    );
}

export default Deck;
import "./Card.css";

const Card = ({img}) => (
    <div className="Card">
        <img src={img} alt="New Card" />
    </div>
);

export default Card;
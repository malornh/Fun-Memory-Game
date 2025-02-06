import './Card.css';

interface Props {
  imageNumber: number;
  onClick: () => void;
  isFlipped: boolean;
}

const Card = ({ imageNumber, onClick, isFlipped }: Props) => {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img
            className="image"
            src={`../assets/card.png`} 
            alt="Card Back"
          />
        </div>

        <div className="card-back">
          <img
            className="image"
            src={`../assets/${imageNumber}.png`} 
            alt={`Image ${imageNumber}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

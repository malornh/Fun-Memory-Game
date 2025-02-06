import { useState, useEffect } from "react";
import Card from "./Card";
import Confetti from "react-confetti"; 
import { useWindowSize } from 'react-use';
import ringer from "/assets/flipdish-ringer.mp3"; 
import matchSound from "/assets/match-sound.mp3"; 
import startSound from "/assets/start-sound.mp3"; 
import './Board.css';

const Board = () => {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(Array(28).fill(false)); 
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]); 
  const { width, height } = useWindowSize(); 
  const [isGameWon, setIsGameWon] = useState(false); 
  const match = new Audio(matchSound); 

  useEffect(() => {
    const array: number[] = [];
    for (let i = 1; i <= 14; i++) {
      array.push(i, i); 
    }
    shuffleArray(array);
    setCardArray(array); 
  }, []); 

  const shuffleArray = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const handleCardClick = (index: number) => {
    if (flippedCards[index] || selectedCards.length === 2) return;

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev];
      newFlippedCards[index] = true;
      return newFlippedCards;
    });

    setSelectedCards((prev) => [...prev, index]);

    if (selectedCards.length === 1) {
      const firstCardIndex = selectedCards[0];
      const secondCardIndex = index;

      if (cardArray[firstCardIndex] === cardArray[secondCardIndex]) {
        setSelectedCards([]); 
        match.play();
      } else {
        setTimeout(() => {
          setFlippedCards((prev) => {
            const newFlippedCards = [...prev];
            newFlippedCards[firstCardIndex] = false;
            newFlippedCards[secondCardIndex] = false;
            return newFlippedCards;
          });
          setSelectedCards([]);
        }, 1000); 
      }
    }
  };

  useEffect(() => {
    const isWon = flippedCards.every((flipped, index) => flipped && cardArray[index]);
    if (isWon && !isGameWon) {
      setIsGameWon(true); 
    } else if (!isWon && isGameWon) {
      setIsGameWon(false);
    }
  }, [flippedCards, cardArray, isGameWon]);

  useEffect(() => {
    const audio = new Audio(ringer); 

    if (isGameWon) {
      audio.play(); 
    } else {
      audio.pause(); 
    }

    return () => {
      audio.pause(); 
    };
  }, [isGameWon]); 

  useEffect(() => {
    const startAudio = new Audio(startSound);

    // Start the sound after a 2-second delay
    const startTimeout = setTimeout(() => {
      startAudio.play();
    }, 2000); // 2000ms = 2 seconds

    return () => {
      clearTimeout(startTimeout);  // Clear the timeout when the component unmounts
      startAudio.pause();  // Stop the audio if the component is unmounted
    };
  }, []);  // Empty dependency array, runs once when the component mounts

  return (
    <div className="container">
      {cardArray.map((element, index) => (
        <Card
          key={index}
          imageNumber={element}
          onClick={() => handleCardClick(index)} 
          isFlipped={flippedCards[index]} 
        />
      ))}

      {isGameWon && 
        <div className="confetti">
            <Confetti width={width} height={height-10} />
        </div>
      }
    </div>
  );
};

export default Board;

import React from "react";
import Card from "../card/index"

// style
import './CardBoard.css'

interface WordItem {
  word: string;
  color: string;
}

interface CardBoardProps {
  row: number;
  column: number;
  words: WordItem[][];
}

const CardBoard: React.FC<CardBoardProps> = ({ row, column, words }) => {
  return (
    <div className="cardButton">
      {Array.from({ length: row }).map((_, rowIndex) => (
        <div key={rowIndex} className="rowButton">
          {Array.from({ length: column }).map((_, columnIndex) => (
            <div key={columnIndex} className="coulmnButton">
              <Card 
                letter={words[rowIndex]?.[columnIndex]?.word || ''} 
                color={words[rowIndex]?.[columnIndex]?.color || ''}
              />
            </div>
          ))}
        </div>
      ))} 
    </div>
  );
};

export default CardBoard;

import React, { useState, useEffect } from 'react';

const WORD_LIST_API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';

export default function Wordle() {
  const [word, setWord] = useState('');
  const [board, setBoard] = useState(new Array(6).fill(''));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');

  useEffect(() => {
    fetch(WORD_LIST_API_URL)
      .then(res => res.json())
      .then(res => setWord(res[Math.floor(Math.random() * res.length)]))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!word || board.includes(word)) return;

    function onKeyDown(e) {
      const key = e.key.toLowerCase();
      if (key === 'backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (key === 'enter' && currentGuess.length === 5) {
        setBoard(prev => {
          const newBoard = [...prev];
          newBoard[currentLine] = currentGuess;
          return newBoard;
        });
        setCurrentLine(prev => prev + 1);
        setCurrentGuess('');
      } else if (key.match(/^[a-z]$/) && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentGuess, word, board, currentLine]);

  return (
    <div className="board">
      {word ? (
        board.map((line, idx) => (
          <Line 
            key={idx} 
            line={idx === currentLine ? currentGuess.padEnd(5) : line} 
            word={word} 
            shouldEvalClass={idx < currentLine} 
          />
        ))
      ) : (
        'Loading...'
      )}
    </div>
  );
}

function Line({ line, word, shouldEvalClass }) {
  return (
    <div className="line">
      {line.split('').map((tile, index) => {
        let tileClass = 'tile';
        if (shouldEvalClass) {
          if (tile === word[index]) tileClass += ' correct';
          else if (word.includes(tile)) tileClass += ' close';
          else tileClass += ' incorrect';
        }
        return <Tile key={index} tile={tile} tileClass={tileClass} />;
      })}
    </div>
  );
}

function Tile({ tile, tileClass }) {
  return <div className={tileClass}>{tile}</div>;
}

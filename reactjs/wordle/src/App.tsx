import React from "react";
import "./App.css";
// import cardButton
import CardBoard from "./components/cardBoard/index";
import Keyboard from "./components/keyboard/index";
// const randomWord = Math.floor(Math.random() * 1000);

const constantWord = "HELLO";
const constantWordLength = constantWord.length;
// const randomWordLength = randomWord.toString().length;

const colorobj = {
  correct: "#6AAA64",
  present: "#C9B458",
  absent: "#787C7E",
};

interface WordItem {
  word: string;
  color: string;
}

const App: React.FC = () => {
  const [words, setWords] = React.useState<WordItem[][]>([[]]);
  const [currentRow, setCurrentRow] = React.useState(0);
  const [color, setColor] = React.useState<string[]>([]);

  const handleKeyWord = (e: React.MouseEvent<HTMLButtonElement>) => {
    const letter = e.currentTarget.textContent;
    if (letter && words[currentRow]?.length < 5) {
      const newWords = [...words];
      if (!newWords[currentRow]) {
        newWords[currentRow] = [];
      }
      newWords[currentRow].push({ word: letter, color: '' });
      setWords(newWords);
    }
    if (letter === "Enter" && words[currentRow]?.length === 5) {
      setCurrentRow(prev => prev + 1);
    }
    if (letter === "Backspace") {
      const newWords = [...words];
      newWords[currentRow].pop();
      setWords(newWords);
    }

    if (letter === "Enter") {
      if (words[currentRow]?.length !== constantWordLength) {
        alert("Word must be 5 characters long");
        return;
      }
      
      for (let i = 0; i < constantWordLength; i++) {
        if (words[currentRow][i].word === constantWord[i]) {
          setColor([...color, colorobj.correct]);
        } else if (constantWord.includes(words[currentRow][i].word)) {
          setColor([...color, colorobj.present]);
        }
      }
    }
  };

  console.log(words);

  return (
    <>
      <div className="game-dashboard">
        <h2>Wordle game</h2>
        <CardBoard row={5} column={6} words={words}/>
        <br/>
        <Keyboard color={color} handleKeyWord={handleKeyWord}/>
      </div>
    </>
  );
};

export default App;

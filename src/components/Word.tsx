import { initialGame } from "../../game/logic";
import { useState, useEffect } from "react";
import { GameState, Action } from "../../game/logic";

function Word({ gameState, guess }: { gameState: GameState; guess: string }) {
  const [word, setWord] = useState("");

  useEffect(() => {
    setWord(gameState.target);
  }, []);

  const wordArray = word.split("");
  return (
    <div className="flex border-2 border-solid border-black justify-center my-8">
      {wordArray.map((letter, index) => (
        <li
          key={index}
          className="border-2 border-solid border-black p-4 list-none "
        >
          <span
            className={`${guess.includes(letter) ? "visible" : "invisible"}`}
          >
            {" "}
            {letter}
          </span>
        </li>
      ))}

      <form></form>
    </div>
  );
}

export default Word;

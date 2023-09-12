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
    <div className="flex justify-center my-8">
      {wordArray.map((letter, index) => (
        <div
          key={index}
          className="h-12 w-8 flex justify-center items-center border-[1px] mr-[1px] border-solid border-black p-4 list-none "
        >
          <span
            className={`${guess.includes(letter) ? "visible" : "invisible"}`}
          >
            {" "}
            {letter}
          </span>
        </div>
      ))}

      <form></form>
    </div>
  );
}

export default Word;

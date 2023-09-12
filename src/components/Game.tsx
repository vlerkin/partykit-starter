import { useState, useEffect } from "react";

import { useGameRoom } from "@/hooks/useGameRoom";
import Word from "./Word";
import StarRating from "./StarAttempts";

interface GameProps {
  username: string;
  roomId: string;
}

const Game = ({ username, roomId }: GameProps) => {
  const { gameState, dispatch } = useGameRoom(username, roomId);
  const [accumulatedGuess, setAccumulatedGuess] = useState<string>("");

  const targetWord = gameState?.target;
  const attempts = gameState?.turn;

  // Local state to use for the UI
  const [guess, setGuess] = useState<string>("");

  // Indicated that the game is loading
  if (gameState === null) {
    return (
      <p>
        <span className="transition-all w-fit inline-block mr-4 animate-bounce">
          🎲
        </span>
        Waiting for server...
      </p>
    );
  }

  const handleGuess = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // Dispatch allows you to send an action!
    // Modify /game/logic.ts to change what actions you can send
    console.log({ type: "guess", guess: guess });
    dispatch({ type: "guess", guess: guess });
  };
  const handleInputSubmitClick = () => {
    console.log("GUESS", guess);
    console.log("ACCUMULATED BEFORE", accumulatedGuess);
    if (guess.length === 1 || guess === targetWord) {
      setAccumulatedGuess(accumulatedGuess.concat(guess));
    }
  };
  console.log("ACCUMULATED AFTER", accumulatedGuess);
  return (
    <>
      <h1 className="text-2xl border-b border-yellow-400 text-center relative">
        🎲 Guess the letter or the whole word!
      </h1>
      <Word gameState={gameState} guess={accumulatedGuess} />
      <StarRating
        attempts={gameState.turn}
        maxAttempts={5}
        height={20}
        width={20}
      />
      <section>
        <form
          className="flex flex-col gap-4 py-6 items-center"
          onSubmit={handleGuess}
        >
          <label
            htmlFor="guess"
            className="text-7xl font-bold text-stone-50 bg-black rounded p-2 text-"
          >
            {guess}
          </label>
          <input
            type="text"
            name="guess"
            id="guess"
            className="opacity-70 hover:opacity-100 accent-yellow-400"
            onChange={(e) => setGuess(e.currentTarget.value)}
            value={guess}
          />
          <button
            onClick={handleInputSubmitClick}
            disabled={gameState.turn == 0}
            className={`rounded border p-5 bg-yellow-400 group text-black shadow hover:shadow-lg transition-all duration-200 hover:animate-wiggle ${
              gameState.turn === 0 && "hover:cursor-not-allowed"
            }`}
          >
            Guess!
          </button>
        </form>

        <div className=" bg-yellow-100 flex flex-col p-4 rounded text-sm">
          {gameState.log.map((logEntry, i) => (
            <p key={logEntry.dt} className="animate-appear text-black">
              {logEntry.message}
            </p>
          ))}
        </div>

        <h2 className="text-lg">
          Players in room <span className="font-bold">{roomId}</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {gameState.users.map((user) => {
            return (
              <p
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-black text-white"
                key={user.id}
              >
                {user.id}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Game;

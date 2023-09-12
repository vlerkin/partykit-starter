// util for easy adding logs

import { hangmanGame } from "./wordList";

const addLog = (message: string, logs: GameState["log"]): GameState["log"] => {
  return [{ dt: new Date().getTime(), message: message }, ...logs].slice(
    0,
    MAX_LOG_SIZE
  );
};

// If there is anything you want to track for a specific user, change this interface
export interface User {
  id: string;
}

// Do not change this! Every game has a list of users and log of actions
interface BaseGameState {
  users: User[];
  log: {
    dt: number;
    message: string;
  }[];
}

// Do not change!
export type Action = DefaultAction | GameAction;

// Do not change!
export type ServerAction = WithUser<DefaultAction> | WithUser<GameAction>;

// The maximum log size, change as needed
const MAX_LOG_SIZE = 4;

type WithUser<T> = T & { user: User };

export type DefaultAction = { type: "UserEntered" } | { type: "UserExit" };

// This interface holds all the information about your game
export interface GameState extends BaseGameState {
  target: string;
  turn: number;
}

// This is how a fresh new game starts out, it's a function so you can make it dynamic!
// In the case of the guesser game we start out with a random target
export const initialGame = () => ({
  users: [],
  target:
    hangmanGame[Math.floor(Math.random() * 30) as keyof typeof hangmanGame],
  log: addLog("Game Created!", []),
  turn: 5,
});

// Here are all the actions we can dispatch for a user
type GameAction = { type: "guess"; guess: string };

export const gameUpdater = (
  action: ServerAction,
  state: GameState
): GameState => {
  // This switch should have a case for every action type you add.

  // "UserEntered" & "UserExit" are defined by default

  // Every action has a user field that represent the user who dispatched the action,
  // you don't need to add this yourself

  switch (action.type) {
    case "UserEntered":
      return {
        ...state,
        users: [...state.users, action.user],
        log: addLog(`user ${action.user.id} joined 🎉`, state.log),
      };

    case "UserExit":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.user.id),
        log: addLog(`user ${action.user.id} left 😢`, state.log),
      };
    case "guess":
      // If User guesses the target word
      if (action.guess === state.target) {
        return {
          ...state,
          log: addLog(
            `user ${action.user.id} guessed ${action.guess} and .won!👑`,
            state.log
          ),
        };
      } else if (
        action.guess.length !== 1 &&
        action.guess.length !== state.target.length
      ) {
        return {
          ...state,
          log: addLog(
            `user ${action.user.id} violated rules of the game! You can submit one letter or the whole word only.`,
            state.log
          ),
        };
      } else if (state.turn === 0) {
        return {
          ...state,
          log: addLog(
            `user ${action.user.id} used the last attempt, you all LOST`,
            state.log
          ),
        };
      } else if (
        action.guess.length === 1 &&
        !state.target.includes(action.guess)
      ) {
        return {
          ...state,
          turn: state.turn - 1,
          log: addLog(
            `user ${action.user.id} guessed ${action.guess}, nice try but this letter is wrong`,
            state.log
          ),
        };
      } else if (
        action.guess.length === state.target.length &&
        action.guess !== state.target
      ) {
        return {
          ...state,
          turn: state.turn - 1,
          log: addLog(
            `user ${action.user.id} guessed ${action.guess}, nice try but the word is wrong`,
            state.log
          ),
        };
      } else {
        return {
          ...state,
          log: addLog(
            `user ${action.user.id} guessed ${action.guess}, letter is correct`,
            state.log
          ),
        };
      }
  }
};

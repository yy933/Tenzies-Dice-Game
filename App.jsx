import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {
  function generateAllNewDice() {
    let randomNumbers = Array.from({ length: 10 }, (_, i) => {
      return {
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      };
    });
    return randomNumbers;
  }

  const [dice, setDice] = useState(generateAllNewDice());
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6 + 1) },
      ),
    );
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            id={die.id}
            onHold={hold}
          />
        ))}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

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
  function rollDice() {
    setDice(prevDice =>
      prevDice.map(die =>
        die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6 + 1) },
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
        Roll Dice
      </button>
    </main>
  );
}

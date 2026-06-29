import Die from "./Die";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App() {

  function generateAllNewDice() {
    let randomNumbers = Array.from({ length: 10 }, (_, i) => {
      return { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() };
    });
    return randomNumbers;
  }

  const [dice, setDice] = useState(generateAllNewDice());
  function rollDice() {
    setDice(generateAllNewDice());

  }

  function hold(id) {
    console.log(id)
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

import Die from "./Die";
import { useState } from "react";

export default function App() {
  /**
   * Challenge: Create a `Roll Dice` button that will re-roll
   * all 10 dice
   *
   * Clicking the button should generate a new array of numbers
   * and set the `dice` state to that new array (thus re-rendering
   * the array to the page)
   */

  function generateAllNewDice() {
    let randomNumbers = Array.from({ length: 10 }, (_, i) => {
      return Math.floor(Math.random() * 6 + 1);
    });
    return randomNumbers;
  }

  const [dice, setDice] = useState(generateAllNewDice());
  function rollDice(){
    setDice(generateAllNewDice());
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map((value, index) => (
          <Die key={index} value={value} />
        ))}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        Roll Dice
      </button>
    </main>
  );
}

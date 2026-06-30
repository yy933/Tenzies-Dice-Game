import Die from "./Die";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());
  const [rollCount, setRollCount] = useState(0);
  const [time, setTime] = useState(0);
  const newGameButtonRef = useRef(null);

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

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const gameInit = rollCount === 0;

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onHold={() => hold(die.id)}
      isDisabled={gameWon || gameInit}
    />
  ));

  // focus on the "New Game" button when the game ends
  useEffect(() => {
    if (gameWon) {
      newGameButtonRef.current.focus();
    }
  }, [gameWon]);

  // timer logic
  useEffect(() => {
    let interval = null;
    if (!gameWon && !gameInit) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log("Timer cleared!");
      }
    };
  }, [gameWon, gameInit]);

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice());
      setRollCount(0);
      setTime(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6 + 1) },
        ),
      );
      setRollCount((prevCount) => prevCount + 1);
    }
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  function formatTime() {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <div className="stats-container">
        <p
          className="timer stats-item"
          aria-label={`You have been playing for ${formatTime()}.`}
        >
          Timer: {formatTime()}
        </p>
        <p
          className="roll-count stats-item"
          aria-label={`You have rolled ${rollCount} times.`}
        >
          Counts: {rollCount}
        </p>
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>
      <button ref={newGameButtonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

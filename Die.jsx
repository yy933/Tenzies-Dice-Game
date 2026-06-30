export default function Die({ value, isHeld, onHold, id, isDisabled }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };
  return (
    <button
      className={`die ${isHeld ? "held" : ""}`}
      style={styles}
      onClick={() => onHold(id)}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"} `}
      disabled={isDisabled}
    >
      {value}
    </button>
  );
}

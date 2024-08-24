import { useState, useEffect } from "react";

function GameTimer({ onTimeup }) {
  const [timeLeft, setTimeLeft] = useState(30); 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft(timeLeft - 1);
      } else {
     
        onTimeup();
        clearTimeout(timer);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft > 0 ? (
        <div>Time Left: {timeLeft} seconds</div>
      ) : (
        <div>Time up!</div>
      )}
    </div>
  );
}

export default GameTimer;

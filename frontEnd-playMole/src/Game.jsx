import { useState, useEffect, useContext } from "react";
import "./App.css";
import {UserContext} from './context/UserContext'
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";
import bonk from "./assets/bonk.mp3";
import errorMp3 from "./assets/error.mp3";
import GameTimer from "./Timeout";
import Popup from "./Popup";
import Leaderboard from "./components/LeaderBoard";
const audioBonk = new Audio(bonk);
const audioError = new Audio(errorMp3);
function Game() {
  const {username, setUsername } = useContext(UserContext);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false); // State for leaderboard popup

 

  useEffect(() => {
    const interval = setInterval(() => {
      const rIndex = Math.floor(Math.random() * moles.length);
      showMoles(rIndex);
      setTimeout(() => {
        hideMoles(rIndex);
      }, 680);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [moles, startGame, highScore]);

  function showMoles(idx) {
    setMoles((curMoles) => {
      const nMoles = [...curMoles];
      nMoles[idx] = true;
      return nMoles;
    });
  }


  function hideMoles(idx) {
    setMoles((curMoles) => {
      if (!curMoles[idx]) return curMoles;
      const nMoles = [...curMoles];
      nMoles[idx] = false;
      return nMoles;
    });
  }
  function handleClick(idx) {
    if (!moles[idx]) return audioError.play();
    // const nMoles=[...moles];
    // nMoles[idx]= false;
    audioBonk.play();
    setScore((score) => score + 1);
    hideMoles(idx);
  }
  function handleStart() {
    setScore((score) => score * 0);
    setStartGame(true);
    console.log(startGame);

    document.querySelector(".popup").style.display = "none";
  }
  function handleReset() {
    setStartGame(false);
    setHighScore(0);
    localStorage.removeItem('username');
    setUsername('');
   
  }
  function onTimeup() {
    console.log("tIME IS UP", score, localStorage.getItem("highScore"));
    if (score > localStorage.getItem("highScore")) {
      setHighScore(score + 1);
      localStorage.setItem("highScore", score);
    }
    setStartGame(false);
    setPopupOpen(true);
  }
  const closePopup = () => {
    setPopupOpen(false);
    document.querySelector(".popup").style.display = "flex";
  };

  const toggleLeaderboard = () => {
    setIsLeaderboardOpen(!isLeaderboardOpen);
  };

  return (
    <>
     {/* Leaderboard button */}
   {!startGame &&  <button className="btnLeaderboard" onClick={toggleLeaderboard}>
        Leaderboard
      </button>
}
      {/* Leaderboard popup */}
      {isLeaderboardOpen && (
        <div className="leaderboard-popup">
          <div className="leaderboard-content">
            <Leaderboard/>
            <button className="btnLeaderboard" onClick={toggleLeaderboard}>
              Close
            </button>
          </div>
        </div>
      )}
      <h1>High Score:{localStorage.getItem("highScore")}</h1>
      {startGame ? (
        <header>
          <h1>Score: {score}</h1>
          <h1>
            <GameTimer onTimeup={onTimeup} />
          </h1>{" "}
        </header>
      ) : (
        ""
      )}
      <div className="popup">
        <div className="popup-content">
          <p>Hey <b>{username}</b> !</p>
          <button className="btnAc" onClick={handleStart}>
            Start
          </button>
          <button className="btnAc" onClick={handleReset}>
            LogOut
          </button>
        </div>
      </div>
      {startGame ? (
        <div className="container">
          {moles.map((m, idx) => (
            <img
              onClick={() => {
                handleClick(idx);
              }}
              className="mole"
              src={m ? mole : hole}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <div className="container">
          {moles.map((m, idx) => (
            <img className="mole" src={hole} key={idx} />
          ))}
        </div>
      )}
      <Popup isOpen={isPopupOpen} onClose={closePopup} myscore={score} />
    </>
  );
}

export default Game;

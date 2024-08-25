import { useState, useEffect, useContext } from "react";
import "./App.css";
import Cookies from 'js-cookie';
import { UserContext } from './context/UserContext';
import hole from "./assets/hole.png";
import mole from "./assets/mole.png";
import troll from "./assets/troll.png";
import bonk from "./assets/bonk.mp3";
import errorMp3 from "./assets/error.mp3";
import GameTimer from "./Timeout";
import Popup from "./Popup";
import Leaderboard from "./components/LeaderBoard";

const audioBonk = new Audio(bonk);
const audioError = new Audio(errorMp3);

function Game() {
  const { username, setUsername } = useContext(UserContext);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [trolls, setTrolls] = useState(new Array(9).fill(false));
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      const rIndex = Math.floor(Math.random() * moles.length);
      const isTroll = Math.random() < 0.5; 
      
      if (isTroll) {
        showTrolls(rIndex);
        setTimeout(() => {
          hideTrolls(rIndex);
        }, 730);
      } else {
        showMoles(rIndex);
        setTimeout(() => {
          hideMoles(rIndex);
        }, 730);
      }
    }, 800); 
  
    return () => {
      clearInterval(interval);
    };
  }, [moles, trolls,startGame, highScore]);

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

  function showTrolls(idx) {
    setTrolls((curTrolls) => {
      const nTrolls = [...curTrolls];
      nTrolls[idx] = true;
      return nTrolls;
    });
  }

  function hideTrolls(idx) {
    setTrolls((curTrolls) => {
      if (!curTrolls[idx]) return curTrolls;
      const nTrolls = [...curTrolls];
      nTrolls[idx] = false;
      return nTrolls;
    });
  }

  function handleClick(idx) {
    audioBonk.srcObject = null;
    audioError.srcObject = null;

    if (moles[idx]) {
      audioBonk.play();
      setScore((score) => score + 1);
      hideMoles(idx);
    } else if (trolls[idx]) {
      audioError.play();
      setScore((score) =>  score - 2); 
      hideTrolls(idx);
    } else {
      audioError.play();
    }
  }

  function handleStart() {
    setScore(0);
    setStartGame(true);
    document.querySelector(".popup").style.display = "none";
  }

  function handleReset() {
    setStartGame(false);
    setHighScore(0);
    localStorage.removeItem('username');
    setUsername('');
  }

  async function onTimeup() {
    console.log("TIME IS UP", score, localStorage.getItem("highScore"));
    if (score > localStorage.getItem("highScore")) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
      await upScore();
    }
    setStartGame(false);
    setPopupOpen(true);
  }

  async function upScore() {
    const token = Cookies.get('token');
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    
    let bodyContent = JSON.stringify({
      "username": username,
      "score": score
    });
    
    let response = await fetch("https://playmole.onrender.com/api/scores/update", { 
      method: "PATCH",
      body: bodyContent,
      headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
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
      {!startGame && <button className="btnLeaderboard" onClick={toggleLeaderboard}>
        Leaderboard
      </button>}

      {/* Leaderboard popup */}
      {isLeaderboardOpen && (
        <div className="leaderboard-popup">
          <div className="leaderboard-content">
            <Leaderboard />
            <button className="btnLeaderboard" onClick={toggleLeaderboard}>
              Close
            </button>
          </div>
        </div>
      )}

      <h1>High Score: {localStorage.getItem("highScore")}</h1>

      {startGame ? (
        <header>
          <h1>Score: {score}</h1>
          <h1>
            <GameTimer onTimeup={onTimeup} />
          </h1>
        </header>
      ) : ""}

      <div className="popup">
        <div className="popup-content">
          <p>Hey <b>{username}</b>!</p>
          <button className="btnAc" onClick={handleStart}>
            Start
          </button>
          <button onClick={toggleLeaderboard}>LeaderBoard</button>
          <button className="btnAc" onClick={handleReset}>
            LogOut
          </button>
        </div>
      </div>

      {startGame ? (
        <div className="container">
          {moles.map((m, idx) => (
            <img
              onClick={() => handleClick(idx)}
              className="mole"
              src={m ? mole : trolls[idx] ? troll : hole}
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

      <Popup isOpen={isPopupOpen} onClose={closePopup} myscore={score} lb={toggleLeaderboard} />
    </>
  );
}

export default Game;

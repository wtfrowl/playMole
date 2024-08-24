import { useState, useEffect } from "react";
import cry from "./assets/cry.mp3";
import win from "./assets/win.mp3";
const cryMp3 = new Audio(cry);
function Popup({ isOpen, onClose, myscore,lb }) {
  const hScore = localStorage.getItem("highScore");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (isOpen && myscore < hScore) {
      
      cryMp3.play();
      setIsAudioPlaying(true);

      cryMp3.onended = () => {
        setIsAudioPlaying(false);
      };

      return () => {
        cryMp3.srcObject=null
      };
    } else if (isOpen) {
      const winMp3 = new Audio(win);
      winMp3.play();
      setIsAudioPlaying(true);

      winMp3.onended = () => {
        setIsAudioPlaying(false);
      };

      return () => {
        winMp3.srcObject=null
      };
    }
  }, [isOpen, myscore, hScore]);

  return (
    isOpen && (
      <div className="popup">
        <div className="popup-content">
       
          <p>
            {myscore >= hScore ? (
              <>You have a New High Score {hScore} !</>
            ) : (
              <>
                You scored {myscore} {":("}
              </>
          
            )}
          </p>
          <button onClick={lb}>LeaderBoard</button>
          <button onClick={onClose}>Close</button>
         
        </div>
      </div>
    )
  );
}

export default Popup;

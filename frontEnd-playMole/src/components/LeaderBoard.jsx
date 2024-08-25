import { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "../context/UserContext";
import { CheckboxList } from "./Loader";
import Cookies from "js-cookie";

const Leaderboard = () => {
  const { username } = useContext(UserContext);
  const [error, setError] = useState("");
  const [users, setUsers] = useState();
  const [rank, setRank] = useState(0);
  let score = localStorage.getItem("highScore");
  useEffect(() => {
    async function fetchScore() {
      try {
        const token = Cookies.get("token");
        let headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          username: username,
        });

        const response = await fetch(
          "https://playmole.onrender.com/api/scores/leaderboard",
          {
            method: "POST",
            headers: headersList,
            body: bodyContent,
          }
        );

        const data = await response.json();
        if (response.ok) {
          // Handle successful login, like redirecting or storing token
          setUsers(data.topScores);
          setRank(data.myRank);
          setError("Added"); // Clear any previous errors
        } else {
          setError("Already Registered Username" || data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("Already Registered Username");
      }
    }
    fetchScore();
  }, []);

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Leaderboard</h2>
      {!error ? (
        <CheckboxList />
      ) : (
        <ul className="leaderboard-list">
          <li key="11" className="leaderboard-item you">
            <span className="leaderboard-rank">{rank}</span>
            <span className="leaderboard-username">You</span>
            <span className="leaderboard-score ">{score}</span>{" "}
          </li>
          {users &&
            users.map((user, index) => (
              <li key={user.username} className="leaderboard-item">
                <span className="leaderboard-rank">{index + 1}</span>
                <span className="leaderboard-username">{user.username}</span>
                <span className="leaderboard-score">{user.score}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;

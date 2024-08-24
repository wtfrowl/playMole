import { useEffect, useState } from 'react';
import '../App.css';
import { CheckboxList } from './Loader';


const Leaderboard = () => {
  // Sort users by high score in descending order
  const [error,setError]=useState('')
  const [users,setUsers]=useState()

useEffect(()=>{
 async function fetchScore(){
  try {
    const response = await fetch('https://playmole.onrender.com/api/scores/leaderboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    if (response.ok) {
      // Handle successful login, like redirecting or storing token
     console.log(data);
     setUsers(data);
     setError('Added'); // Clear any previous errors
    } else {
      setError( 'Already Registered Username' || data.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
    setError('Already Registered Username');
  }
}
fetchScore();
},[])


  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">Leaderboard</h2>
      {!error?(<CheckboxList/>):(
      <ul className="leaderboard-list">
        {users && users.map((user, index) => (
          <li key={user.username} className="leaderboard-item">
            <span className="leaderboard-rank">{index + 1}</span>
            <span className="leaderboard-username">{user.username}</span>
            <span className="leaderboard-score">{user.score}</span>
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default Leaderboard;

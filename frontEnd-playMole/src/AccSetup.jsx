import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import Cookies from 'js-cookie';
const AccSetup = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const {setUsername} = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true); 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

if(isLogin){
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: inputUsername, password: inputPassword }),
      });

      const data = await response.json();
      const { token,user} = await data;
      if (response.ok) {
        // Handle successful login, like redirecting or storing token
        setUsername(inputUsername);
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem("highScore", user.score)
        setError(''); // Clear any previous errors
       
      } else {
        setError(data.message || 'Error logging in');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid Username/Password');
    }
  }
  else{
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: inputUsername, password: inputPassword }),
      });

      const data = await response.json();
      const { token,user } = await data;
     
      if (response.ok) {
        // Handle successful login, like redirecting or storing token
        setUsername(inputUsername);
        Cookies.set('token', token, { expires: 1 });
        localStorage.setItem("highScore", user.score)
        setError(''); // Clear any previous errors
      } else {
        setError( 'Already Registered Username' || data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Already Registered Username');
    }
  }

  }


  return (<>
  <div className="switch">
        <h1 onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: isLogin ? 'white' : '#ffffff73' }}>LOGIN NOW</h1>
        <h1 onClick={() => setIsLogin(false)} style={{ cursor: 'pointer', color: !isLogin ? 'white' : '#ffffff73'  }}>SIGN UP</h1>
      </div>
    <form onSubmit={handleSubmit} className="setup form">
      <input
        type="text"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
        placeholder="Username"
        className="input"
        maxLength={7}
        required
      />
  
      <input
        type="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        placeholder="Password"
        className="input"
        maxLength={7}
        required
      />
  
  <button type="submit" className="button">{isLogin ? 'LOGIN' : 'SIGN UP'}</button>
    </form>
  
    {/* Error message container */}
    <div className="error" style={{ minHeight: '20px' }}>
      {error && <p>{error}</p>}
    </div>
  </>
  );
};

export default AccSetup;

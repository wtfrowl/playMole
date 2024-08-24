import AccSetup from './AccSetup';
import Game from './Game';
import { useContext } from 'react';
import {UserContext} from './context/UserContext'


const App = () => {
  const { username } = useContext(UserContext);
  return (
<>

      {username ? <Game /> : <AccSetup  />}

    </>
  );
};

export default App;

import AccSetup from './AccSetup';
import Game from './Game';
import { useContext, useEffect } from 'react';
import {UserContext} from './context/UserContext'


const App = () => {
  const { username } = useContext(UserContext);

  useEffect(()=>{

    async function apiHealth(){
    try { 
      const res = await fetch('/health',{
        method:'GET'
      })
      console.log(res);
    }
    catch(err){
      console.log(err)
    }
  }
  


    apiHealth()

  },[])


  return (
<>

      {username ? <Game /> : <AccSetup  />}

    </>
  );
};

export default App;

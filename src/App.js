import React, { useState } from 'react';
import './App.css';
import Registration from './components/Registration';
import GreenLightRedLight from './components/GreenLightRedLight';

function App() {
  const [user, setUser] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const handleStartGame = (userData) => {
    setUser(userData);
    setGameResult(null);
  };

  const handleFinishGame = (result) => {
    setGameResult(result);
  };

  return (
    <div className="App">
      {user ? (
        <GreenLightRedLight
          difficulty={user.difficulty}
          onFinishGame={handleFinishGame}
        />
      ) : (
        <Registration onStart={handleStartGame} />
      )}
      {gameResult && <div>{gameResult}</div>}
    </div>
  );
}

export default App;

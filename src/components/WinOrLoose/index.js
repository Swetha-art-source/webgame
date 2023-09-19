import React from 'react';
import './index.css';

const WinOrLoose = ({ difficulty, score, resetGame, goToRegistration }) => {
  console.log('WinOrLoose component rendered');
  const topScores = {
    Easy: 10,
    Medium: 15,
    Hard: 25,
  };

  const isWin = score >= topScores[difficulty];
  console.log(isWin);

  const playGame = () => {
    resetGame();
  };

  const textScore = isWin ? 'Best Score' : 'Score';
  const gameStatus = isWin ? 'Won' : 'Lost';

  const imgurl = isWin
    ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png';

  return (
    <>
      <div className="scoreCard-Det">
        <h1>You {gameStatus}</h1>
        <p className="score-text">{textScore}</p>
        <p className="score-number">{`${score}/${topScores[difficulty]}`}</p>
        <div>
          <button type="button" className="play-again" onClick={playGame}>
            Play Again
          </button>
          <button type="button" className="play-again" onClick={goToRegistration}>
            Back to Registration
          </button>
        </div>
      </div>
      <div className="playImg-Container">
        <img src={imgurl} alt="win or lose" className="PlayImage" />
      </div>
    </>
  );
};

export default WinOrLoose;

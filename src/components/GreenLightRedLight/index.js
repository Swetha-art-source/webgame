import React, { useState, useEffect, useCallback, useRef } from 'react';
import WinOrLoose from '../WinOrLoose';
import './index.css';

const GreenLightRedLight = ({ difficulty, onFinishGame }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGreen, setIsGreen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const n = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 15 : 25;
  const y = 40; // 40 seconds

  const getRandomTime = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  };

  const prevTimeLeftRef = useRef(y); // Use useRef for mutable value
  const scoreRef = useRef(score); // Create a reference to the score state

  const startGame = () => {
    setIsGameStarted(true);
    setIsGreen(false);
    setScore(0);
    prevTimeLeftRef.current = y; // Set the initial value
    scoreRef.current = 0;
    setIsGameOver(false);

    const gameInterval = setInterval(() => {
      prevTimeLeftRef.current -= 1; // Decrement the value

      // Set the timeLeft state with the current value
      setTimeLeft(prevTimeLeftRef.current);

      // Check if time has expired
      if (prevTimeLeftRef.current === 0) {
        clearInterval(gameInterval);
        clearInterval(colorChangeInterval);
        setIsGameOver(true);
        finishGame('Game Over!');
      }
    }, 1000);

    const colorChangeInterval = setInterval(() => {
      setIsGreen((prevIsGreen) => !prevIsGreen);
    }, getRandomTime());
  };

  const finishGame = useCallback((result) => {
    setIsGameStarted(false);
    setIsGameOver(true);
    onFinishGame(result);
  }, [onFinishGame]);

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('isGreen:', isGreen);
    console.log('isGameStarted:', isGameStarted);
    console.log('n:', n);
    console.log('scoreRef.current:', scoreRef.current);
    if (isGreen) {
      const clickHandler = () => {
        if (isGameStarted) {
          setScore((prevScore) => prevScore + 1);
          setIsGreen(false);

          // Check if the player has reached the target score
          if (scoreRef.current + 1 === n) {
            clearInterval(colorChangeInterval);
            finishGame('You win!');
          }
        }
      };

      const colorChangeInterval = setInterval(() => {
        setIsGreen((prevIsGreen) => !prevIsGreen);
      }, getRandomTime());

      window.addEventListener('click', clickHandler);

      return () => {
        window.removeEventListener('click', clickHandler);
        clearInterval(colorChangeInterval);
      };
    }
  }, [isGreen, isGameStarted, n, finishGame]);

  console.log("isGameOver:", isGameOver);

  return (
    <div className='bg-container'>
      <h2 className='heading'>Green Light Red Light Game</h2>

      {/* Conditionally render WinOrLoose component after the game is over */}
      {isGameOver && (
        <WinOrLoose difficulty={difficulty} score={score} resetGame={startGame} />
      )}

      {isGameStarted ? (
        <div>
          <div className={isGreen ? 'green-box' : 'red-box'}></div>
          <p className='time'>Time Left: {timeLeft} seconds</p>
          <p className='score'>Score: {score}</p>
        </div>
      ) : (
        <button onClick={startGame} className='button'>
          Start Game
        </button>
      )}
    </div>
  );
};

export default GreenLightRedLight;

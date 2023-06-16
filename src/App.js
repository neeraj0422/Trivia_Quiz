import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showCorrectGif, setShowCorrectGif] = useState(false);
  const [showIncorrectGif, setShowIncorrectGif] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Fetch questions from the API or use your own data source
    // and set the questions state
    fetch('https://the-trivia-api.com/v2/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowCorrectGif(false);
    setShowIncorrectGif(false);
    if (answer === questions[currentQuestion].correctAnswer) {
      setShowCorrectGif(true);
    } else {
      setShowIncorrectGif(true);
      if (score + 1 >= 3) {
        setGameOver(true);
      }
    }
  };

  const handleNextQuestion = () => {
    const currentAnswer = questions[currentQuestion].correctAnswer;
    if (selectedAnswer === currentAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer('');
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setShowCorrectGif(false);
    setShowIncorrectGif(false);
    if (currentQuestion + 1 >= questions.length) {
      setGameOver(true);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    return (
      <div className="container">
        <h1>Trivia Quiz</h1>
        <div className="game-over">
          <iframe
            src="https://giphy.com/embed/26grAW5j9enCsY3p6"
            width="350"
            height="350"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Game Over"
          ></iframe>
          <p className="game-over-text">
            Game Over! Your Final Score{' '}
            <span className="score">{score}</span>
          </p>
        </div>
        <div className="scorecard">
          <h3>Final Score:</h3>
          <p className="final-score">{score}</p>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="container">
      <h1>Trivia Quiz</h1>
      <div className="question">{currentQuestionData.question.text}</div>
      <div className="options">
        {currentQuestionData.incorrectAnswers.map((answer, index) => (
          <button
            key={index}
            className={
              selectedAnswer === answer
                ? 'incorrect'
                : selectedAnswer === currentQuestionData.correctAnswer
                ? 'correct'
                : ''
            }
            onClick={() => handleSelectAnswer(answer)}
          >
            {answer}
          </button>
        ))}
        <button
          className={
            selectedAnswer === currentQuestionData.correctAnswer
              ? 'correct'
              : ''
          }
          onClick={() =>
            handleSelectAnswer(currentQuestionData.correctAnswer)
          }
        >
          {currentQuestionData.correctAnswer}
        </button>
      </div>
      {showCorrectGif && (
        <div className="celebration">
          <iframe
            src="https://giphy.com/embed/t3sZxY5zS5B0z5zMIz"
            width="350"
            height="350"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Correct Answer"
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/nhl-sports-hockey-fan-t3sZxY5zS5B0z5zMIz">
              
            </a>
          </p>
        </div>
      )}
      {showIncorrectGif && (
        <div className="celebration">
          <iframe
            src="https://giphy.com/embed/9GJ34PEVM5JnCkfPPf"
            width="350"
            height="350"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Incorrect Answer"
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/anupamkher-anupam-kher-the-big-sick-you-are-wrong-9GJ34PEVM5JnCkfPPf">
              
            </a>
          </p>
        </div>
      )}
      <button
        className="next-button"
        onClick={handleNextQuestion}
        disabled={!selectedAnswer}
      >
        Next Question
      </button>
    </div>
  );
};

export default App;

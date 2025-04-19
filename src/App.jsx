import { useState } from "react";
import './App.css';
import { motion, AnimatePresence } from "framer-motion";
import questions from "./questions";

// 🖼️ Importing images from src/images
import ExistentialistImg from "./images/sartare.jpeg";
import AbsurdistImg from "./images/camus.jpeg";
import TheistImg from "./images/theistic.jpeg";
import AtheistImg from "./images/atheist.jpeg";
import StoicImg from "./images/stoic.jpeg";
import VedantaImg from "./images/vedanta.jpeg";

const resultsDescription = {
  E: {
    title: "🌱 Existentialist",
    description: "You believe in creating your own purpose in a seemingly indifferent universe.",
    image: ExistentialistImg
  },
  A: {
    title: "🎭 Absurdist",
    description: "You embrace the absurdity of life and live freely despite it.",
    image: AbsurdistImg
  },
  T: {
    title: "🙏 Theist",
    description: "You find purpose and guidance through belief in a divine being.",
    image: TheistImg
  },
  AT: {
    title: "🔬 Atheist",
    description: "You rely on science and reason, without belief in a god.",
    image: AtheistImg
  },
  S: {
    title: "🧘 Stoic",
    description: "You value inner peace and virtue through discipline and rationality.",
    image: StoicImg
  },
  V: {
    title: "🕉️ Vedanta Follower",
    description: "You believe in the self beyond the physical, aiming for spiritual liberation.",
    image: VedantaImg
  }
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [showIntro, setShowIntro] = useState(true);

  const handleAnswer = (category) => {
    const updatedAnswers = [...answers, category];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const scoreMap = {};
      updatedAnswers.forEach((cat) => {
        scoreMap[cat] = (scoreMap[cat] || 0) + 1;
      });

      const finalCategory = Object.keys(scoreMap).reduce((a, b) =>
        scoreMap[a] > scoreMap[b] ? a : b
      );
      setResult(finalCategory);
      setShowResult(true);
    }
  };

  const startQuiz = () => {
    setShowIntro(false);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult("");
    setShowIntro(true);
  };

  return (
    <div className="quiz-container">
      <div className="mirror-card">
        <h1 className="quiz-title">Philosophy Spectrum</h1>
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="intro-container"
            >
              <p className="intro-text">
                These questions evaluate where you stand on the philosophical spectrum.
              </p>
              <button
                onClick={startQuiz}
                className="start-button"
              >
                Begin Quiz
              </button>
            </motion.div>
          ) : !showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
              <div className="question-number">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <p className="question-text">
                {questions[currentQuestion].question}
              </p>
              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.category)}
                    className="option-button"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="result-container"
            >
              <h1 className="result-title">You are...</h1>
              <img
                src={resultsDescription[result].image}
                alt={resultsDescription[result].title}
                className="result-image"
              />
              <h2 className="result-subtitle">{resultsDescription[result].title}</h2>
              <p className="result-description">
                {resultsDescription[result].description}
              </p>
              <button
                onClick={restartQuiz}
                className="restart-button"
              >
                Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
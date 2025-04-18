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

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white bg-opacity-90 max-w-xl w-full p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-500">Philosophy Spectrum</h1>
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full bg-gray-300 rounded-full h-2 mb-6">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-500">
                Question {currentQuestion + 1}/{questions.length}
              </h2>
              <p className="text-lg text-gray-700 mb-8 text-center font-medium">
                {questions[currentQuestion].question}
              </p>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.category)}
                    className="w-full bg-gray-500 hover:bg-gray-600 transition-all text-white font-semibold py-3 px-5 rounded-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="text-center space-y-4"
            >
              <h1 className="text-3xl font-semibold text-gray-500 mb-4">You are...</h1>
              <img
                src={resultsDescription[result].image}
                alt={resultsDescription[result].title}
                className="w-full max-h-64 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700">{resultsDescription[result].title}</h2>
              <p className="text-xl text-gray-500 mt-4 font-medium">
                {resultsDescription[result].description}
              </p>
              <button
                onClick={restartQuiz}
                className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

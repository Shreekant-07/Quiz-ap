import { useEffect, useState } from "react";
import "./Quiz.css";

export const Quiz = () => {
  const [msdQuiz, setmsdQuiz] = useState([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [selectedOption, setselectedOption] = useState("");
  const [score, setscore] = useState(0);
  const [submitted, setsubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentQuestion = msdQuiz[questionIndex];

  useEffect(() => {
    setLoading(true);
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => {
        setmsdQuiz(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
   
    
      if (selectedOption === currentQuestion.answer) {
        setscore(score + 1);
      }
      setsubmitted(true);
     
    
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      const nextindex = questionIndex + 1;
      if (nextindex < msdQuiz.length) {
        setquestionIndex(nextindex);
      }
      setsubmitted(false);
      setselectedOption("");
      setLoading(false);
    }, 1000);
  };

  if (loading && msdQuiz.length === 0) {
    return <div className="loader">Loading quiz data...</div>;
  }

  if (!currentQuestion) {
    return <div>No quiz data available.</div>;
  }
  

  return (
    <>
      <h1 className="heading">The Quiz App</h1>
      <div className="container-main">
        {loading ? (
         <div className="loader-container">
    <span className="loader"></span>
  </div>
        ) : (
          <>
            <div className="question-part">
              <h1 className="question">
                Q<span>{questionIndex + 1} </span>
                {currentQuestion.question}
              </h1>
              <div className="score-dekh">
                <h2 className="scorecard">
                  <span className="change-do">{score}</span>/{msdQuiz.length}
                </h2>
              </div>
            </div>

            <div className="option-part">
              {currentQuestion.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="q1"
                    value={option}
                    onChange={(e) => setselectedOption(e.target.value)}
                    checked={selectedOption === option}
                    disabled={submitted}
                  />
                  {option}
                  <br />
                </label>
              ))}
            </div>

            <div className="btn-wala">
              <button
                className="submit-wala"
                onClick={handleSubmit}
                disabled={submitted || selectedOption === ""}
              >
                Submit
              </button>
              <button
                className="next-wala"
                onClick={handleNext}
                disabled={!submitted || questionIndex === msdQuiz.length - 1}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

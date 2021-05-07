import React, { useState } from 'react'

const QuestionDisplay = ({questions}) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  
  const handleScroll = () => {
    let questionIndex = questions.indexOf(currentQuestion);
    if (questionIndex < questions.length-1){
      questionIndex += 1;
    } else {
      questionIndex = 0;
    }
    return setCurrentQuestion(questions[questionIndex]);
  }

  return(
    <div>
      {questions.length > 1 ? <i className="fa fa-arrow-right fa-2x" onMouseDown={handleScroll}/> : null}
      <p>{currentQuestion.body}</p>
    </div>
  )
}
export default QuestionDisplay

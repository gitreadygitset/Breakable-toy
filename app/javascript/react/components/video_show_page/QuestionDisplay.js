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
    <div className="question-display">
      <div>
        <p>{currentQuestion.body}</p>
      </div>
      {questions.length > 1 ? 
        <div>
          <i className="fa fa-arrow-right fa-2x" onMouseDown={handleScroll}/>
        </div> 
      : null}
    </div>
  )
}
export default QuestionDisplay

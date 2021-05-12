import React, { useState, Fragment,  } from 'react'

const QuestionDisplay = ({questions, timesArray}) => {
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
  
  const noPauses = timesArray().length === 0;
  if(noPauses) {
    return(
      <Fragment>
        <div>
        <i class="fas fa-volume-up fa-2x"></i>
        </div>
        <div>
          <p>{currentQuestion.body}</p>
        </div>
        {questions.length > 1 ? 
          <div>
            <i className="fa fa-arrow-right fa-2x" onMouseDown={handleScroll}/>
          </div> 
        : null}
      </Fragment>
    )
  } else {
    return null;
  }
}
export default QuestionDisplay

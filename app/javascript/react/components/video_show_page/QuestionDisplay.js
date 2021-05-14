import React, { useState, Fragment,  } from 'react'

const QuestionDisplay = ({questions, timesArray}) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0])
  
  const ctx = new(window.AudioContext || window.webkitAudioContext);

  const handleScroll = () => {
    let questionIndex = questions.indexOf(currentQuestion);
    if (questionIndex < questions.length-1){
      questionIndex += 1;
    } else {
      questionIndex = 0;
    }
    return setCurrentQuestion(questions[questionIndex]);
  }
  const handleSpeak = async() => {
    try {
      let speechResponse = await fetch(`/api/v1/questions/speak/${currentQuestion.id}`)
      if(speechResponse.ok && ctx){
        const parsedSpeechResponse = await speechResponse.arrayBuffer();
        const decodedFile = await ctx.decodeAudioData(parsedSpeechResponse);
        const source = ctx.createBufferSource(); 
        source.buffer = decodedFile;
        source.connect(ctx.destination)
        source.start()
      } 
    } catch(error) {
      console.log(error)
    }
  }

  const noPauses = timesArray().length === 0;
  if(noPauses) {
    return(
      <Fragment>
        <div>
          <i className="fas fa-volume-up fa-2x" onMouseDown={handleSpeak}></i>
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

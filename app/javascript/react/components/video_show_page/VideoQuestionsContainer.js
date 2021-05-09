import React, { useState } from 'react'
import QuestionTile from './QuestionTile'

const VideoQuestionsContainer = ({setFormErrors, questions, addQuestion, deleteQuestion, targetVideo}) => {
  const [questionFormData, setQuestionFormData] = useState({
    body: '', 
    vid_timestamp: ''
  })

  const questionsList = questions?.map(question => {
    return <QuestionTile key={question.id} question={question} deleteQuestion={deleteQuestion}/>
  })

  const handleChange = (event) => { 
    setQuestionFormData({
      ...questionFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const captureTimestamp = (event) => {
    let updateField = "vid_timestamp";
    let newTime = Math.floor(targetVideo.current.currentTime)
    setQuestionFormData({
      ...questionFormData,
      [updateField]: newTime
    })
  }

  const validForSubmission = () => {
    let submitErrors = [];
    if (questionFormData["body"].trim() === "" && questionFormData["vid_timestamp"] === null) {
      submitErrors = [
        ...submitErrors,
        "You must enter a question and/or a timestamp."
      ];
    } else if (questionFormData["vid_timestamp"] && (questionFormData["vid_timestamp"] < 0 || questionFormData["vid_timestamp"]) > targetVideo.current.duration){
      submitErrors = [
        ...submitErrors,
        "Your timestamp must be within the video duration"
      ];
    }

    setFormErrors(submitErrors);
    return submitErrors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validForSubmission()){
    addQuestion(questionFormData)
    }
    setQuestionFormData({
      body: '', 
      vid_timestamp: ''
    })
  }
  
  return (
    <div className="questions-open">
      <h3>Current questions:</h3>
      <ul>
        {questionsList}
      </ul>
      <div>
        <h3>Add a question or pause point to this video</h3>
        <p>If you want the question to be displayed at a specific time in the video, be sure to enter a timestamp. Otherwise, the question will be displayed during the whole video.</p>
        <p>If you want to create a pause point with no associated text, enter a timestamp and leave the question body blank.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="body">Enter the question text to display</label>
          <input 
            type="text" 
            id="body" 
            name="body"
            onChange={handleChange} 
            value={questionFormData.body}
            /> 
          <label htmlFor="timestamp">Set the video to the point at which you want to pause, and click the button below. Or, enter the timestamp(in seconds) manually.</label>
          <button type="button" onClick={captureTimestamp}>Capture Timestamp</button>
          <input 
            type="number" min="0" max={targetVideo.current.duration}
            name="vid_timestamp" 
            value={questionFormData.vid_timestamp} 
            onChange={handleChange}
          />
          
          <button type="submit">Add this question</button>
        </form>
      </div>
    </div>
  )
}
export default VideoQuestionsContainer

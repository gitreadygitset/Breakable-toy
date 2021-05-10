import React, { useState } from 'react'
import QuestionTile from './QuestionTile'

const VideoQuestionsContainer = ({setFormErrors, questions, addQuestion, deleteQuestion, targetVideo}) => {
  const [questionFormData, setQuestionFormData] = useState({
    body: '', 
    vid_timestamp: ''
  })

  const questionsList = questions?.map(question => {
    return (
      <QuestionTile 
        key={question.id} 
        question={question} 
        editQuestion={editQuestion}
        deleteQuestion={deleteQuestion}
      />
    )
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
    if (questionFormData["body"].trim() === "" && questionFormData["vid_timestamp"].trim() === "") {
      submitErrors = [
        ...submitErrors,
        "You must enter a question and/or a timestamp."
      ];
    } else if (questionFormData["vid_timestamp"] && (questionFormData["vid_timestamp"] < 1 || questionFormData["vid_timestamp"]) > targetVideo.current.duration){
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
  const editQuestion = (questionId) => {
    debugger
    let question = questions.find(question => question.id === questionId)
    setQuestionFormData({
      body: question.body,
      vid_timestamp: question.vid_timestamp || ""
    })
  }
  return (
    <div className="questions-open">
      <h3>Current questions:</h3>
      <ul className="questions-list">
        {questionsList}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          <h3>Add a question or pause point to this video</h3>
        </div>
        <div className="field">
          <label htmlFor="body">Question</label>
          <p className="field-instructions">(Leave this field blank to insert a pause point with no associated question.)</p>
          <input 
            type="text" 
            id="body" 
            name="body"
            onChange={handleChange} 
            value={questionFormData.body}
            /> 
        </div>
        <div className="field">
          <label htmlFor="timestamp-fields">Timestamp</label>
          <p className="field-instructions">(Leave this section blank to create a question that will be displayed for the entire video.)</p>
          <div id="timestamp-fields">
            <div>
            <label htmlFor="timestamp-button" className="not-bold">Set the video to the point at which you want to pause, and click here: </label>
              <button type="button" onClick={captureTimestamp} id="timestamp-button">
                Capture Timestamp
              </button>
              </div>
              <div>
              <label htmlFor="timestamp-enter" id="timestamp-label" className="not-bold">
                Or, enter the time in seconds: 
              </label>
              <input 
                type="number" 
                min="1" 
                max={targetVideo.current.duration}
                name="vid_timestamp" 
                id="timestamp-enter"
                value={questionFormData.vid_timestamp} 
                onChange={handleChange}
              />
              </div>
          </div>
        </div>
        <div className="field">
          <button type="submit">Add this question</button>
        </div>
        </form>
    </div>
  )
}
export default VideoQuestionsContainer

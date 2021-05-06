import React, { useState } from 'react'

const VideoQuestionsContainer = ({setFormErrors, questions, addQuestion}) => {
  const [questionFormData, setQuestionFormData] = useState({
    body: '', 
    vid_timestamp: ''
  })

  const questionsList = questions?.map(question => {
    return <li>{question?.body} timestamp: {question?.timestamp}</li>
  })

  const handleChange = (event) =>{
    setQuestionFormData({
      ...questionFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const validForSubmission = () => {
    let submitErrors = [];
      if (questionFormData["body"].trim() === "" && questionFormData["vid_timestamp"].trim() === "") {
        submitErrors = [
          ...submitErrors,
          "You must enter a question and/or a timestamp."
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
          <button type="submit">Add this question</button>
        </form>
      </div>
    </div>
  )
}
export default VideoQuestionsContainer

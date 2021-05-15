import React from 'react'
const QuestionTile = ({question, refillForm, deleteQuestion}) => {

  const handleDeleteClick = () => {
    if(window.confirm("Are you sure you want to delete this question?")){
      deleteQuestion(question.id)
    }
  }
  const handleEditClick = () => {
    refillForm(question.id)
  }
  return (
    <li> 
      <button type="button" onClick={handleEditClick}><i className="far fa-edit"></i></button>
      <button type="button" onClick={handleDeleteClick}><i className="far fa-trash-alt"></i></button>
      <p>{question?.body}</p>
      {question.vid_timestamp && <span class="bold">  Timestamp: {question?.vid_timestamp}</span>}
    </li>
  )
}
export default QuestionTile

import React from 'react'
const QuestionTile = ({question, editQuestion, deleteQuestion}) => {
  const handleDeleteClick = () => {
    confirm("Delete this question?")
    deleteQuestion(question.id)
  }
  const handleEditClick = () => {
    debugger
    editQuestion(question.id)
  }
  return (
    <li>
      <button type="button" onClick={handleEditClick}><i class="far fa-edit"></i></button>
      <button type="button" onClick={handleDeleteClick}><i className="far fa-trash-alt"></i></button>
      <p>{question?.body}</p>
      {question.vid_timestamp && <span>timestamp: {question?.vid_timestamp}</span>}
    </li>
  )
}
export default QuestionTile

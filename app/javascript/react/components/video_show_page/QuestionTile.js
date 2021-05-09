import React from 'react'
const QuestionTile = ({question, deleteQuestion}) => {
  const handleDeleteClick = () => {
    confirm("Are you sure you want to delete this question?")
    deleteQuestion(question.id)
  }
  return (
    <li><p>{question?.body}</p>
    {question.vid_timestamp && <span>timestamp: {question?.vid_timestamp}</span>}
    <button type="button" onClick={handleDeleteClick}>Delete question</button>
    </li>
  )
}
export default QuestionTile

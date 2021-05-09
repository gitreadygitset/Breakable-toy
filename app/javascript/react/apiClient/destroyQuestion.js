const destroyQuestion = async(questionId, videoId) => {
  try {
    const deleteQuestionResponse = await fetch(`/api/v1/videos/${videoId}/questions/${questionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      }
    })
    if(deleteQuestionResponse.ok) {
      return true;
    } else {
      throw new Error(`${deleteQuestionResponse.status}: ${deleteQuestionResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}
export default destroyQuestion;

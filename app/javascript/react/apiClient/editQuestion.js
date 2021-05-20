const editQuestion = async(formData, videoId) => {
  try {
    const editQuestionResponse = await fetch(`/api/v1/videos/${videoId}/questions/${formData.question_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      },
      body: JSON.stringify(formData)
    })
    if(editQuestionResponse.ok) {
      const parsedEditQuestionResponse = await editQuestionResponse.json();
      return parsedEditQuestionResponse;
    } else {
      throw new Error(`${editQuestionResponse.status}: ${editQuestionResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default editQuestion

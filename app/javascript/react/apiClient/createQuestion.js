const createQuestion = async(formData, videoId) => {
  try {
    const addQuestionResponse = await fetch(`/api/v1/videos/${videoId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      },
      body: JSON.stringify(formData)
    })
    if(addQuestionResponse.ok) {
      const parsedAddQuestionResponse = await addQuestionResponse.json();
      return parsedAddQuestionResponse;
    } else {
      throw new Error(`${addQuestionResponse.status}: ${addQuestionResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}
export default createQuestion;

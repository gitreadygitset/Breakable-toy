const editVideoTitle = async(videoTitle, videoId) => {
  try {
    const editTitleResponse = await fetch(`/api/v1/videos/${videoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      },
      body: JSON.stringify({title: videoTitle})
    })
    if(editTitleResponse.ok) {
      const parsedEditTitleResponse = await editTitleResponse.json();
      return parsedEditTitleResponse;
    } else {
      throw new Error(`${editTitleResponse.status}: ${editTitleResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default editVideoTitle

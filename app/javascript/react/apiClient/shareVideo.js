const shareVideo = async(formData, videoId) => {
  try {
    debugger
    const addShareResponse = await fetch(`/api/v1/videos/${videoId}/video_shares`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      },
      body: JSON.stringify(formData)
    })
    if(addShareResponse.ok) {
      const parsedAddShareResponse = await addShareResponse.json();
      debugger
      return parsedAddShareResponse;
    } else {
      throw new Error(`${addShareResponse.status}: ${addShareResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}
export default shareVideo;

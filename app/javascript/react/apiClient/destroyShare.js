const destroyShare = async(username, videoId) => {
  try {
    const deleteShareResponse = await fetch(`/api/v1/videos/${videoId}/video_shares/${username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      }}
      //body: JSON.stringify({ username: username })
    )
    if(deleteShareResponse.ok) {
      return true;
    } else {
      throw new Error(`${deleteShareResponse.status}: ${deleteShareResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}
export default destroyShare;

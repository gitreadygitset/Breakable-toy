import React from 'react'

const destroyVideo = async(videoId) => {
  try {
    const destroyVideoResponse = await fetch(`/api/v1/videos/${videoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'same-origin'
      }
    })
    if(destroyVideoResponse.ok) {
      return true;
    } else {
      throw new Error(`${destroyVideoResponse.status}: ${destroyVideoResponse.statusText}`)
    }
  } catch(error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}
export default destroyVideo

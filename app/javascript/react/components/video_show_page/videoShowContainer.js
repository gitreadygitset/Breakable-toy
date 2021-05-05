import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VideoSharesContainer from './VideoSharesContainer'

const VideoShowContainer = (props) => {
  const videoId = props.match.params.id;
  const [video, setVideo] = useState({});
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState([])

  const fetchVideo = async() => {
    try {
      let videoResponse = await fetch(`/api/v1/videos/${videoId}`)
      if(videoResponse.ok){
        videoResponse = await videoResponse.json()
        setVideo(videoResponse.video);
        setUsers(videoResponse.users);
      } else {
        throw new Error(`${videoResponse.status}: ${videoResponse.statusText}`)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const shareVideo = async(formData) => {
    try {
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
        if(parsedAddShareResponse.error){
          return setFormErrors([parsedAddShareResponse.error])
        } else {
        setUsers([...users, parsedAddShareResponse]);
        }
      } else {
        throw new Error(`${addShareResponse.status}: ${addShareResponse.statusText}`)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  return (
    <div>
      <h1>{video.title}</h1>
      <video src={video.video_url?.url} controls />
      <VideoSharesContainer 
        users={users} 
        shareVideo={shareVideo}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        />
      <Link to='/videos'>Back to my videos list</Link>
    </div>
  )
}
export default VideoShowContainer

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import VideoSharesContainer from './VideoSharesContainer'

const VideoShowContainer = (props) => {
  const videoId = props.match.params.id
  debugger
  const [video, setVideo] = useState({
    title: '',
    video_url: {
      url: ''
    }
  })

  const fetchVideo = async() => {
    try {
      let videoResponse = await fetch(`/api/v1/videos/${videoId}`)
      if(videoResponse.ok){
        videoResponse = await videoResponse.json()
        debugger
        setVideo(videoResponse.video)
      } else {
        throw new Error(`${videoResponse.status}: ${videoResponse.statusText}`)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    debugger
    fetchVideo()
  }, [])

  return (
    <div>
      <h1>{video.title}</h1>
      <video src={video.video_url.url} controls />
      <VideoSharesContainer video={video} />
      <Link to='/videos'>Back to my videos list</Link>
    </div>
  )
}
export default VideoShowContainer

import React, { useState, useEffect } from "react"
import VideoTile from './VideoTile'

const VideosIndexContainer = (props) => {
  const [videos, setVideos] = useState([])

  const fetchVideos = async() => {
    try {
      let videosResponse = await fetch('/api/v1/videos')
      if(videosResponse.ok){
        videosResponse = await videosResponse.json()
        setVideos(videosResponse.videos)
      } else {
        throw new Error(`${videosResponse.status}: ${videosResponse.statusText}`)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const videoComponents = videos.map(video => {
    return <VideoTile key={video.id} video={video}/>
  })

  return (
    <div>
      {videoComponents}
    </div>
  )
}
export default VideosIndexContainer

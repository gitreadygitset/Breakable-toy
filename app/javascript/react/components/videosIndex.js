import React, { useState, useEffect } from "react"
import VideoTile from './VideoTile'
import NewVideoForm from './NewVideoForm'

const VideosIndexContainer = (props) => {
  const [videos, setVideos] = useState([])
  const [videoFormData, setVideoFormData] = useState({
    title: "",
    video_url: ""
  })

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

  const addVideo = async() => {
    let body = new FormData()
    body.append('title', videoFormData.title)
    body.append('video_url', videoFormData.video_url)
    try {
      const addVideoResponse = await fetch('api/v1/videos', {
        method: "POST",
        headers: {
          credentials: "include",
        },
        body: body
      })
      if(addVideoResponse.ok) {
        const parsedAddVideoResponse = await addVideoResponse.json();
        setVideos([...videos, parsedAddVideoResponse.video]);
      } else {
        throw new Error(`${addVideoResponse.status}: ${addVideoResponse.statusText}`)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  const videoComponents = videos.map(video => {
    return <VideoTile key={video.id} video={video}/>
  })
 
  return (
    <div>
      <h1>Your Videos</h1>
      <div className="videos-index"> 
        <div className="video-grid">
          {videoComponents}
        </div> 
        <div className="video-form">
          <NewVideoForm 
          setVideoFormData={setVideoFormData} 
          videoFormData={videoFormData} 
          addVideo={addVideo}/>
        </div>
      </div>
    </div>
  )
}
export default VideosIndexContainer

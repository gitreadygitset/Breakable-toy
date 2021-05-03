import React from 'react'

const VideoTile = ({video}) => {
  return (
    <div className="video-tile">
      <h3>{video.title}</h3>
      <video src={video.video_url.url} controls/>
    </div>
  )
}
export default VideoTile

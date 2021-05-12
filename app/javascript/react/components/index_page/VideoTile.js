import React from 'react'
import { Link } from 'react-router-dom'

const VideoTile = ({video}) => {
  return (
    <div className="video-tile">
      <Link to={`/videos/${video.id}`}>
        <div className="grid-image-container">
          <img 
          src={video.thumbnail.url}
          />
        </div>
        <h3>{video.title}</h3>
        <
      </Link>
    </div>
  )
}
export default VideoTile

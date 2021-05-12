import React from 'react'
import { Link } from 'react-router-dom'

const VideoTile = ({video}) => {
  return (
    <div className="video-tile">
      <Link to={`/videos/${video.id}`}>
        <div className="grid-image-container">
          <img 
          src={video.thumbnail}
          // "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/VHS-Video-Tape-Top-Flat.jpg/1920px-VHS-Video-Tape-Top-Flat.jpg"
          />
        </div>
        <h3>{video.title}</h3>
      </Link>
    </div>
  )
}
export default VideoTile

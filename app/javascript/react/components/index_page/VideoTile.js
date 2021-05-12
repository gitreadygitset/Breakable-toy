import React from 'react'
import { Link } from 'react-router-dom'


const VideoTile = ({video, deleteVideo}) => {

  const handleDeleteClick = () => {
    confirm('Are you sure you want to delete this video?')
    deleteVideo(video.id)
  }
  return (
    <div className="video-tile">
      <Link to={`/videos/${video.id}`}>
        <div className="grid-image-container">
          <img 
          src={video.thumbnail.url}
          />
        </div>
        <h3>{video.title}</h3>
        <button type="button" onClick={handleDeleteClick}><i className="far fa-trash-alt"></i></button>
      </Link>
    </div>
  )
}
export default VideoTile

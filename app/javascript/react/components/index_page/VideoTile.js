import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const VideoTile = ({video, deleteVideo, userRole, editTitle}) => {
  const [editField, setEditField] = useState(false)
  const [videoTitle, setVideoTitle] = useState(video.title)

  const handleDeleteClick = () => {
    if(window.confirm('Are you sure you want to delete this video?')){
      deleteVideo(video.id)
    }
  }
  const handleEditClick = () => {
    setEditField(!editField)
  }
  const handleInputClick = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => {
    setVideoTitle(event.currentTarget.value)
  }
  
  const handleEdit = () => {
    editTitle(videoTitle, video.id)
  }

  return (
    <div className="video-tile">
      <Link className="video-link"to={`/videos/${video.id}`}>
        <div className="grid-image-container">
          <img 
          src={video.thumbnail.url}
          />
        </div>
        <div>
        { editField ? 
        <input 
          type="text" 
          id="title-edit" 
          value={videoTitle} 
          onChange={handleChange} 
          onClick={handleInputClick} 
          onBlur={handleEdit}
          /> :
        <h3>{video.title}</h3> }
        </div>
      </Link>
        {userRole === "independent user" ? 
          <div>
            <button onClick={handleDeleteClick}><i className="far fa-trash-alt"></i></button>
            <button type="button" onClick={handleEditClick}><i className="far fa-edit"></i></button>
          </div>
          : null }
    </div>
  )
}
export default VideoTile

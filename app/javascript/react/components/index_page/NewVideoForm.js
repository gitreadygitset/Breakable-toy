import React, { useState } from 'react'
import ErrorList from '../ErrorList'

const NewVideoForm = ({setVideoFormData, videoFormData, addVideo})=> {
  const [formErrors, setFormErrors] = useState([])

  const handleChange = (event) => {
    setVideoFormData({
      ...videoFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleFileUpload = (event) => {
    const videoFile = event.currentTarget.files[0]
    setVideoFormData({
      ...videoFormData,
      video_url: videoFile
    })
  }

  const validForSubmission = () => {
    let submitErrors = [];
      if (videoFormData["title"].trim() === "") {
        submitErrors = [
          ...submitErrors,
          "You must provide a title"
        ];
      }
      if (videoFormData["video_url"]===""){
        submitErrors = [
          ...submitErrors,
          "Please upload a file"
        ]
      }

    setFormErrors(submitErrors);
    return submitErrors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validForSubmission()) {
    addVideo();
    setVideoFormData({
      title: '',
      video_url: ''
      })
    }
  };

  return (
    <div>
      <ErrorList errors={formErrors}/>
      <form onSubmit={handleSubmit}>
        <div className="form-title">
          <span>Upload a new video</span>
        </div>
        <div className="field">
          <label htmlFor="title">Video title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={videoFormData.title} 
            onChange={handleChange}
            />
        </div>
        <div className="field">
          <label htmlFor="video_url">Attach your video file</label>
          <input type="file" accept="video/*" onChange={handleFileUpload}></input>
        </div>
        <div className="field">
          <input type="submit" value="Upload Video"/>
        </div>
      </form>
    </div>
  )
}

export default NewVideoForm

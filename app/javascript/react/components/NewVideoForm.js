import React, { useState } from 'react'
import ErrorList from './ErrorList'

const NewVideoForm = ({setVideoFormData, videoFormData, addVideo})=> {
  const [formErrors, setFormErrors] = useState({})

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
      <h2>Upload a new video</h2>
      <ErrorList errors={formErrors}/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Video title</label>
        <input type="text" id="title" name="title" value={videoFormData.title} onChange={handleChange}/>

        <label htmlFor="video_url">Attach your video file</label>
        <input type="file" accept="video/*" onChange={handleFileUpload}></input>

        <input type="submit" value="Upload Video"/>
      </form>
    </div>
  )
}

export default NewVideoForm

import React, { useState } from 'react'
import ErrorList from '../ErrorList'

const VideoUploadForm = ({setVideoFormData, videoFormData, addVideo}) => { 
  const[blobImage, setBlobImage] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  const draw = (video, canvas, image) => {
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, video.width, video.clientHeight);
    canvas.toBlob(function(thumbnailImage){
      let imgUrl = URL.createObjectURL(thumbnailImage);
      image.setAttribute('src', imgUrl)
      setBlobImage(thumbnailImage)
    })
  }

  const handleChange = (event) => {
    if(event.currentTarget.name === "title"){
    setVideoFormData({
      ...videoFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
    } else if(event.currentTarget.name === "video_url"){
      setVideoFormData({
        ...videoFormData,
        [event.currentTarget.name]: event.currentTarget.files[0]
      })

      const reader = new FileReader();
      const videoFile = event.currentTarget.files[0]
      reader.readAsDataURL(videoFile)
      reader.onload = () => {
        const url = URL.createObjectURL(videoFile)
        const previewVid = document.getElementById("preview-vid")
        const canvas = document.getElementById("canvas")
        const frame = document.getElementById("thumbnail-display")

        previewVid.setAttribute("src", url)
        previewVid.addEventListener('pause', () => {
          draw(previewVid, canvas, frame) 
        })
      }
    } else if(event.currentTarget.name === "thumbnail"){
      setVideoFormData({
        ...videoFormData,
        [event.currentTarget.name]: blobImage
      })
    }
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
  }
  const clearForm = () => {
    setVideoFormData({
      title: "",
      thumbnail: "",
      video_url: "",
    })
    document.getElementById("thumbnail-display").src = "";
    document.getElementById("video-file").value = "";
    document.getElementById("preview-vid").src = "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validForSubmission()){
      addVideo(videoFormData);
      clearForm();
    }
  }
  
  return (
    <div>
      <h2>Upload a new video</h2>
      <ErrorList errors={formErrors}/>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Video title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            onChange={handleChange} 
            value={videoFormData.title}
          />
        </div>
        <div className="field">
          <label htmlFor="video-file">Attach your video file</label>
          <input 
            type="file" 
            accept="video/*" 
            id="video-file" 
            name="video_url" 
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <p>Play and pause the preview video below to set a thumbnail image.</p>
            <video src="" width="230px" id="preview-vid" controls></video>
          </div>
          <div>
            <canvas width="230px" id="canvas"></canvas>
            <img id="thumbnail-display" name="thumbnail" onLoad={handleChange}/>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Upload video"/>
          <input type="button" value="Clear Form" onClick={clearForm}/>
        </div>
      </form>
    </div>
  )
}
export default VideoUploadForm

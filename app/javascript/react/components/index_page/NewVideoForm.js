import React, { useState } from 'react'
import ErrorList from '../ErrorList'

const NewVideoForm = ({setVideoFormData, videoFormData, addVideo})=> {
  const [formErrors, setFormErrors] = useState([]);
  
  const handleChange = (event) => {
    setVideoFormData({
      ...videoFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleFileUpload = (event) => {
    const videoFile = event.currentTarget.files[0]
    
    const reader = new FileReader();
    reader.readAsDataURL(videoFile);

    reader.onload = () => {
      const url = URL.createObjectURL(videoFile)
      const previewVid = document.getElementById("preview-vid")
      const canvas = document.getElementById("canvas")
      const frame = document.getElementById("thumbnail")

      previewVid.setAttribute("src", url)
      previewVid.addEventListener('pause', () => {
        draw(previewVid, canvas, frame) 
      })
    }  
    function draw(video, canvas, image){
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, video.width, video.clientHeight);
      canvas.toBlob(function(thumbnailImage){
        let imgUrl = URL.createObjectURL(thumbnailImage);
        image.setAttribute('src', imgUrl)
        setVideoFormData({
          ...videoFormData,
          thumbnail: thumbnailImage,
          video_url: videoFile
        })
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validForSubmission()) {
    addVideo();
    setVideoFormData({
      title: '',
      video_url: '',
      thumbnail: ''
      })
      document.getElementById('thumbnail').src = ""
      document.getElementById('preview-vid').src = ""
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
        <div id="preview-thumbnail">
          <div>
            <p>After you attach your file, pause the preview below to set a distinctive thumbnail for this video.</p>
            <video id="preview-vid" width="230px" controls>
            </video>
          </div>
          <div>
            <canvas id="canvas" width="230px"></canvas>
            <img id="thumbnail"/>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Upload Video"/>
        </div>
        
      </form>
    </div>
  )
}

export default NewVideoForm

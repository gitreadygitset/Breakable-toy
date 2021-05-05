import React, { useState } from 'react'
import ErrorList from '../ErrorList'

const VideoSharesContainer = ({users, shareVideo, fetchErrors, formErrors, setFormErrors}) => {
  
  const [shareFormData, setShareFormData] = useState({username: ''})

  const usersList = users?.map(user => {
    return <li>{user?.username}</li>
  })

  const handleChange = (event) =>{
    setShareFormData({
      ...shareFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const validForSubmission = () => {
    let submitErrors = [];
      if (shareFormData["username"].trim() === "") {
        submitErrors = [
          ...submitErrors,
          "Please enter a username"
        ];
      }

    setFormErrors(submitErrors);
    return submitErrors.length === 0;
  };

  const handleShare = (event) => {
    event.preventDefault();
    if(validForSubmission()){
    shareVideo(shareFormData)
    }
    setShareFormData({username: ''})
  }

  
  return (
    <div>
    <h3>Shared with:</h3>
    <ul>
      {usersList}
    </ul>
    <div>
      <form onSubmit={handleShare}>
        <ErrorList errors={formErrors}/>
        <label htmlFor="username">Enter the username of the person you'd like to share with</label>
        <input 
          type="text" 
          id="username" 
          name="username"
          onChange={handleChange} 
          value={shareFormData.username}
          />
        <button type="submit" >Share this video</button>
      </form>
    </div>
    </div>
  )

}
export default VideoSharesContainer

import React, { useState } from 'react'
import UserTile from "./UserTile"

const VideoSharesContainer = ({users, shareVideo, unshare, setFormErrors}) => {
  const [shareFormData, setShareFormData] = useState({username: ''})
  const usersList = users?.map(user => {
    return <UserTile key={user.id} username={user.username} unshare={unshare}/>
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
    <div className="shared-open">
      <div>
        <form onSubmit={handleShare}>
          <div className="form-title">
            <h3>Share this video with another user</h3>
          </div>
          <div className="field">
            <label htmlFor="username">Username of the person you'd like to share with:</label>
            <input 
              type="text" 
              id="username" 
              name="username"
              onChange={handleChange} 
              value={shareFormData.username}
              />
          </div>
          <div className="field">
            <input type="submit" value="Share Video"/>
          </div>
        </form>
        {users?.length > 0 ? 
        <div className="shared-users">  
          <h3>Shared with:</h3> 
          <ul className="tile-list">
            {usersList}
          </ul>
        </div>
        : "" }
      </div>
    </div>
  )
}
export default VideoSharesContainer

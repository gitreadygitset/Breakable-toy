import React from 'react'

const UserTile = ({unshare, username}) => {
  const handleUnshareClick = () => {
    confirm("Are you sure you want to remove this user?")
    unshare(username)
  } 

  return (
    <li>
      <button type="button" onClick={handleUnshareClick}><i className="fas fa-unlink"></i></button>
      <p>{username}</p>  
    </li>
  )
}
export default UserTile

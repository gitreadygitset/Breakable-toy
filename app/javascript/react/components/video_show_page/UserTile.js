import React from 'react'

const UserTile = ({unshare, username}) => {
  const handleUnshareClick = () => {
    confirm("Are you sure you want to remove this user?")
    unshare(username)
  } 

  return (
    <li>
      <span>{username}</span>
      <button type="button" onClick={handleUnshareClick}>Remove user</button>
    </li>
  )
}
export default UserTile

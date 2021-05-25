import React, { useState } from 'react'

const SearchBar = ({videos, setDisplayedVideos, setDisplayedVideoCount}) => {
  const [searchString, setSearchString] = useState('')

  const handleChange = event => {
    const newSearchString = event.target.value
    setSearchString(newSearchString)
  }

  const handleSubmit = event => {
    event.preventDefault()
    let matchingVideos = videos.filter(video => video.video.title.toLowerCase().includes(searchString.toLowerCase()))
    setDisplayedVideos(matchingVideos)
    setDisplayedVideoCount(matchingVideos.length)
  }

  const clearSearch = () => {
    setDisplayedVideos(videos)
    setDisplayedVideoCount(videos.length)
    setSearchString('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Search Your Videos</h2>
      <input type="text" name="searchString" value={searchString} onChange={handleChange}/>
      <input type="button" value="Clear Search" onClick={clearSearch}/>
    </form>
  )
}
export default SearchBar

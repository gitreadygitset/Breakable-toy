import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import VideosIndexContainer from "./videosIndex"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Route path="/videos" component={VideosIndexContainer}/>
    </BrowserRouter>
  )
}

export default App

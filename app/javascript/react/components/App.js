import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import VideosIndexContainer from "./index_page/VideosIndex"
import VideoShowContainer from "./video_show_page/VideoShowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/videos/:id" component={VideoShowContainer}/>
        <Route path="/" component={VideosIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App

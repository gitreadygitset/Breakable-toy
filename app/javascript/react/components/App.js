import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import VideosIndexContainer from "./videosIndex"
import VideoShowContainer from "./videoShowContainer"

export const App = (props) => {
  debugger
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

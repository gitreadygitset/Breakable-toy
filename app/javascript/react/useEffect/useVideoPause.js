import React, { useState, useEffect } from 'react'

const useVideoPause = (targetVideo, timesArray) => {
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    targetVideo.current.addEventListener('timeupdate', (event) => {
      console.log(`event listener added for ${timesArray[0]}`)
      if(event.currentTarget.currentTime > timesArray[0]){
        event.currentTarget.pause();
        timesArray = timesArray.slice(1);
        return setToggle(!toggle);
      }
    })
  }, toggle)
}

export default useVideoPause
